# 🦷 Dental4Web CRM Integration Guide

**Date**: November 24, 2025
**For**: Star Smiles Dental Centre Website
**CRM**: Dental4Web

---

## 📋 Overview

This guide explains how to integrate your Star Smiles website with Dental4Web CRM to automatically:
- ✅ Create patient records from booking submissions
- ✅ Log contact inquiries
- ✅ Sync appointment requests
- ✅ Track lead sources
- ✅ Update patient information

---

## 🔗 Integration Methods

Dental4Web supports multiple integration approaches:

### Method 1: Direct API Integration (Recommended)
- Direct connection from website to Dental4Web API
- Real-time data sync
- Most reliable and immediate

### Method 2: Via N8N Webhook (Easiest)
- Use n8n as middleware between website and Dental4Web
- Visual workflow builder
- No coding required
- Recommended for most users

### Method 3: Email Parsing
- Dental4Web reads structured emails
- Fallback option if API unavailable
- Less reliable, slower

---

## 🚀 Method 1: Direct API Integration

### Step 1: Get Dental4Web API Credentials

1. Log into your Dental4Web admin panel
2. Go to **Settings** → **API Access**
3. Generate API credentials:
   - API Key
   - API Secret
   - Practice ID
   - API Endpoint URL (usually `https://api.dental4web.com` or similar)

### Step 2: Add Credentials to .env.local

```bash
# ==========================================
# DENTAL4WEB CRM INTEGRATION
# ==========================================
DENTAL4WEB_API_KEY=your_api_key_here
DENTAL4WEB_API_SECRET=your_api_secret_here
DENTAL4WEB_PRACTICE_ID=your_practice_id_here
DENTAL4WEB_API_URL=https://api.dental4web.com
```

### Step 3: Create API Integration Helper

Create `lib/dental4web.ts`:

```typescript
// lib/dental4web.ts
interface Dental4WebConfig {
  apiKey: string
  apiSecret: string
  practiceId: string
  apiUrl: string
}

interface PatientData {
  firstName: string
  lastName: string
  email: string
  phone: string
  source?: string
}

interface AppointmentData extends PatientData {
  service: string
  preferredDate: string
  preferredTime: string
  notes?: string
}

class Dental4WebClient {
  private config: Dental4WebConfig

  constructor(config: Dental4WebConfig) {
    this.config = config
  }

  private async makeRequest(endpoint: string, data: any) {
    const url = `${this.config.apiUrl}${endpoint}`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.config.apiKey,
        'X-API-Secret': this.config.apiSecret,
        'X-Practice-ID': this.config.practiceId,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Dental4Web API error: ${response.statusText}`)
    }

    return response.json()
  }

  // Create or update patient record
  async createPatient(data: PatientData) {
    const [firstName, ...lastNameParts] = data.firstName.split(' ')
    const lastName = lastNameParts.join(' ') || data.lastName || ''

    return this.makeRequest('/patients', {
      first_name: firstName,
      last_name: lastName,
      email: data.email,
      phone: data.phone,
      source: data.source || 'website',
      practice_id: this.config.practiceId,
    })
  }

  // Create appointment request
  async createAppointment(data: AppointmentData) {
    const [firstName, ...lastNameParts] = data.firstName.split(' ')
    const lastName = lastNameParts.join(' ') || ''

    return this.makeRequest('/appointments/requests', {
      patient: {
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.phone,
      },
      appointment: {
        service: data.service,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        notes: data.notes || '',
        status: 'requested',
        source: 'website',
      },
      practice_id: this.config.practiceId,
    })
  }

  // Log contact inquiry
  async createInquiry(data: PatientData & { subject: string; message: string }) {
    const [firstName, ...lastNameParts] = data.firstName.split(' ')
    const lastName = lastNameParts.join(' ') || ''

    return this.makeRequest('/inquiries', {
      patient: {
        first_name: firstName,
        last_name: lastName,
        email: data.email,
        phone: data.phone,
      },
      inquiry: {
        subject: data.subject,
        message: data.message,
        source: 'website_contact_form',
        status: 'new',
      },
      practice_id: this.config.practiceId,
    })
  }
}

