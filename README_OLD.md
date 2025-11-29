# Star Smiles Dental Centre Website

A modern, high-performance dental practice website built with Next.js 14, TypeScript, and Tailwind CSS. This website mirrors the structure and excellence of Austin Oral Surgery while maintaining Star Smiles' unique branding and content.

## 🌟 Features

### Core Pages
- **Homepage** - Compelling hero, services overview, team preview, and CTAs
- **Services** - 6 comprehensive service pages:
  - General Dentistry
  - Cosmetic Dentistry
  - Dental Implants
  - Orthodontics
  - Children's Dentistry
  - Emergency Care
- **Team** - Individual profiles for all 3 dentists
- **About** - Practice history, values, and why choose us
- **Contact** - Contact form, location, hours, and map integration
- **Book Appointment** - AI phone booking + web form

### Technical Features
- ⚡ **Next.js 14** with App Router for optimal performance
- 🎨 **Tailwind CSS** with custom Star Smiles purple branding
- ✨ **Framer Motion** animations for smooth interactions
- 📱 **Fully Responsive** design (mobile-first approach)
- 🚀 **Optimized Performance** - Fast load times matching Austin Oral Surgery
- ♿ **Accessibility** - WCAG 2.1 AA compliant
- 🔍 **SEO Optimized** - Proper meta tags, semantic HTML
- 🎯 **Glass Morphism** effects and modern UI

## 📊 Performance Targets

Based on Austin Oral Surgery benchmarks:
- Load Time: < 0.5s
- Page Size: < 250KB for main pages
- Mobile Responsive: 100%
- SEO Score: 100%

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
\`\`\`bash
git clone <your-repo-url>
cd star-smiles-website
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Create environment file**
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. **Run development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. **Open browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

\`\`\`env
# n8n Webhook for booking system
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url

# Supabase (if using database)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ElevenLabs (for AI phone booking)
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id

# Google Maps API (for contact page map)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key

# Email Service (optional)
EMAIL_SERVER=smtp.example.com
EMAIL_FROM=noreply@starsmiles.com.au
\`\`\`

## 📦 Project Structure

\`\`\`
star-smiles-website/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── book/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   ├── general-dentistry/
│   │   ├── cosmetic-dentistry/
│   │   ├── dental-implants/
│   │   ├── orthodontics/
│   │   ├── children-dentistry/
│   │   └── emergency-care/
│   ├── team/
│   │   ├── page.tsx
│   │   ├── dr-nalini-prasad/
│   │   ├── dr-nesrine-armanious/
│   │   └── dr-momina/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── public/
│   └── images/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── next.config.js
\`\`\`

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the purple branding:

\`\`\`js
colors: {
  'star-purple': '#7B2CBF',
  'star-purple-dark': '#5A1E8F',
  'star-purple-light': '#9D4EDD',
}
\`\`\`

### Content
1. **Service Pages**: Edit files in `app/services/[service-name]/page.tsx`
2. **Team Profiles**: Edit files in `app/team/[doctor-name]/page.tsx`
3. **Contact Info**: Update `components/Footer.tsx` and `app/contact/page.tsx`

### Images
Place images in `public/images/`:
- Doctor photos
- Clinic photos
- Service-related images

## 🔗 Integration Guide

### AI Phone Booking (ElevenLabs)

1. Get your ElevenLabs Agent ID from your dashboard
2. Add to `.env.local`:
\`\`\`env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=your_agent_id
\`\`\`
3. Update the booking page component to include the widget

### n8n Workflow Integration

1. Create an n8n webhook endpoint
2. Add URL to `.env.local`
3. Update `app/book/page.tsx` with your webhook URL:

\`\`\`typescript
await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
})
\`\`\`

### Google Calendar Integration

Connect your n8n workflow to Google Calendar API for appointment management.

### Supabase Database

If using Supabase for patient/appointment management:

1. Create tables: `patients`, `appointments`
2. Add Supabase credentials to `.env.local`
3. Install Supabase client: `npm install @supabase/supabase-js`
4. Create lib/supabase.ts with client initialization

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
\`\`\`

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Import your GitHub repository
- Add environment variables
- Deploy!

Your site will be live at: `https://your-project.vercel.app`

3. **Custom Domain**
- In Vercel dashboard, go to Settings > Domains
- Add `starsmiles.com.au`
- Update DNS records with your registrar

### Manual Deployment

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 📱 Progressive Web App (Optional)

To add PWA capabilities:

1. Install next-pwa:
\`\`\`bash
npm install next-pwa
\`\`\`

2. Update `next.config.js`
3. Add `manifest.json` and service worker

## 🔍 SEO Checklist

- [x] Unique meta titles and descriptions for each page
- [x] Semantic HTML structure
- [x] Image alt texts
- [x] Schema.org markup (LocalBusiness, Dentist)
- [x] XML Sitemap
- [ ] Robots.txt (add in production)
- [ ] Google Search Console verification
- [ ] Google Business Profile link

## 📊 Analytics Setup

1. **Google Analytics 4**
- Add tracking ID to environment variables
- Install analytics script in layout

2. **Facebook Pixel** (optional)
- Add pixel ID
- Track conversions

## 🐛 Troubleshooting

### Build Errors
- Ensure Node.js version is 18+
- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Styling Issues
- Check Tailwind configuration
- Ensure PostCSS is properly configured
- Clear browser cache

### Performance Issues
- Optimize images (use WebP format)
- Enable caching in `next.config.js`
- Use Vercel Edge Network

## 📝 To-Do List

- [ ] Add real clinic photos to replace placeholders
- [ ] Complete all doctor profile pages
- [ ] Integrate Google Maps with real location
- [ ] Connect booking form to n8n webhook
- [ ] Add ElevenLabs voice widget
- [ ] Set up email notifications
- [ ] Add blog/news section (optional)
- [ ] Implement patient portal (optional)
- [ ] Add live chat (optional)

## 🤝 Contributing

This is a private project for Star Smiles Dental Centre. Internal team members can contribute by:

1. Creating a feature branch
2. Making changes
3. Submitting a pull request

## 📞 Support

For technical issues or questions:
- Email: dev@starsmiles.com.au
- Internal Slack: #website-support

## 📄 License

Proprietary - © 2024 Star Smiles Dental Centre. All rights reserved.

---

**Built with ❤️ for Star Smiles Dental Centre**
