# 🎯 Star Smiles - Smart Feedback & Review Workflow

## Overview
This N8N workflow sends feedback surveys 24 hours after appointments, then based on responses:
- **Happy customers (4-5 stars)**: Get Google review link + $10 coupon
- **Unhappy customers (1-3 stars)**: Get thank you message, staff notified

---

## 📋 Prerequisites

1. **N8N Account**: https://sagma.app.n8n.cloud/
2. **Twilio Account** with:
   - Account SID
   - Auth Token
   - Twilio Phone Number
3. **Google Review Link**: `https://search.google.com/local/writereview?placeid=ChIJYUvLkR9P1moRUHxzKbfxgB0`

---

## 🔧 N8N Workflow Setup

### Step 1: Create New Workflow

1. Login to N8N: https://sagma.app.n8n.cloud/
2. Click **"New Workflow"**
3. Name it: **"Star Smiles - Feedback & Reviews"**

---

### Step 2: Add Webhook Trigger (Appointment Completed)

**Node 1: Webhook - Appointment Completed**

1. Add node → **Webhook**
2. Configure:
   - **HTTP Method**: POST
   - **Path**: `starsmiles-appointment-completed`
   - **Response Mode**: Last Node
3. **Test URL**: `https://sagma.app.n8n.cloud/webhook-test/starsmiles-appointment-completed`
4. **Production URL**: `https://sagma.app.n8n.cloud/webhook/starsmiles-appointment-completed`

**Expected Data**:
```json
{
  "appointmentId": "abc123",
  "patientName": "John Smith",
  "patientPhone": "+61412345678",
  "service": "Dental Checkup",
  "completedDate": "2024-01-15"
}
```

---

### Step 3: Wait 24 Hours

**Node 2: Wait**

1. Add node → **Schedule Trigger** → **Wait**
2. Configure:
   - **Resume After**: 24 hours
   - OR **Resume At**: Specific time (e.g., 10 AM next day)

---

### Step 4: Send Feedback Survey SMS

**Node 3: Twilio - Send Survey SMS**

1. Add node → **Twilio**
2. Create Twilio credentials:
   - **Account SID**: (from Twilio dashboard)
   - **Auth Token**: (from Twilio dashboard)
3. Configure message:
   - **From**: Your Twilio phone number (e.g., +61412345678)
   - **To**: `{{ $json.patientPhone }}`
   - **Message**:
   ```
   Hi {{ $json.patientName }}! 👋

   Thanks for choosing Star Smiles! We'd love to hear about your recent {{ $json.service }} visit.

   Please share your feedback: https://starsmiles.com.au/feedback?apt={{ $json.appointmentId }}&name={{ $json.patientName }}

   It takes just 30 seconds! ⭐

   - Star Smiles Team
   ```

---

### Step 5: Receive Feedback Response

**Node 4: Webhook - Feedback Received**

1. Add node → **Webhook**
2. Configure:
   - **HTTP Method**: POST
   - **Path**: `starsmiles-feedback`
   - **Response Mode**: Last Node
3. **Production URL**: `https://sagma.app.n8n.cloud/webhook/starsmiles-feedback`

**Expected Data**:
```json
{
  "appointmentId": "abc123",
  "patientName": "John Smith",
  "rating": 5,
  "comments": "Great service!",
  "timestamp": "2024-01-16T10:30:00Z",
  "isPositive": true
}
```

---

### Step 6: Check Rating (IF Node)

**Node 5: IF - Check Rating**

1. Add node → **IF**
2. Configure:
   - **Condition**: `{{ $json.isPositive }}` equals `true`
   - OR: `{{ $json.rating }}` >= `4`

This will split into two paths:
- **TRUE** (Happy customers - 4-5 stars)
- **FALSE** (Unhappy customers - 1-3 stars)

---

### Step 7a: Happy Customer Path (Rating ≥ 4)

**Node 6a: Function - Generate Coupon Code**

1. Add node → **Code** → **Run Once for All Items**
2. Code:
```javascript
const appointmentId = $input.first().json.appointmentId;
const timestamp = Date.now();
const couponCode = `STAR10-${appointmentId.slice(0,4).toUpperCase()}-${timestamp.toString().slice(-4)}`;

return {
  ...$ input.first().json,
  couponCode: couponCode,
  couponValue: 10,
  expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days
};
```

**Node 7a: Twilio - Send Review Request + Coupon**

