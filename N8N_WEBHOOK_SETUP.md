# 🔗 N8N Webhook Setup Guide - Star Smiles

Complete guide to set up n8n webhooks for booking submissions and contact forms.

---

## 📋 Overview

You need to create **2 workflows** in n8n:

1. **Booking Submissions Workflow** - Handles appointment bookings
2. **Contact Form Workflow** - Handles contact inquiries

Each workflow will:
- ✅ Receive data from the website
- ✅ Send email notifications
- ✅ (Optional) Store in Google Sheets or Airtable
- ✅ (Optional) Send SMS notifications
- ✅ (Optional) Add to CRM

---

## 🚀 Quick Start

### Step 1: Access Your N8N Instance

Your n8n instance: `https://sagma.app.n8n.cloud`

1. Log in to n8n
2. Click "**+ New Workflow**"
3. Create 2 separate workflows

---

## 📬 Workflow 1: Booking Submissions

### Data Received from Website:

```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+61412345678",
  "service": "General Check-up",
  "preferredDate": "2025-12-01",
  "preferredTime": "morning",
  "message": "I have some tooth sensitivity",
  "source": "website",
  "timestamp": "2025-11-24T10:30:00.000Z"
}
```

### N8N Workflow Steps:

#### Node 1: Webhook Trigger
1. Add "**Webhook**" node
2. Configuration:
   - **HTTP Method**: POST
   - **Path**: `starsmiles-booking` (or your custom path)
   - **Authentication**: None (or Basic Auth if you prefer)
   - **Respond**: Immediately
   - **Response Code**: 200

3. **Save** and copy the webhook URL
   - Example: `https://sagma.app.n8n.cloud/webhook/starsmiles-booking`

#### Node 2: Email Notification
1. Add "**Send Email (SMTP)**" or "**Gmail**" node
2. Configuration:
   ```
   From: noreply@starsmiles.com.au
   To: info@starsmiles.com.au (your practice email)
   Subject: 🦷 New Booking Request - {{ $json.name }}

   Email Body:
   ---
   NEW BOOKING REQUEST

   Patient Details:
   - Name: {{ $json.name }}
   - Email: {{ $json.email }}
   - Phone: {{ $json.phone }}

   Appointment Details:
   - Service: {{ $json.service }}
   - Preferred Date: {{ $json.preferredDate }}
   - Preferred Time: {{ $json.preferredTime }}

   Message:
   {{ $json.message }}

   Source: {{ $json.source }}
   Time: {{ $json.timestamp }}

   ---
   Please contact the patient to confirm their appointment.
   ```

#### Node 3: Patient Confirmation Email (Optional)
1. Add another "**Send Email**" node
2. Configuration:
   ```
   From: noreply@starsmiles.com.au
   To: {{ $json.email }}
   Subject: Thank You for Booking with Star Smiles! 🌟

   Email Body:
   ---
   Hi {{ $json.name }},

   Thank you for booking an appointment with Star Smiles Dental Centre!

   We've received your request for:
   - Service: {{ $json.service }}
   - Preferred Date: {{ $json.preferredDate }}
   - Preferred Time: {{ $json.preferredTime }}

   One of our team members will contact you within 24 hours to confirm
   your appointment time.

   If you have any urgent questions, please call us:
   📞 (03) 9562 0675

   Best regards,
   Star Smiles Dental Centre Team

   Making Beautiful Smiles a Reality ✨
   ---
   ```

#### Node 4: Google Sheets (Optional)
1. Add "**Google Sheets**" node
2. Configuration:
   - **Operation**: Append
   - **Spreadsheet**: Create a "Star Smiles Bookings" sheet
   - **Sheet**: Sheet1
   - **Columns**: Name, Email, Phone, Service, Date, Time, Message, Timestamp

#### Node 5: Slack/Teams Notification (Optional)
1. Add "**Slack**" or "**Microsoft Teams**" node
2. Send real-time notification to your team channel

---

### Test Booking Workflow:

**Test JSON** (use in n8n "Test webhook" feature):
```json
{
  "name": "Test Patient",
  "email": "test@example.com",
  "phone": "+61400000000",
  "service": "General Check-up",
  "preferredDate": "2025-12-01",
  "preferredTime": "morning",
  "message": "This is a test booking",
  "source": "website",
  "timestamp": "2025-11-24T10:30:00.000Z"
}
```

**Expected Result:**
- ✅ Email sent to practice
- ✅ Confirmation email to patient
- ✅ (If enabled) Row added to Google Sheets
- ✅ (If enabled) Slack notification sent

---

## 📧 Workflow 2: Contact Form

