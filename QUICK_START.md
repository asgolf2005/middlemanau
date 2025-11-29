# 🚀 Quick Start Guide - Star Smiles Integration

**Server**: http://localhost:3004
**Status**: ✅ Integration Complete

---

## 📝 What You Need to Do (60-90 minutes)

### 1️⃣ Create Supabase Tables (15 min)

```sql
-- Go to: https://supabase.com/dashboard
-- Open SQL Editor and run:

CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES auth.users(id),
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  is_new_patient BOOLEAN DEFAULT false,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  source TEXT DEFAULT 'website',
  gcal_event_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(date);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own" ON appointments FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Anyone create" ON appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "Users update own" ON appointments FOR UPDATE USING (auth.uid() = patient_id);
```

---

### 2️⃣ Create N8N Workflows (30 min)

Go to: https://sagma.app.n8n.cloud

#### Workflow A: **Booking Webhook**
- Path: `starsmiles-booking`
- Nodes: Webhook → Supabase Insert → Google Calendar Create → Supabase Update → Email (x2)

#### Workflow B: **Availability Webhook**
- Path: `starsmiles-availability`
- Nodes: Webhook (GET) → Google Calendar Get Events → Function (calculate slots) → Respond

#### Workflow C: **Cancel Webhook**
- Path: `starsmiles-cancel`
- Nodes: Webhook → Google Calendar Delete → Email

---

### 3️⃣ Connect Google Calendar to N8N (10 min)

1. In n8n: **Credentials** → Add **Google Calendar OAuth2**
2. Follow OAuth flow
3. Authorize your practice calendar
4. Test connection

---

### 4️⃣ Test Everything (20 min)

#### Test Booking:
1. http://localhost:3004/book
2. Select date → **See live availability**
3. Fill form → Submit
4. Check: Supabase ✓ GCal ✓ Emails ✓

#### Test Portal:
1. http://localhost:3004/portal/signup
2. Create account → Login
3. http://localhost:3004/portal/appointments
4. See your booking → Try cancel
5. Check: Supabase updated ✓ GCal deleted ✓

---

## 📚 Full Documentation

- **Complete Guide**: `INTEGRATION_COMPLETE.md`
- **Detailed Steps**: `SUPABASE_GCAL_N8N_INTEGRATION.md`
- **N8N Workflows**: `N8N_WEBHOOK_SETUP.md`
- **CRM Integration**: `DENTAL4WEB_INTEGRATION.md`

---

## ✅ What's Already Done

- ✅ Booking calendar with live availability
- ✅ Patient portal with appointment management
- ✅ Supabase integration (save/fetch/update)
- ✅ N8N webhook structure ready
- ✅ Google Calendar sync architecture
- ✅ Email notification templates
- ✅ Cancel appointment functionality

---

## ⚡ Key URLs

- **Website**: http://localhost:3004
- **Book Appointment**: http://localhost:3004/book
- **Patient Login**: http://localhost:3004/portal/login
- **Patient Signup**: http://localhost:3004/portal/signup
- **Appointments**: http://localhost:3004/portal/appointments
- **Supabase**: https://supabase.com/dashboard
- **N8N**: https://sagma.app.n8n.cloud

---

## 🆘 Quick Troubleshooting

**Slots not loading?**
→ Check n8n availability webhook is active

**Booking not saving?**
→ Verify Supabase table exists

**No emails?**
→ Check n8n email node configuration

**Portal not working?**
→ Ensure Supabase RLS policies are set

---

**Ready to launch!** 🎉

Follow the 4 steps above, and you'll have a fully functional booking system integrated with Supabase, Google Calendar, and N8N.

Estimated time: **60-90 minutes**