1. Add node → **Twilio**
2. Configure:
   - **From**: Your Twilio number
   - **To**: `{{ $json.patientPhone }}`
   - **Message**:
   ```
   🌟 Thank you for the great feedback, {{ $json.patientName }}!

   We'd be honored if you'd share your experience on Google:
   👉 https://search.google.com/local/writereview?placeid=ChIJYUvLkR9P1moRUHxzKbfxgB0

   As a thank you, here's $10 OFF your next visit:

   💰 Code: {{ $json.couponCode }}
   📅 Valid until: {{ $json.expiryDate.split('T')[0] }}

   Thank you for choosing Star Smiles! ⭐
   ```

---

### Step 7b: Unhappy Customer Path (Rating < 4)

**Node 6b: Twilio - Send Thank You SMS**

1. Add node → **Twilio**
2. Configure:
   - **From**: Your Twilio number
   - **To**: `{{ $json.patientPhone }}`
   - **Message**:
   ```
   Thank you for your honest feedback, {{ $json.patientName }}.

   We take your concerns seriously and will use this to improve our service.

   Our team will review your feedback shortly. If you'd like to discuss this further, please call us at (03) 9562 0675.

   - Star Smiles Team
   ```

**Node 7b: Send Email - Notify Staff**

1. Add node → **Gmail** (or **Send Email**)
2. Configure:
   - **To**: `info@starsmiles.com.au`
   - **Subject**: `⚠️ Low Feedback Rating - {{ $json.patientName }}`
   - **Body**:
   ```
   ATTENTION: Negative Feedback Received

   Patient: {{ $json.patientName }}
   Appointment ID: {{ $json.appointmentId }}
   Rating: {{ $json.rating }} / 5 stars
   Comments: {{ $json.comments }}
   Date: {{ $json.timestamp }}

   Action Required: Please follow up with this patient.
   ```

---

## 🔗 Integration with Your Website

### Update .env.local

Add this to your `.env.local` (already done):
```bash
N8N_FEEDBACK_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-feedback
```

### Trigger the Workflow

When an appointment is completed, send a POST request from your appointment system:

```javascript
// Example: After marking appointment as completed
await fetch('https://sagma.app.n8n.cloud/webhook/starsmiles-appointment-completed', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    appointmentId: appointment.id,
    patientName: appointment.patient_name,
    patientPhone: appointment.patient_phone,
    service: appointment.service,
    completedDate: new Date().toISOString()
  })
});
```

---

## 📊 Workflow Visualization

```
[Appointment Completed Webhook]
           ↓
      [Wait 24 Hours]
           ↓
   [Send Feedback SMS]
           ↓
 [Receive Feedback Webhook]
           ↓
    [IF: Rating ≥ 4?]
     ↙            ↘
  YES (4-5 ⭐)    NO (1-3 ⭐)
     ↓               ↓
[Generate Coupon] [Send Thank You]
     ↓               ↓
[Send Review+$10] [Notify Staff]
```

---

## ✅ Testing the Workflow

### Test 1: Happy Customer (5 stars)

1. Send test webhook to appointment-completed
2. Skip wait (use "Execute" button to skip)
3. Verify SMS received with survey link
4. Submit feedback with 5-star rating
5. Check SMS for Google review link + coupon code

### Test 2: Unhappy Customer (2 stars)

1. Send test webhook
2. Skip wait
3. Submit feedback with 2-star rating
4. Verify:
   - Thank you SMS sent
   - Staff email received
   - NO review link sent

---

## 🎯 Next Steps

1. **Activate the workflow** in N8N
2. **Test with your phone number** first
3. **Verify Twilio balance** is sufficient
4. **Monitor the first few runs** to ensure everything works
5. **Adjust messaging** based on response rates

---

## 🔐 Security Notes

- ✅ Webhook URLs are unique to your N8N instance
- ✅ Only accepts POST requests
- ✅ Patient data is not stored (passes through N8N only)
- ✅ Twilio credentials are encrypted in N8N

---

## 💡 Pro Tips

1. **Timing**: Test different times (morning vs evening) for best response rates
2. **Personalization**: The patient's name is automatically included
3. **Coupon Codes**: Each code is unique and trackable
4. **Follow-up**: For very low ratings (1-2 stars), consider a phone call instead of just email
5. **Analytics**: Track review link clicks in N8N execution logs

---

**Need help?** Contact your N8N instance or check execution logs at:
https://sagma.app.n8n.cloud/workflow/[your-workflow-id]/executions