### Data Received from Website:

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+61498765432",
  "subject": "Services Information",
  "message": "I would like to know more about dental implants.",
  "source": "contact_form",
  "timestamp": "2025-11-24T11:00:00.000Z"
}
```

### N8N Workflow Steps:

#### Node 1: Webhook Trigger
1. Add "**Webhook**" node
2. Configuration:
   - **HTTP Method**: POST
   - **Path**: `starsmiles-contact` (or your custom path)
   - **Authentication**: None
   - **Respond**: Immediately
   - **Response Code**: 200

3. **Save** and copy the webhook URL
   - Example: `https://sagma.app.n8n.cloud/webhook/starsmiles-contact`

#### Node 2: Email Notification
1. Add "**Send Email**" node
2. Configuration:
   ```
   From: noreply@starsmiles.com.au
   To: info@starsmiles.com.au
   Subject: 📬 New Contact Form Submission - {{ $json.subject }}

   Email Body:
   ---
   NEW CONTACT FORM SUBMISSION

   Contact Details:
   - Name: {{ $json.name }}
   - Email: {{ $json.email }}
   - Phone: {{ $json.phone }}
   - Subject: {{ $json.subject }}

   Message:
   {{ $json.message }}

   Source: {{ $json.source }}
   Time: {{ $json.timestamp }}

   ---
   Please respond to this inquiry promptly.
   ```

#### Node 3: Auto-Reply Email (Optional)
1. Add another "**Send Email**" node
2. Configuration:
   ```
   From: noreply@starsmiles.com.au
   To: {{ $json.email }}
   Subject: Thank you for contacting Star Smiles! 🌟

   Email Body:
   ---
   Hi {{ $json.name }},

   Thank you for contacting Star Smiles Dental Centre!

   We've received your message regarding: {{ $json.subject }}

   Our team will review your inquiry and respond within 24 hours.

   In the meantime, if you have an urgent matter, please don't hesitate
   to call us:
   📞 (03) 9562 0675

   Opening Hours:
   Monday - Friday: 9:00 AM - 6:00 PM
   Saturday: 9:00 AM - 1:00 PM
   Sunday: Closed

   Best regards,
   Star Smiles Dental Centre Team

   Making Beautiful Smiles a Reality ✨
   ---
   ```

#### Node 4: Google Sheets (Optional)
1. Add "**Google Sheets**" node
2. Configuration:
   - **Operation**: Append
   - **Spreadsheet**: Create a "Star Smiles Contacts" sheet
   - **Sheet**: Sheet1
   - **Columns**: Name, Email, Phone, Subject, Message, Timestamp

---

### Test Contact Workflow:

**Test JSON**:
```json
{
  "name": "Test Contact",
  "email": "test@example.com",
  "phone": "+61400000000",
  "subject": "Test Inquiry",
  "message": "This is a test contact form submission.",
  "source": "contact_form",
  "timestamp": "2025-11-24T11:00:00.000Z"
}
```

**Expected Result:**
- ✅ Email sent to practice
- ✅ Auto-reply sent to contact
- ✅ (If enabled) Row added to Google Sheets

---

## ⚙️ Update Environment Variables

After creating the webhooks, update your `.env.local` file:

```bash
# Get these URLs from your n8n workflows
N8N_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-booking
N8N_CONTACT_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-contact
```

**IMPORTANT**: Restart your development server after updating:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## 🧪 Testing From Website

### Test Booking Form:
1. Go to: http://localhost:3003/book
2. Scroll to "**Online Form**" section
3. Fill in all fields:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: +61400000000
   - Service: General Check-up
   - Date: Tomorrow
   - Time: Morning
   - Message: Test booking
4. Click "**Request Appointment**"
5. Check:
   - ✅ Success message appears
   - ✅ Email arrives at practice email
   - ✅ Confirmation email arrives at your test email
   - ✅ Check n8n execution log

### Test Contact Form:
1. Go to: http://localhost:3003/contact
2. Fill in contact form:
   - Name: Test User
   - Email: your-email@example.com
   - Phone: +61400000000
   - Subject: Services Information
   - Message: Test inquiry
3. Click "**Send Message**"
4. Check:
   - ✅ Success message appears
   - ✅ Email arrives at practice email
   - ✅ Auto-reply arrives at your test email
   - ✅ Check n8n execution log

---

## 🔧 Troubleshooting

### Issue: "Network Error" when submitting form
**Cause**: Webhook URL not configured or incorrect
**Fix**:
1. Check `.env.local` has correct webhook URLs
2. Restart dev server
3. Verify webhook URLs are accessible
4. Check n8n workflow is activated

### Issue: No emails received
**Cause**: Email node not configured correctly
**Fix**:
1. Check SMTP credentials in n8n
2. Verify "From" email is authorized
3. Check spam folder
4. Review n8n execution log for errors

### Issue: Webhook receives data but email fails
**Cause**: Email configuration error
**Fix**:
1. Go to n8n workflow executions
2. Click failed execution
3. Check error message
4. Update email node configuration
5. Re-test

### Issue: "Missing required fields" error
**Cause**: Form not sending all required data
**Fix**:
1. Check browser console for errors
2. Verify API route is being called
3. Check network tab for request payload
4. Ensure all required fields filled in form