// Export singleton instance
export const dental4web = new Dental4WebClient({
  apiKey: process.env.DENTAL4WEB_API_KEY!,
  apiSecret: process.env.DENTAL4WEB_API_SECRET!,
  practiceId: process.env.DENTAL4WEB_PRACTICE_ID!,
  apiUrl: process.env.DENTAL4WEB_API_URL || 'https://api.dental4web.com',
})
```

### Step 4: Update Booking API Route

Update `app/api/booking/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { dental4web } from '@/lib/dental4web'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, service, preferredDate, preferredTime, message } = data

    // Send to Dental4Web CRM
    try {
      await dental4web.createAppointment({
        firstName: name,
        lastName: '',
        email,
        phone,
        service,
        preferredDate,
        preferredTime,
        notes: message,
        source: 'website',
      })
    } catch (crmError) {
      console.error('Dental4Web CRM error:', crmError)
      // Continue even if CRM fails - don't block user
    }

    // Also send to n8n webhook for email notifications
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'website',
          timestamp: new Date().toISOString(),
        }),
      })
    }

    return NextResponse.json({ success: true, message: 'Booking request submitted successfully' })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit booking request' },
      { status: 500 }
    )
  }
}
```

### Step 5: Update Contact API Route

Update `app/api/contact/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { dental4web } from '@/lib/dental4web'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, email, phone, subject, message } = data

    // Send to Dental4Web CRM
    try {
      await dental4web.createInquiry({
        firstName: name,
        lastName: '',
        email,
        phone,
        subject,
        message,
        source: 'website_contact_form',
      })
    } catch (crmError) {
      console.error('Dental4Web CRM error:', crmError)
      // Continue even if CRM fails
    }

    // Also send to n8n webhook for email notifications
    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          source: 'contact_form',
          timestamp: new Date().toISOString(),
        }),
      })
    }

    return NextResponse.json({ success: true, message: 'Contact inquiry submitted successfully' })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit contact inquiry' },
      { status: 500 }
    )
  }
}
```

### Step 6: Test the Integration

Restart your dev server after adding credentials:

```bash
# Kill current server (Ctrl+C)
npm run dev
```

Test booking submission:
1. Go to http://localhost:3003/book
2. Fill in and submit the form
3. Check Dental4Web CRM for new patient/appointment record

---

## 🔗 Method 2: Via N8N Webhook (Recommended for Most Users)

This method uses n8n as middleware, making it easier to configure and modify without code changes.

### Architecture Flow

```
Website Form → n8n Webhook → Dental4Web API
                           → Email Notifications
                           → Google Sheets (optional)
                           → Slack (optional)
```

### Step 1: Set Up N8N Webhooks

Follow the `N8N_WEBHOOK_SETUP.md` guide to create your booking and contact workflows.

### Step 2: Add Dental4Web Node to N8N Workflow

In your n8n workflow (after the Webhook node):

#### For Booking Workflow:

1. **Add HTTP Request Node** (or Dental4Web node if available)
2. **Configuration**:
   ```
   Method: POST
   URL: https://api.dental4web.com/appointments/requests

   Headers:
   - X-API-Key: your_api_key
   - X-API-Secret: your_api_secret
   - X-Practice-ID: your_practice_id
   - Content-Type: application/json

   Body (JSON):
   {
     "patient": {
       "first_name": "{{ $json.name.split(' ')[0] }}",
       "last_name": "{{ $json.name.split(' ').slice(1).join(' ') }}",
       "email": "{{ $json.email }}",
       "phone": "{{ $json.phone }}"
     },
     "appointment": {
       "service": "{{ $json.service }}",
       "preferred_date": "{{ $json.preferredDate }}",
       "preferred_time": "{{ $json.preferredTime }}",
       "notes": "{{ $json.message }}",
       "status": "requested",
       "source": "website"
     },
     "practice_id": "your_practice_id"
   }
   ```

#### For Contact Workflow:

1. **Add HTTP Request Node**
2. **Configuration**:
   ```
   Method: POST
   URL: https://api.dental4web.com/inquiries

   Headers:
   - X-API-Key: your_api_key
   - X-API-Secret: your_api_secret
   - X-Practice-ID: your_practice_id
   - Content-Type: application/json

   Body (JSON):
   {
     "patient": {
       "first_name": "{{ $json.name.split(' ')[0] }}",
       "last_name": "{{ $json.name.split(' ').slice(1).join(' ') }}",
       "email": "{{ $json.email }}",
       "phone": "{{ $json.phone }}"
     },
     "inquiry": {
       "subject": "{{ $json.subject }}",
       "message": "{{ $json.message }}",
       "source": "website_contact_form",
       "status": "new"
     },
     "practice_id": "your_practice_id"
   }
   ```

### Step 3: Add Error Handling

Add an **IF Node** after the Dental4Web API call:

```
IF → Status Code = 200 or 201
  TRUE → Send success email
  FALSE → Send error notification to admin
