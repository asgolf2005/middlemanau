# 🔗 Supabase + Google Calendar + N8N Integration Guide

**Date**: November 24, 2025
**For**: Star Smiles Dental Centre Website
**Systems**: Supabase (Database), Google Calendar (Scheduling), N8N (Automation)

---

## 📋 Overview

This guide shows how to integrate your **existing** n8n workflow (with Supabase + Google Calendar) into the Star Smiles website for:

- ✅ **Real-time availability** from Google Calendar
- ✅ **Patient portal** with Supabase authentication
- ✅ **Appointment management** in patient dashboard
- ✅ **Two-way sync** between website and phone system
- ✅ **Automated confirmations** via SMS/Email

---

## 🏗️ Current Architecture

### What You Already Have:
```
Phone Calls → N8N Webhook → Supabase (Store appointment)
                          → Google Calendar (Create event)
                          → Email/SMS notification
```

### What We're Adding:
```
Website Form → N8N Webhook → Supabase (Store appointment)
                           → Google Calendar (Create event)
                           → Email/SMS notification

Website Calendar ← API Route ← Google Calendar (Check availability)

Patient Portal ← Supabase Auth ← User login/signup
              → View appointments
              → Reschedule/Cancel
```

---

## 🔧 Part 1: Database Schema (Supabase)

### Step 1: Create Supabase Tables

Log into Supabase Dashboard: https://supabase.com/dashboard

**Table 1: `appointments`**

```sql
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Patient info
  patient_id UUID REFERENCES auth.users(id),
  patient_name TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  is_new_patient BOOLEAN DEFAULT false,

  -- Appointment details
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER DEFAULT 60, -- minutes
  notes TEXT,

  -- Status tracking
  status TEXT DEFAULT 'pending', -- pending, confirmed, cancelled, completed
  source TEXT DEFAULT 'website', -- website, phone, voice_ai

  -- Google Calendar sync
  gcal_event_id TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  cancelled_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  metadata JSONB
);

-- Indexes for performance
CREATE INDEX idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_gcal_event_id ON appointments(gcal_event_id);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own appointments
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = patient_id);

-- Policy: Anyone can create appointments (for booking form)
CREATE POLICY "Anyone can create appointments"
  ON appointments FOR INSERT
  WITH CHECK (true);

-- Policy: Users can update their own appointments
CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = patient_id);
```

**Table 2: `availability_slots`** (for real-time availability)

```sql
CREATE TABLE availability_slots (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INTEGER DEFAULT 60, -- minutes
  is_available BOOLEAN DEFAULT true,
  provider TEXT, -- dentist name

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_availability_date ON availability_slots(date);
CREATE INDEX idx_availability_available ON availability_slots(is_available);
```

**Table 3: `user_profiles`** (extended user data)

```sql
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),

  full_name TEXT,
  phone TEXT,
  date_of_birth DATE,
  address TEXT,
  city TEXT,
  postcode TEXT,

  -- Medical info
  health_fund TEXT,
  member_number TEXT,
  allergies TEXT,
  medical_conditions TEXT,

  -- Preferences
  preferred_dentist TEXT,
  preferred_day TEXT, -- Monday, Tuesday, etc.
  preferred_time TEXT, -- morning, afternoon, evening
  sms_reminders BOOLEAN DEFAULT true,
  email_reminders BOOLEAN DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);
```

---

## 🔗 Part 2: N8N Workflow Updates

### Your Existing Workflow

You mentioned you already have n8n handling incoming calls. Let's extend it to handle website bookings.

### Workflow 1: Booking Webhook (Updated)

**Nodes:**

1. **Webhook Trigger** (`starsmiles-booking`)
   - Receives data from website

2. **IF Node** - Check source
   - `{{ $json.source }}` equals `phone` → Go to phone flow
   - `{{ $json.source }}` equals `website` → Go to website flow

3. **[Website Flow] Supabase: Insert Appointment**
   - Table: `appointments`
   - Columns:
     ```json
     {
       "patient_name": "{{ $json.name }}",
       "patient_email": "{{ $json.email }}",
       "patient_phone": "{{ $json.phone }}",
       "service": "{{ $json.service }}",
       "date": "{{ $json.date }}",
       "time": "{{ $json.time }}",
       "notes": "{{ $json.notes }}",
       "is_new_patient": "{{ $json.isNewPatient }}",
       "source": "website",
       "status": "pending"
     }
     ```

