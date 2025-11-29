import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // First, get the patient record using the auth user's email
    const { data: patient, error: patientError } = await supabase
      .from('patients')
      .select('id, phone, email, full_name')
      .eq('email', user.email)
      .single()

    if (patientError || !patient) {
      console.log('No patient found for user:', user.email, patientError)
      return NextResponse.json({ appointments: [] })
    }

    console.log('Found patient:', patient.id, 'for email:', user.email)

    // Fetch appointments for this patient
    const { data: appointments, error: dbError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patient.id)
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json({ appointments: [] })
    }

    console.log(`Found ${appointments?.length || 0} appointments for patient ${patient.id}`)
    if (appointments && appointments.length > 0) {
      console.log('Sample appointment:', appointments[0])
    }

    // Transform to match expected format
    const transformedAppointments = appointments?.map(apt => ({
      id: apt.id,
      patient_name: patient.full_name,
      patient_email: patient.email,
      patient_phone: patient.phone,
      service: apt.reason_for_visit,
      date: apt.appointment_date,
      time: apt.appointment_time,
      status: apt.status,
      notes: apt.notes,
      provider: apt.provider,
      calendar_event_id: apt.calendar_event_id,
      created_at: apt.created_at
    })) || []

    return NextResponse.json({ appointments: transformedAppointments })
  } catch (error) {
    console.error('Appointments API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Cancel appointment
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const appointmentId = searchParams.get('id')

    if (!appointmentId) {
      return NextResponse.json({ error: 'Appointment ID required' }, { status: 400 })
    }

    // Get patient info
    const { data: patient } = await supabase
      .from('patients')
      .select('id, phone, email, full_name')
      .eq('email', user.email)
      .single()

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    // Get appointment details before cancelling
    const { data: appointment } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .eq('patient_id', patient.id)
      .single()

    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 })
    }

    console.log('Cancelling appointment:', appointmentId, 'for patient:', patient.phone)

    // Step 1: Update status in Supabase first
    const { error: updateError } = await supabase
      .from('appointments')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)
      .eq('patient_id', patient.id)

    if (updateError) {
      console.error('Failed to update appointment status:', updateError)
      return NextResponse.json(
        { error: 'Failed to cancel appointment in database' },
        { status: 500 }
      )
    }

    // Step 2: Send cancellation to N8N workflow
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (n8nWebhookUrl) {
      const cancellationData = {
        tool_name: 'cancel_appointment',
        phone: patient.phone,
        email: patient.email,
        full_name: patient.full_name,
        appointment_id: parseInt(appointmentId),
        appointment_date: appointment.appointment_date,
        appointment_time: appointment.appointment_time,
        service: appointment.reason_for_visit,
        provider: appointment.provider,
        calendar_event_id: appointment.calendar_event_id,
        cancelled_by: 'patient_portal',
        cancelled_at: new Date().toISOString()
      }

      console.log('Sending cancellation to N8N:', cancellationData)

      try {
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cancellationData),
        })

        const responseText = await webhookResponse.text()
        console.log('N8N cancellation response:', webhookResponse.status, responseText)

        if (!webhookResponse.ok) {
          console.error('N8N webhook failed:', webhookResponse.status, responseText)
          // Continue anyway - appointment is already cancelled in DB
        }
      } catch (webhookError) {
        console.error('N8N webhook error:', webhookError)
        // Continue anyway - appointment is already cancelled in DB
      }
    } else {
      console.warn('N8N webhook URL not configured')
    }

    // Step 3: Fetch updated appointment to confirm
    const { data: updatedAppointment } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single()

    console.log('Appointment cancelled successfully:', appointmentId)

    return NextResponse.json({
      success: true,
      message: 'Appointment cancelled successfully. You will receive a confirmation email.',
      appointment: updatedAppointment
    })
  } catch (error) {
    console.error('Cancel appointment error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
