import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time, notes, isNewPatient, provider } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Map service to appointment type
    const appointmentTypeMap: { [key: string]: string } = {
      'checkup': 'checkup',
      'cosmetic': 'cosmetic',
      'implants': 'consultation',
      'invisalign': 'orthodontics',
      'emergency': 'emergency',
      'children': 'pediatric'
    }

    const appointmentType = appointmentTypeMap[service] || 'consultation'

    // Use default provider if not specified
    const selectedProvider = provider || 'dr_nalini'

    // Send to your existing n8n workflow
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

    if (webhookUrl) {
      // Format data to match your n8n workflow's expected structure
      const webhookData = {
        tool_name: 'book_dental_appointment',
        full_name: name,
        phone: phone,
        email: email,
        dob: '', // Not collected on website form
        provider: selectedProvider,
        date: date, // YYYY-MM-DD
        start: time.substring(0, 5), // HH:MM (remove seconds if present)
        reason_for_visit: service,
        notes: notes || '',
        source: 'website'
      }

      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        })

        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text()
          console.error('n8n webhook failed:', errorText)
          throw new Error('Failed to create appointment')
        }

        const result = await webhookResponse.json()

        return NextResponse.json({
          success: true,
          message: 'Booking request submitted successfully',
          appointment: result.appointment
        })
      } catch (webhookError) {
        console.error('n8n webhook error:', webhookError)
        return NextResponse.json(
          { error: 'Failed to create appointment. Please call us at (03) 9562 0675.' },
          { status: 500 }
        )
      }
    } else {
      // No webhook configured - return error
      return NextResponse.json(
        { error: 'Booking system not configured. Please call (03) 9562 0675 to book.' },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