4. **Google Calendar: Create Event**
   - Calendar ID: Your practice calendar
   - Summary: `Appointment: {{ $json.service }} - {{ $json.name }}`
   - Description:
     ```
     Patient: {{ $json.name }}
     Email: {{ $json.email }}
     Phone: {{ $json.phone }}
     Service: {{ $json.service }}
     Notes: {{ $json.notes }}
     New Patient: {{ $json.isNewPatient ? 'Yes' : 'No' }}
     Source: Website
     ```
   - Start Time: `{{ $json.date }}T{{ $json.time }}`
   - Duration: Based on service (60 minutes default)

5. **Supabase: Update with Google Calendar ID**
   - Update the appointment record with `gcal_event_id`

6. **Send Email Notification** (to practice)
   ```
   Subject: 🦷 New Website Booking - {{ $json.name }}

   NEW APPOINTMENT REQUEST

   Patient: {{ $json.name }}
   Email: {{ $json.email }}
   Phone: {{ $json.phone }}

   Service: {{ $json.service }}
   Date: {{ $json.date }}
   Time: {{ $json.time }}

   Status: Pending Confirmation
   Google Calendar: Added

   {{ $json.isNewPatient ? '📝 NEW PATIENT - Send forms' : '✅ Existing patient' }}

   Notes: {{ $json.notes }}
   ```

7. **Send Confirmation Email** (to patient)
   ```
   Subject: Booking Received - Star Smiles Dental

   Hi {{ $json.name }},

   Thank you for booking with Star Smiles!

   📅 Your appointment request:
   Service: {{ $json.service }}
   Date: {{ $json.date }}
   Time: {{ $json.time }}

   Status: Pending Confirmation

   Our team will contact you at {{ $json.phone }} within 24 hours to confirm your appointment.

   In the meantime:
   {{ $json.isNewPatient ? '📝 Please check your email for new patient forms to complete.' : '✅ You're all set! We'll see you soon.' }}

   Questions? Call us at (03) 9562 0675

   Best regards,
   Star Smiles Team
   ```

8. **[Optional] Send SMS Confirmation**
   - Use Twilio/Vonage node
   - Message: `Hi {{ $json.name }}! Your Star Smiles appointment request for {{ $json.date }} at {{ $json.time }} has been received. We'll confirm within 24 hours. - Star Smiles`

9. **[Optional] Slack/Teams Notification**
   - Notify your team channel

### Workflow 2: Get Available Slots (NEW)

This workflow provides real-time availability from Google Calendar.

**Nodes:**

1. **Webhook Trigger** (`starsmiles-availability`)
   - Method: GET
   - Query Parameters: `date` (YYYY-MM-DD)

2. **Google Calendar: Get Events**
   - Calendar ID: Your practice calendar
   - Start Time: `{{ $('Webhook').item.json.query.date }}T00:00:00`
   - End Time: `{{ $('Webhook').item.json.query.date }}T23:59:59`

3. **Function Node: Calculate Available Slots**
   ```javascript
   // Define working hours
   const workingHours = {
     Monday: { start: '09:00', end: '18:00' },
     Tuesday: { start: '09:00', end: '18:00' },
     Wednesday: { start: '09:00', end: '18:00' },
     Thursday: { start: '09:00', end: '18:00' },
     Friday: { start: '09:00', end: '18:00' },
     Saturday: { start: '09:00', end: '13:00' },
     Sunday: null // Closed
   };

   const slotDuration = 60; // minutes

   // Get existing events from Google Calendar
   const existingEvents = $input.all().map(item => ({
     start: new Date(item.json.start.dateTime),
     end: new Date(item.json.end.dateTime)
   }));

   // Generate all possible time slots
   const date = new Date($('Webhook').item.json.query.date);
   const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
   const hours = workingHours[dayName];

   if (!hours) {
     return [{ json: { availableSlots: [] } }];
   }

   const [startHour, startMin] = hours.start.split(':').map(Number);
   const [endHour, endMin] = hours.end.split(':').map(Number);

   const slots = [];
   let currentTime = new Date(date);
   currentTime.setHours(startHour, startMin, 0, 0);

   const endTime = new Date(date);
   endTime.setHours(endHour, endMin, 0, 0);

   while (currentTime < endTime) {
     // Check if slot overlaps with existing appointment
     const slotEnd = new Date(currentTime.getTime() + slotDuration * 60000);

     const isAvailable = !existingEvents.some(event => {
       return (currentTime < event.end && slotEnd > event.start);
     });

     slots.push({
       time: currentTime.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', hour12: true }),
       available: isAvailable
     });

     currentTime = new Date(currentTime.getTime() + slotDuration * 60000);
   }

   return [{ json: { date: $('Webhook').item.json.query.date, slots } }];
   ```

