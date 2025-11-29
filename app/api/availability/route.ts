import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')
    const provider = searchParams.get('provider') || 'dr_nalini'

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter required' },
        { status: 400 }
      )
    }

    // Call your existing n8n workflow
    const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      // Fallback: return default slots
      return NextResponse.json({
        date,
        slots: getDefaultSlots()
      })
    }

    try {
      // Use your existing workflow's check_availability tool
      const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tool_name: 'check_availability',
          provider: provider,
          preferred_datetime: `${date}T09:00:00` // Check from 9 AM
        })
      })

      if (!response.ok) {
        throw new Error('Failed to fetch availability from n8n')
      }

      const data = await response.json()

      // Transform n8n response to our format
      const slots = data.all_available_slots?.map((timeStr: string) => {
        // Convert 24h format (HH:MM) to 12h format (H:MM AM/PM)
        const [hours, minutes] = timeStr.split(':')
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
        const displayTime = `${displayHour}:${minutes} ${ampm}`

        return {
          time: displayTime,
          available: true
        }
      }) || getDefaultSlots()

      return NextResponse.json({
        date,
        provider,
        slots
      })
    } catch (fetchError) {
      console.error('n8n availability fetch error:', fetchError)
      // Return default slots as fallback
      return NextResponse.json({
        date,
        slots: getDefaultSlots()
      })
    }
  } catch (error) {
    console.error('Availability API error:', error)

    // Return default slots as fallback
    return NextResponse.json({
      date: request.nextUrl.searchParams.get('date'),
      slots: getDefaultSlots()
    })
  }
}

function getDefaultSlots() {
  // Default availability if n8n/Google Calendar unavailable
  // Based on your workflow: 9:00 - 19:00 (7 PM)
  return [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: false }, // Lunch
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true },
    { time: '6:00 PM', available: true },
  ]
}
