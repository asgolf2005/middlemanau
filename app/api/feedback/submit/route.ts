import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { appointmentId, patientName, rating, comments, timestamp } = body

    console.log('==================== FEEDBACK SUBMISSION ====================')
    console.log('Appointment ID:', appointmentId)
    console.log('Patient:', patientName)
    console.log('Rating:', rating, '/ 5')
    console.log('Comments:', comments || '(No comments)')
    console.log('Timestamp:', timestamp)
    console.log('=============================================================')

    // Send to N8N webhook for processing
    const n8nWebhookUrl = process.env.N8N_FEEDBACK_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      console.error('N8N_FEEDBACK_WEBHOOK_URL not configured')
      return NextResponse.json(
        { error: 'Feedback system not configured' },
        { status: 500 }
      )
    }

    const n8nResponse = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentId,
        patientName,
        rating,
        comments,
        timestamp,
        isPositive: rating >= 4, // Flag for N8N to decide next action
      }),
    })

    if (!n8nResponse.ok) {
      throw new Error('Failed to send feedback to N8N')
    }

    const result = await n8nResponse.json()
    console.log('✅ Feedback sent to N8N successfully')

    return NextResponse.json({
      success: true,
      message: 'Feedback received',
      data: result,
    })
  } catch (error) {
    console.error('❌ Feedback submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}
