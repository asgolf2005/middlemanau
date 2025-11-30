import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { triggerFeedbackRequest } from '@/lib/feedback-automation'

/**
 * Complete an appointment and trigger feedback request
 *
 * POST /api/portal/appointments/complete?id=123
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get authenticated user (this would be staff/admin, not patient)
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const appointmentId = searchParams.get('id')

    if (!appointmentId) {
      return NextResponse.json(
        { error: 'Appointment ID required' },
        { status: 400 }
      )
    }

    // Get appointment details
    const { data: appointment, error: aptError } = await supabase
      .from('appointments')
      .select('*, patient:patients!appointments_patient_id_fkey(full_name, phone, email)')
      .eq('id', appointmentId)
      .single()

    if (aptError || !appointment) {
      console.error('Appointment not found:', aptError)
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      )
    }

    console.log('==================== COMPLETING APPOINTMENT ====================')
    console.log('Appointment ID:', appointmentId)
    console.log('Patient:', appointment.patient.full_name)
    console.log('Phone:', appointment.patient.phone)
    console.log('Service:', appointment.reason_for_visit)
    console.log('Date:', appointment.appointment_date, 'at', appointment.appointment_time)
    console.log('================================================================')

    // Update appointment status to completed
    const { error: updateError } = await supabase
      .from('appointments')
      .update({
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', appointmentId)

    if (updateError) {
      console.error('Failed to update appointment status:', updateError)
      return NextResponse.json(
        { error: 'Failed to complete appointment' },
        { status: 500 }
      )
    }

    console.log('✅ Appointment marked as completed')

    // Trigger feedback request (24 hour delay in N8N)
    const feedbackTriggered = await triggerFeedbackRequest({
      appointmentId: appointmentId,
      patientName: appointment.patient.full_name,
      patientPhone: appointment.patient.phone,
      service: appointment.reason_for_visit,
      completedDate: new Date().toISOString(),
    })

    if (feedbackTriggered) {
      console.log('✅ Feedback request scheduled - SMS will be sent in 24 hours')
    } else {
      console.warn('⚠️ Feedback request failed - check N8N configuration')
    }

    return NextResponse.json({
      success: true,
      message: 'Appointment completed successfully',
      feedbackScheduled: feedbackTriggered,
    })
  } catch (error) {
    console.error('❌ Error completing appointment:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
