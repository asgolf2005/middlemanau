/**
 * Feedback Automation Helper
 *
 * Triggers N8N workflow to send feedback request 24 hours after appointment completion
 */

interface AppointmentCompletedData {
  appointmentId: string
  patientName: string
  patientPhone: string
  service: string
  completedDate: string
}

/**
 * Trigger feedback request workflow when appointment is completed
 *
 * This sends data to N8N which waits 24 hours, then sends SMS with feedback link
 */
export async function triggerFeedbackRequest(data: AppointmentCompletedData): Promise<boolean> {
  const n8nWebhookUrl = process.env.N8N_APPOINTMENT_COMPLETED_WEBHOOK_URL

  if (!n8nWebhookUrl) {
    console.error('❌ N8N_APPOINTMENT_COMPLETED_WEBHOOK_URL not configured')
    return false
  }

  try {
    console.log('==================== TRIGGERING FEEDBACK REQUEST ====================')
    console.log('Appointment ID:', data.appointmentId)
    console.log('Patient:', data.patientName)
    console.log('Phone:', data.patientPhone)
    console.log('Service:', data.service)
    console.log('Completed:', data.completedDate)
    console.log('N8N will send SMS in 24 hours...')
    console.log('====================================================================')

    const response = await fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointmentId: data.appointmentId,
        patientName: data.patientName,
        patientPhone: data.patientPhone,
        service: data.service,
        completedDate: data.completedDate,
        triggeredAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error(`N8N webhook failed: ${response.status}`)
    }

    console.log('✅ Feedback request scheduled successfully!')
    console.log(`📱 SMS will be sent to ${data.patientPhone} in 24 hours`)

    return true
  } catch (error) {
    console.error('❌ Failed to trigger feedback request:', error)
    return false
  }
}

/**
 * Example usage when appointment is completed
 */
export async function markAppointmentAsCompleted(appointmentId: string) {
  // Your existing logic to update appointment status in database
  // ... update Supabase appointment status to 'completed' ...

  // Then trigger feedback request
  const result = await triggerFeedbackRequest({
    appointmentId: appointmentId,
    patientName: 'John Smith', // Get from your database
    patientPhone: '+61412345678', // Get from your database
    service: 'Dental Checkup', // Get from your database
    completedDate: new Date().toISOString(),
  })

  if (result) {
    console.log('✅ Appointment completed and feedback request scheduled')
  } else {
    console.warn('⚠️ Appointment completed but feedback request failed')
  }
}
