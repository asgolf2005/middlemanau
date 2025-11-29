import { NextRequest, NextResponse } from 'next/server'

// Helper function to convert 12-hour time to 24-hour format
function convertTo24Hour(time12h: string): string {
  const [time, period] = time12h.trim().split(' ')
  let [hours, minutes] = time.split(':')

  let hour = parseInt(hours)

  if (period === 'PM' && hour !== 12) {
    hour += 12
  } else if (period === 'AM' && hour === 12) {
    hour = 0
  }

  // Ensure two digits with leading zero
  const formattedHour = hour.toString().padStart(2, '0')
  const formattedMinutes = (minutes || '00').padStart(2, '0')

  return `${formattedHour}:${formattedMinutes}`
}

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

    // Convert time from "9:00 AM" to "09:00" (24-hour format)
    const time24h = convertTo24Hour(time)

    // Send to your existing n8n workflow
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

    if (webhookUrl) {
      // Calculate end time (assume 60 minute appointments)
      const [hours, minutes] = time24h.split(':').map(Number)
      const endHour = hours + 1
      const endTime = `${endHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`

      // Format data to match your n8n workflow's expected structure
      const webhookData = {
        tool_name: 'book_dental_appointment',
        full_name: name,
        phone: phone,
        email: email,
        dob: '', // Not collected on website form
        provider: selectedProvider,
        date: date, // YYYY-MM-DD
        start: time24h, // HH:MM in 24-hour format (e.g., "14:00")
        end: endTime, // HH:MM in 24-hour format (e.g., "15:00")
        reason_for_visit: service,
        notes: notes || '',
        source: 'website',
        is_new_patient: isNewPatient || false
      }

      console.log('Sending to N8N:', JSON.stringify(webhookData, null, 2))

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