```

### Step 4: Test the N8N Workflow

Use the test data from `N8N_WEBHOOK_SETUP.md` and verify:
- ✅ Data reaches n8n webhook
- ✅ Dental4Web API call succeeds
- ✅ Patient/appointment created in CRM
- ✅ Email notifications sent

---

## 📧 Method 3: Email Parsing (Fallback)

If Dental4Web API is unavailable, use email parsing:

### Configure Dental4Web Email Ingestion

1. Log into Dental4Web admin
2. Go to **Settings** → **Email Integration**
3. Get your unique ingestion email (e.g., `intake-12345@dental4web.com`)
4. Configure parsing rules

### Update N8N Workflow

Add **Send Email** node to n8n workflows with structured format:

```
To: intake-12345@dental4web.com
Subject: [NEW_APPOINTMENT] {{ $json.name }}

PATIENT_INFO:
Name: {{ $json.name }}
Email: {{ $json.email }}
Phone: {{ $json.phone }}

APPOINTMENT_INFO:
Service: {{ $json.service }}
Preferred Date: {{ $json.preferredDate }}
Preferred Time: {{ $json.preferredTime }}
Notes: {{ $json.message }}

SOURCE: website
TIMESTAMP: {{ $json.timestamp }}
```

Dental4Web will parse this structured email and create records automatically.

---

## 🔐 Security Best Practices

### 1. Protect API Credentials

```bash
# .env.local
DENTAL4WEB_API_KEY=xxxxx
DENTAL4WEB_API_SECRET=xxxxx
DENTAL4WEB_PRACTICE_ID=xxxxx
```

**Never commit these to git!** Add to `.gitignore`:

```
.env.local
.env*.local
```

### 2. Use Environment-Specific Credentials

```bash
# Development
DENTAL4WEB_API_URL=https://sandbox.dental4web.com

# Production
DENTAL4WEB_API_URL=https://api.dental4web.com
```

### 3. Implement Rate Limiting

Add rate limiting to API routes to prevent abuse:

```typescript
// lib/rate-limit.ts
import { NextRequest } from 'next/server'

