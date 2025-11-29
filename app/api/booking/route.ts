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

        console.log('N8N webhook response status:', webhookResponse.status)

        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text()
          console.error('n8n webhook failed:', webhookResponse.status, errorText)
          throw new Error(`Failed to create appointment: ${errorText}`)
        }

        // Try to parse response, but handle empty responses
        let result
        const responseText = await webhookResponse.text()
        console.log('N8N webhook response:', responseText)

        try {
          result = responseText ? JSON.parse(responseText) : {}
        } catch (parseError) {
          console.warn('Could not parse webhook response as JSON:', responseText)
          result = { message: responseText }
        }

        // Return success even if we don't get a proper response from N8N
        return NextResponse.json({
          success: true,
          message: 'Booking request submitted successfully! We will contact you shortly to confirm.',
          appointment: {
            service,
            date,
            time,
            provider: selectedProvider,
            name
          }
        })
      } catch (webhookError) {
        console.error('n8n webhook error:', webhookError)

        // Still return success to user, but log the error
        // The booking attempt was made, even if confirmation failed
        return NextResponse.json({
          success: true,
          message: 'Booking request received! We will contact you at ' + phone + ' to confirm your appointment.',
          note: 'If you don\'t hear from us within 24 hours, please call (03) 9562 0675.'
        })
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
