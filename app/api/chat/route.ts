import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const SYSTEM_PROMPT = `You are the AI receptionist for Star Smiles Dental Centre in Wheelers Hill, Victoria. You are friendly, professional, and efficient.

PRACTICE INFO:
- Location: 1 Plato Crescent, Brandon Park Shopping Centre, Wheelers Hill VIC 3150
- Phone: (03) 9562 0675
- Email: info@starsmiles.com.au
- Hours: Monday-Friday 9AM-6PM, Saturday 9AM-1PM, Closed Sunday
- Free parking available at Brandon Park Shopping Centre

SERVICES & PRICING:
- General Dentistry: Checkups from $180, Cleaning from $150
- Cosmetic Dentistry: Teeth Whitening from $400, Veneers from $900 per tooth
- Dental Implants: From $3,000 per implant
- Invisalign: From $4,500 (payment plans available)
- Children's Dentistry: Bulk billing available for eligible children
- Emergency Care: Same-day appointments available

PROVIDERS:
- Dr. Nalini: General dentistry, family dentist
- Amit Khatri: Orthodontics, Invisalign specialist
- Dr. Nesrine: Cosmetic dentistry, veneers, whitening

INSURANCE:
- Accept all major health funds (HCF, Medibank, BUPA, NIB, etc.)
- HICAPS for instant claims
- No-gap or low-gap options available
- Payment plans available through Afterpay and Zip

YOUR CAPABILITIES:
1. Answer questions about services, hours, location, pricing
2. Help patients book appointments
3. Provide information about insurance and payment options
4. Handle emergency situations with urgency
5. Guide new patients on what to expect

WHEN BOOKING APPOINTMENTS:
- Collect in this order: Full name, phone number, email, preferred date/time, reason for visit
- IMPORTANT: Collect ALL required info before confirming the booking
- Required info: name, phone, email, date, time, reason
- Ask if they're a new patient (optional)
- For emergencies, offer same-day slots
- Once you have ALL 6 required details, say: "Perfect! I have all your details. Let me book that appointment for you now."
- The system will automatically create the appointment when you have complete information

CONVERSATION GUIDELINES:
- Be warm, empathetic, and reassuring (many people are anxious about dentists!)
- Use simple, non-technical language
- If someone mentions pain or emergency, prioritize urgency
- For complex questions, offer to have the team call them back
- Always end with asking if there's anything else you can help with
- Keep responses concise but informative (2-4 sentences max unless explaining services)

IMPORTANT:
- You can provide general pricing and information
- You CAN book appointments once you have all required information (name, phone, email, date, time, reason)
- For specific treatment plans or medical advice, defer to the dentists
- Never share patient information or discuss other patients
- After booking, confirm the appointment details to the patient`

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface BookingInfo {
  name?: string
  phone?: string
  email?: string
  date?: string
  time?: string
  reason?: string
  provider?: string
  dob?: string
  notes?: string
  isComplete: boolean
  hasPartialInfo: boolean
}

// Extract booking information from conversation
async function extractBookingInfo(messages: Message[], latestResponse: string): Promise<BookingInfo> {
  const conversationText = messages.map(m => `${m.role}: ${m.content}`).join('\n') + `\nassistant: ${latestResponse}`

  // Use GPT to extract structured information
  const extractionPrompt = `Extract booking information from this conversation. Return JSON with these fields:
  - name (full name)
  - phone (format: +61...)
  - email
  - date (YYYY-MM-DD format)
  - time (HH:MM format, 24h)
  - reason (reason for visit)
  - provider (dr_nalini, amit_khatri, or dr_nesrine)
  - dob (date of birth if mentioned, YYYY-MM-DD)
  - notes (any special requests)

If a field is not mentioned, use null. Return ONLY valid JSON.

Conversation:
${conversationText}`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: extractionPrompt }],
      temperature: 0.1,
      response_format: { type: 'json_object' }
    })

    const extracted = JSON.parse(completion.choices[0].message.content || '{}')

    const isComplete = !!(
      extracted.name &&
      extracted.phone &&
      extracted.email &&
      extracted.date &&
      extracted.time &&
      extracted.reason
    )

    const hasPartialInfo = !!(
      extracted.name ||
      extracted.phone ||
      extracted.email ||
      extracted.date ||
      extracted.time
    )

    return {
      ...extracted,
      isComplete,
      hasPartialInfo
    }
  } catch (error) {
    console.error('Extraction error:', error)
    return { isComplete: false, hasPartialInfo: false }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // Prepare messages with system prompt
    const chatMessages: Message[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages
    ]

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast and cost-effective
      messages: chatMessages,
      temperature: 0.7,
      max_tokens: 500,
    })

    const assistantMessage = completion.choices[0].message.content

    // Extract booking information from conversation
    const bookingInfo = await extractBookingInfo(messages, assistantMessage || '')

    // If we have complete booking info, create the appointment
    if (bookingInfo.isComplete) {
      try {
        const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
        if (n8nWebhookUrl) {
          const bookingResponse = await fetch(n8nWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tool_name: 'book_dental_appointment',
              full_name: bookingInfo.name,
              phone: bookingInfo.phone,
              email: bookingInfo.email,
              dob: bookingInfo.dob || '',
              provider: bookingInfo.provider || 'dr_nalini',
              date: bookingInfo.date,
              start: bookingInfo.time,
              reason_for_visit: bookingInfo.reason,
              notes: bookingInfo.notes || '',
              source: 'chatbot'
            })
          })

          if (bookingResponse.ok) {
            const result = await bookingResponse.json()
            return NextResponse.json({
              message: assistantMessage + "\n\n✅ Great! Your appointment has been created successfully. You'll receive a confirmation email shortly.",
              hasBookingInfo: true,
              appointmentCreated: true,
              appointmentDetails: result
            })
          }
        }
      } catch (error) {
        console.error('Failed to create appointment:', error)
      }
    }

    return NextResponse.json({
      message: assistantMessage,
      hasBookingInfo: bookingInfo.hasPartialInfo,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
}