const rateLimit = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(request: NextRequest, limit = 5, windowMs = 60000) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const now = Date.now()

  const record = rateLimit.get(ip)

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count++
  return true
}
```

Use in API routes:

```typescript
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  if (!checkRateLimit(request, 5, 60000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // ... rest of handler
}
```

### 4. Validate Input Data

```typescript
function validateBookingData(data: any) {
  const errors: string[] = []

  if (!data.name || data.name.length < 2) {
    errors.push('Name must be at least 2 characters')
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email required')
  }

  if (!data.phone || !/^[\d\s\+\-\(\)]+$/.test(data.phone)) {
    errors.push('Valid phone number required')
  }

  return { valid: errors.length === 0, errors }
}
```

---

## 📊 Tracking and Analytics

### Add Source Tracking

Track where patients come from:

```typescript
// In booking form submission
const formData = {
  ...data,
  source: 'website',
  utm_source: searchParams.get('utm_source'),
  utm_medium: searchParams.get('utm_medium'),
  utm_campaign: searchParams.get('utm_campaign'),
  referrer: document.referrer,
}
```

### Log to Analytics

```typescript
// Track in Google Analytics
if (window.gtag) {
  window.gtag('event', 'booking_submission', {
    service: data.service,
    value: 1,
  })
}
```

---

## 🧪 Testing Checklist

### Development Testing:

- [ ] API credentials configured in .env.local
- [ ] Dev server restarted after adding credentials
- [ ] Booking form submits successfully
- [ ] Patient record created in Dental4Web
- [ ] Appointment request appears in CRM
- [ ] Contact form submits successfully
- [ ] Contact inquiry logged in CRM
- [ ] Email notifications still work
- [ ] Error handling works (test with invalid credentials)

### Production Testing:

- [ ] Production API credentials configured
- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] SSL/HTTPS enabled
- [ ] CORS configured correctly
- [ ] Error logging to monitoring service
- [ ] Test from multiple devices
- [ ] Verify data appears in CRM dashboard

---

## 🔧 Troubleshooting

### Issue: "API authentication failed"
**Cause**: Invalid API credentials
**Fix**:
1. Verify API Key and Secret in Dental4Web admin
2. Check Practice ID is correct
3. Ensure credentials in .env.local match exactly
4. Restart dev server after updating .env.local

### Issue: "Patient not created in CRM"
**Cause**: Data format mismatch
**Fix**:
1. Check Dental4Web API documentation for required fields
2. Verify first_name/last_name split logic
3. Ensure phone format matches CRM requirements (may need formatting)
4. Check CRM logs for specific error messages

### Issue: "Request timeout"
**Cause**: API endpoint unreachable
**Fix**:
1. Verify API URL is correct
2. Check firewall/network settings
3. Test API endpoint with curl:
   ```bash
   curl -X POST https://api.dental4web.com/test \
     -H "X-API-Key: your_key" \
     -H "X-API-Secret: your_secret"
   ```

### Issue: "Duplicate patient records"
**Cause**: CRM not matching existing patients
**Fix**:
1. Check if Dental4Web has duplicate detection enabled
2. Use patient lookup before creating new record
3. Configure matching rules in CRM (match by email/phone)

---

## 🎯 Advanced Features

### 1. Patient Lookup Before Creating

```typescript
async function findOrCreatePatient(data: PatientData) {
  // Check if patient exists
  const existing = await dental4web.findPatient({
    email: data.email,
    phone: data.phone,
  })

  if (existing) {
    return existing
  }

  // Create new patient
  return dental4web.createPatient(data)
}
```

### 2. Appointment Availability Check

```typescript
async function checkAvailability(date: string, time: string) {
  const slots = await dental4web.getAvailableSlots(date)
  return slots.includes(time)
}
```

### 3. Automatic Appointment Confirmation

```typescript
// In n8n workflow, add logic:
IF appointment.status === 'confirmed'
  → Send confirmation SMS to patient
  → Add to Google Calendar
  → Update patient portal
```

### 4. Two-Way Sync

Set up webhook from Dental4Web to your website:

```typescript
// app/api/dental4web/webhook/route.ts
export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-dental4web-signature')

  // Verify webhook signature
  if (!verifySignature(signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const data = await request.json()

  // Handle different event types
  switch (data.event) {
    case 'appointment.confirmed':
      // Update patient portal
      // Send confirmation email
      break
    case 'appointment.cancelled':
      // Notify patient
      // Update portal
      break
  }

  return NextResponse.json({ received: true })
}
```

---

## 📝 API Endpoint Reference

### Common Dental4Web API Endpoints:

```
POST /patients                   - Create patient
GET  /patients/:id               - Get patient details
PUT  /patients/:id               - Update patient
POST /appointments/requests      - Create appointment request
GET  /appointments               - List appointments
POST /inquiries                  - Create inquiry
GET  /services                   - List available services
GET  /availability/:date         - Get available time slots
```

### Request Headers:

```
X-API-Key: your_api_key
X-API-Secret: your_api_secret
X-Practice-ID: your_practice_id
Content-Type: application/json
```

---

## ✅ Pre-Launch Checklist

Before going live with Dental4Web integration:

- [ ] API credentials obtained from Dental4Web
- [ ] Credentials added to production .env
- [ ] Integration code tested in development
- [ ] Test patient records created successfully
- [ ] Test appointments appear in CRM
- [ ] Email notifications still working
- [ ] Error handling tested
- [ ] Rate limiting enabled
- [ ] Input validation working
- [ ] Analytics tracking configured
- [ ] Staff trained on new CRM workflow
- [ ] Backup email parsing configured (fallback)
- [ ] Monitoring/alerting set up for API failures

---

## 🆘 Support Resources

### Dental4Web Support:
- Documentation: https://docs.dental4web.com
- Support Email: support@dental4web.com
- Phone: (Check your account for support number)

### Integration Support:
- Check `N8N_WEBHOOK_SETUP.md` for webhook help
- Check `PRODUCTION_READINESS_REPORT.md` for deployment guide
- Ask me: "How do I troubleshoot Dental4Web API errors?"

---

**Integration Guide Created**: November 24, 2025
**For**: Star Smiles Dental Centre
**CRM**: Dental4Web
**Methods**: Direct API, N8N Middleware, Email Parsing