---

## 📊 Monitoring & Logs

### In N8N:
1. Click "**Executions**" in left sidebar
2. View all webhook triggers
3. See success/failure status
4. Click execution to see full data flow
5. Check error messages if failed

### In Your Application:
1. Check browser console (F12)
2. Look for network errors
3. Check API response status codes
4. Review server logs if self-hosting

---

## 🎨 Advanced Workflows (Optional)

### Add SMS Notifications:
1. Add "**Twilio**" or "**Vonage**" node
2. Send SMS to practice manager for urgent bookings
3. Send SMS confirmation to patient

### Add to CRM:
1. Add "**HubSpot**", "**Salesforce**", or "**Pipedrive**" node
2. Create contact/lead automatically
3. Track communication history

### Add to Calendar:
1. Add "**Google Calendar**" node
2. Create tentative appointment
3. Link to booking data

### Add Slack Notification:
1. Add "**Slack**" node
2. Post to #bookings channel
3. Include patient details and action buttons

---

## 🔐 Security Best Practices

### For Production:
1. **Enable Webhook Authentication**:
   - Use Basic Auth in n8n webhook
   - Add username/password
   - Update website API to send credentials

2. **Use Environment Variables**:
   - Never commit webhook URLs to git
   - Keep `.env.local` secure
   - Use different webhooks for dev/prod

3. **Add Rate Limiting**:
   - Implement rate limiting in Next.js
   - Prevent spam submissions
   - Add CAPTCHA if needed

4. **Sanitize Data**:
   - Validate all inputs
   - Prevent injection attacks
   - Escape special characters

---

## 📝 Workflow Templates (Import Ready)

### Booking Workflow JSON:
Save this as `booking-workflow.json` and import to n8n:

```json
{
  "name": "Star Smiles - Booking Submissions",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "starsmiles-booking",
        "responseMode": "onReceived",
        "responseCode": 200
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "fromEmail": "noreply@starsmiles.com.au",
        "toEmail": "info@starsmiles.com.au",
        "subject": "🦷 New Booking - {{$json[\"name\"]}}",
        "text": "NEW BOOKING REQUEST\n\nName: {{$json[\"name\"]}}\nEmail: {{$json[\"email\"]}}\nPhone: {{$json[\"phone\"]}}\nService: {{$json[\"service\"]}}\nDate: {{$json[\"preferredDate\"]}}\nTime: {{$json[\"preferredTime\"]}}\n\nMessage: {{$json[\"message\"]}}"
      },
      "name": "Send Email to Practice",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2,
      "position": [450, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Send Email to Practice", "type": "main", "index": 0}]]
    }
  }
}
```

### Contact Workflow JSON:
Save this as `contact-workflow.json` and import to n8n:

```json
{
  "name": "Star Smiles - Contact Form",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "starsmiles-contact",
        "responseMode": "onReceived",
        "responseCode": 200
      },
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "fromEmail": "noreply@starsmiles.com.au",
        "toEmail": "info@starsmiles.com.au",
        "subject": "📬 Contact Form - {{$json[\"subject\"]}}",
        "text": "NEW CONTACT\n\nName: {{$json[\"name\"]}}\nEmail: {{$json[\"email\"]}}\nPhone: {{$json[\"phone\"]}}\nSubject: {{$json[\"subject\"]}}\n\nMessage:\n{{$json[\"message\"]}}"
      },
      "name": "Send Email",
      "type": "n8n-nodes-base.emailSend",
      "typeVersion": 2,
      "position": [450, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [[{"node": "Send Email", "type": "main", "index": 0}]]
    }
  }
}
```

---

## ✅ Final Checklist

Before going live, verify:

- [ ] Both workflows created in n8n
- [ ] Webhooks activated (not paused)
- [ ] Webhook URLs copied correctly
- [ ] `.env.local` updated with webhook URLs
- [ ] Development server restarted
- [ ] Email SMTP configured in n8n
- [ ] Test booking submitted successfully
- [ ] Test contact form submitted successfully
- [ ] Emails received at practice email
- [ ] Auto-reply emails working (if enabled)
- [ ] Google Sheets logging working (if enabled)
- [ ] Slack notifications working (if enabled)

---

## 🚀 You're Ready!

Once both webhooks are set up and tested, your website will:
- ✅ Accept booking requests 24/7
- ✅ Send immediate email notifications
- ✅ Auto-respond to patients
- ✅ Track all submissions
- ✅ Integrate with your workflow

**Need help?** Ask me:
- "Show me how to add SMS notifications"
- "How do I add to Google Sheets?"
- "Can you create a Slack integration?"
- "How do I secure the webhooks?"

---

**Setup Guide Created**: November 24, 2025
**For**: Star Smiles Dental Centre
**N8N Instance**: https://sagma.app.n8n.cloud