4. **Respond to Webhook**
   - Return the available slots JSON

---

## 💻 Part 3: Website API Routes

### Create API Route for Availability

**File: `app/api/availability/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Date parameter required' },
        { status: 400 }
      )
    }

    // Call n8n availability webhook
    const n8nAvailabilityUrl = process.env.N8N_AVAILABILITY_WEBHOOK_URL

    if (!n8nAvailabilityUrl) {
      // Fallback: return default slots
      return NextResponse.json({
        date,
        slots: getDefaultSlots()
      })
    }

    const response = await fetch(`${n8nAvailabilityUrl}?date=${date}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch availability')
    }

    const data = await response.json()
    return NextResponse.json(data)
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
  return [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '1:00 PM', available: false },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: true },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true },
  ]
}
```

### Update Booking API to Save to Supabase

**File: `app/api/booking/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, service, date, time, notes, isNewPatient } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const supabase = createClient()
    const { data: appointment, error: dbError } = await supabase
      .from('appointments')
      .insert({
        patient_name: name,
        patient_email: email,
        patient_phone: phone,
        service,
        date,
        time,
        notes,
        is_new_patient: isNewPatient || false,
        source: 'website',
        status: 'pending',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Supabase error:', dbError)
      // Continue even if DB fails - n8n will handle
    }

    // Send to n8n webhook for Google Calendar + Notifications
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL
    if (webhookUrl) {
      const webhookData = {
        name,
        email,
        phone,
        service,
        date,
        time,
        notes,
        isNewPatient: isNewPatient || false,
        source: 'website',
        timestamp: new Date().toISOString(),
        appointmentId: appointment?.id,
      }

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      })

      if (!webhookResponse.ok) {
        console.error('n8n webhook failed:', await webhookResponse.text())
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Booking request submitted successfully',
      appointmentId: appointment?.id,
    })
  } catch (error) {
    console.error('Booking API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Create API for Patient Appointments

**File: `app/api/portal/appointments/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Fetch user's appointments
    const { data: appointments, error: dbError } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', user.id)
      .order('date', { ascending: true })
      .order('time', { ascending: true })

    if (dbError) {
      throw dbError
    }

    return NextResponse.json({ appointments: appointments || [] })
  } catch (error) {
    console.error('Appointments API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Cancel appointment
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const appointmentId = searchParams.get('id')

    if (!appointmentId) {
      return NextResponse.json({ error: 'Appointment ID required' }, { status: 400 })
    }

    // Update appointment status
    const { data, error } = await supabase
      .from('appointments')
      .update({
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
      })
      .eq('id', appointmentId)
      .eq('patient_id', user.id)
      .select()
      .single()

    if (error) throw error

    // Trigger n8n to delete Google Calendar event
    const cancelWebhookUrl = process.env.N8N_CANCEL_WEBHOOK_URL
    if (cancelWebhookUrl && data) {
      await fetch(cancelWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointmentId: data.id,
          gcalEventId: data.gcal_event_id,
          patientEmail: data.patient_email,
          patientName: data.patient_name,
        }),
      })
    }

    return NextResponse.json({ success: true, appointment: data })
  } catch (error) {
    console.error('Cancel appointment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

---

## 🎨 Part 4: Update Frontend Components

### Update BookingCalendar.tsx to Use Real Availability

**Changes to `components/BookingCalendar.tsx`:**

```typescript
// Add at top
const [loadingSlots, setLoadingSlots] = useState(false)
const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([])

// Replace the static timeSlots array with dynamic fetching
useEffect(() => {
  if (bookingData.date && step === 3) {
    fetchAvailableSlots()
  }
}, [bookingData.date, step])

const fetchAvailableSlots = async () => {
  if (!bookingData.date) return

  setLoadingSlots(true)
  try {
    const dateStr = bookingData.date.toISOString().split('T')[0]
    const response = await fetch(`/api/availability?date=${dateStr}`)
    const data = await response.json()

    if (data.slots) {
      setAvailableSlots(data.slots)
    }
  } catch (error) {
    console.error('Failed to fetch availability:', error)
    // Use fallback slots
    setAvailableSlots(timeSlots)
  } finally {
    setLoadingSlots(false)
  }
}

// Update handleSubmit to use real API
const handleSubmit = async () => {
  setLoading(true)

  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
        service: bookingData.service,
        date: bookingData.date?.toISOString().split('T')[0],
        time: bookingData.time,
        notes: bookingData.notes,
        isNewPatient: bookingData.isNewPatient,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to submit booking')
    }

    setSubmitted(true)
  } catch (error) {
    console.error('Booking error:', error)
    alert('Failed to submit booking. Please try again or call us directly.')
  } finally {
    setLoading(false)
  }
}

