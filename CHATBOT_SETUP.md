# AI Chatbot Setup Guide

Your AI chatbot is now integrated with OpenAI GPT-4! Follow these steps to activate it.

## ✅ What's Already Done

- ✅ OpenAI API integration created (`/api/chat`)
- ✅ LiveChatWidget updated to use GPT-4
- ✅ Smart conversation context tracking
- ✅ Dynamic suggestion buttons
- ✅ OpenAI package installed

## 🔑 Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click **"Create new secret key"**
4. Copy your API key (starts with `sk-...`)

## 🔧 Step 2: Add API Key to Environment

Open `.env.local` and replace:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

With your actual key:

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
```

## 🚀 Step 3: Restart Your Server

Stop the dev server (Ctrl+C) and restart:

```bash
npm run dev
```

## 💬 Step 4: Test the Chatbot

1. Go to http://localhost:3004
2. Click the chat bubble in the bottom right
3. Try these test conversations:

### Test 1: Booking Inquiry
```
User: I need to book a checkup
Bot: [Will ask for details like name, phone, preferred date/time]
```

### Test 2: Emergency
```
User: I have a toothache, can you help?
Bot: [Will prioritize urgency and offer same-day appointments]
```

### Test 3: Pricing Question
```
User: How much does teeth whitening cost?
Bot: [Will provide pricing info and payment options]
```

### Test 4: New Patient
```
User: I'm a new patient, what should I bring?
Bot: [Will explain new patient process]
```

## 🎨 Chatbot Features

### Intelligent Responses
- Uses GPT-4o-mini (fast and cost-effective)
- Understands context from entire conversation
- Natural, friendly, professional tone
- Handles complex multi-turn conversations

### Dynamic Suggestions
- Contextual quick-reply buttons
- Changes based on conversation topic
- Helps guide patients to book appointments

### Information It Knows
- ✅ Opening hours, location, parking
- ✅ All services and pricing
- ✅ Insurance and payment plans
- ✅ Provider information
- ✅ Emergency care procedures
- ✅ New patient information

## 💰 Pricing (OpenAI API)

**GPT-4o-mini costs:**
- $0.15 per 1M input tokens
- $0.60 per 1M output tokens

**Example:** 1,000 patient conversations (~3-5 messages each) ≈ $1-2

Very affordable for a dental practice!

## 🔧 Customization

### To Change the AI's Personality

Edit `app/api/chat/route.ts` line 8, the `SYSTEM_PROMPT`:

```typescript
const SYSTEM_PROMPT = `You are the AI receptionist...`
```

You can make it more:
- Casual: "Hey! I'm here to help..."
- Formal: "Good day. I am the virtual assistant..."
- Friendly: "Hi friend! 👋 Let me help you..."

### To Adjust Response Length

Edit `app/api/chat/route.ts` line 82:

```typescript
max_tokens: 500, // Increase for longer responses, decrease for shorter
```

### To Use GPT-4 (More Intelligent, More Expensive)

Edit `app/api/chat/route.ts` line 80:

```typescript
model: 'gpt-4o', // Change from 'gpt-4o-mini'
```

## 🔗 Next Steps (Optional)

### Connect to Your n8n Workflow for Actual Bookings

Currently, the chatbot collects booking information but doesn't create actual appointments. To enable this:

1. The chatbot would need to send booking data to your n8n workflow
2. Add this code to `app/api/chat/route.ts`:

```typescript
// After collecting booking info, send to n8n
if (hasBookingDetails) {
  await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tool_name: 'book_dental_appointment',
      full_name: extractedName,
      phone: extractedPhone,
      email: extractedEmail,
      // ... other fields
    })
  })
}
```

Let me know if you want me to implement this auto-booking feature!

## 🆘 Troubleshooting

**"OpenAI API key not configured" error:**
- Make sure you added the API key to `.env.local`
- Restart the dev server

**Chatbot not responding:**
- Check browser console for errors
- Verify your OpenAI API key is valid
- Make sure you have credits in your OpenAI account

**Slow responses:**
- This is normal for first message (cold start)
- Consider upgrading to `gpt-4o` for faster responses

**Rate limit errors:**
- You've hit OpenAI's rate limit
- Upgrade your OpenAI account tier
- Or wait a few minutes

## 📊 Monitoring Usage

View your OpenAI usage at: https://platform.openai.com/usage

---

**Your chatbot is ready to help patients! 🎉**