// Update time slot rendering to use availableSlots instead of timeSlots
{loadingSlots ? (
  <div className="text-center py-8">
    <Loader2 className="animate-spin mx-auto" size={32} />
    <p className="text-gray-500 mt-2">Loading available times...</p>
  </div>
) : (
  <div className="grid grid-cols-3 gap-3">
    {availableSlots.map((slot) => (
      // ... existing slot button code
    ))}
  </div>
)}
```

### Create Patient Dashboard Appointments Page

**File: `app/portal/appointments/page.tsx`**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Phone, Mail, X, CheckCircle, AlertCircle } from 'lucide-react'

interface Appointment {
  id: string
  service: string
  date: string
  time: string
  status: string
  patient_name: string
  patient_email: string
  patient_phone: string
  notes?: string
  created_at: string
}

export default function AppointmentsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/portal/login')
        return
      }

      const response = await fetch('/api/portal/appointments')
      const data = await response.json()

      if (data.appointments) {
        setAppointments(data.appointments)
      }
    } catch (error) {
      console.error('Failed to fetch appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return
    }

    try {
      const response = await fetch(`/api/portal/appointments?id=${appointmentId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        alert('Appointment cancelled successfully')
        fetchAppointments()
      } else {
        throw new Error('Failed to cancel appointment')
      }
    } catch (error) {
      console.error('Cancel error:', error)
      alert('Failed to cancel appointment. Please call us directly.')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'cancelled': return 'bg-red-100 text-red-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle size={16} />
      case 'pending': return <Clock size={16} />
      case 'cancelled': return <X size={16} />
      default: return <AlertCircle size={16} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-star-blue border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const upcomingAppointments = appointments.filter(apt =>
    apt.status !== 'cancelled' && apt.status !== 'completed' && new Date(apt.date) >= new Date()
  )

  const pastAppointments = appointments.filter(apt =>
    apt.status === 'completed' || new Date(apt.date) < new Date()
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-900">My Appointments</h1>
          <button
            onClick={() => router.push('/book')}
            className="btn-primary"
          >
            Book New Appointment
          </button>
        </div>

        {/* Upcoming Appointments */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming</h2>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-4">
              {upcomingAppointments.map((apt) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">{apt.service}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(apt.status)}`}>
                          {getStatusIcon(apt.status)}
                          {apt.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar size={18} />
                          <span>{new Date(apt.date).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={18} />
                          <span>{apt.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={18} />
                          <span>{apt.patient_phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={18} />
                          <span>{apt.patient_email}</span>
                        </div>
                      </div>

                      {apt.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Notes:</strong> {apt.notes}
                          </p>
                        </div>
                      )}
                    </div>

                    {apt.status !== 'cancelled' && (
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleCancel(apt.id)}
                          className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Calendar className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-gray-500 mb-4">No upcoming appointments</p>
              <button onClick={() => router.push('/book')} className="btn-primary">
                Book Your First Appointment
              </button>
            </div>
          )}
        </section>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Past Appointments</h2>
            <div className="space-y-3">
              {pastAppointments.map((apt) => (
                <div key={apt.id} className="bg-white rounded-lg shadow-sm p-4 opacity-75">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{apt.service}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(apt.date).toLocaleDateString('en-AU')} at {apt.time}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
```

---

## ⚙️ Part 5: Environment Configuration

Add to `.env.local`:

```bash
# ==========================================
# N8N WEBHOOKS
# ==========================================
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-booking
N8N_AVAILABILITY_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-availability
N8N_CANCEL_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-cancel
N8N_CONTACT_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-contact
N8N_NEWSLETTER_WEBHOOK_URL=https://sagma.app.n8n.cloud/webhook/starsmiles-newsletter

# ==========================================
# SUPABASE (Already configured)
# ==========================================
NEXT_PUBLIC_SUPABASE_URL=https://xqmsanjjltivaetzqxyj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# ==========================================
# GOOGLE CALENDAR (For n8n only - not needed in .env)
# ==========================================
# Configure Google Calendar OAuth in your n8n instance
```

---

## 🔄 Part 6: Two-Way Sync (Phone System ↔ Website)

Since appointments can come from both phone calls and website, ensure consistency:

### N8N Workflow 3: Sync Phone Bookings to Website

When a booking comes via phone (voice AI):

1. **Webhook Trigger** receives call data
2. **Supabase: Insert** appointment with `source: 'phone'`
3. **Google Calendar: Create** event
4. **Update** appointment with `gcal_event_id`
5. **Send** confirmation email/SMS

The patient portal will automatically show these appointments because they're in Supabase.

---

## ✅ Testing Checklist

### Setup Phase:
- [ ] Create Supabase tables (appointments, user_profiles, availability_slots)
- [ ] Enable RLS policies
- [ ] Create 3 n8n workflows (booking, availability, cancel)
- [ ] Configure Google Calendar OAuth in n8n
- [ ] Add environment variables to .env.local
- [ ] Restart dev server

### Website Booking Flow:
- [ ] Go to /book
- [ ] Select service and date
- [ ] See real-time availability from Google Calendar
- [ ] Complete booking form
- [ ] Verify appointment saved to Supabase
- [ ] Check Google Calendar event created
- [ ] Confirm email received (practice + patient)
- [ ] Verify SMS sent (if configured)

### Patient Portal Flow:
- [ ] Sign up at /portal/signup
- [ ] Log in at /portal/login
- [ ] View dashboard at /portal/dashboard
- [ ] Check appointments page shows bookings
- [ ] Test cancel appointment
- [ ] Verify Google Calendar event deleted
- [ ] Confirm cancellation email sent

### Phone Booking Integration:
- [ ] Make test call to voice AI
- [ ] Complete booking via phone
- [ ] Check appointment appears in Supabase
- [ ] Verify shows in patient portal (if user logs in)
- [ ] Confirm Google Calendar synced

---

## 🚀 Deployment

### Vercel Deployment:

1. Push code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Production Checklist:
- [ ] Update n8n webhook URLs to production
- [ ] Configure production Supabase instance
- [ ] Set up Google Calendar API production OAuth
- [ ] Enable Supabase RLS policies
- [ ] Test end-to-end booking flow
- [ ] Monitor n8n execution logs
- [ ] Set up error alerts (Sentry, LogRocket, etc.)

---

## 📊 Data Flow Diagram

```
┌─────────────────────┐
│   Website Booking   │
│   Form Submission   │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  POST /api/booking  │
│  1. Save to Supabase│
│  2. Call N8N webhook│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   N8N Workflow      │
│  1. Create GCal evt │
│  2. Update Supabase │
│  3. Send emails/SMS │
└─────────────────────┘

┌─────────────────────┐
│  Patient Portal     │
│  /portal/dashboard  │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ GET /api/portal/    │
│     appointments    │
│  Fetch from Supabase│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   Display in UI     │
│  - Upcoming appts   │
│  - Past appointments│
│  - Cancel button    │
└─────────────────────┘
```

---

## 💡 Pro Tips

1. **Test with staging calendar first** - Don't test on your live practice calendar
2. **Enable n8n execution logging** - Makes debugging easier
3. **Use Supabase Realtime** - Show live updates in patient portal
4. **Add reminder workflow** - Send SMS/email 24 hours before appointment
5. **Implement booking buffer** - Prevent back-to-back bookings (add 15 min buffer)
6. **Track no-shows** - Add `no_show` status to analyze patterns
7. **Generate analytics** - Dashboard showing booking sources, popular times, etc.

---

**Integration Guide Created**: November 24, 2025
**For**: Star Smiles Dental Centre
**Systems**: Supabase + Google Calendar + N8N + Next.js
