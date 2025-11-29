# 🚀 Deployment Guide - Star Smiles Dental Website

## Pre-Deployment Checklist

### ✅ Code Quality
- [x] All TypeScript errors resolved
- [x] Build completes successfully (`npm run build`)
- [x] No console errors in production
- [x] All images optimized with Next.js Image
- [x] Lazy loading implemented for heavy components
- [x] Code split into optimized chunks

### ✅ Environment Setup
- [ ] Production `.env` file configured
- [ ] API keys secured
- [ ] Database connection strings updated
- [ ] n8n webhook URLs set
- [ ] OpenAI API key active

### ✅ Performance
- [x] Bundle size optimized
- [x] Images use modern formats (AVIF/WebP)
- [x] Caching headers configured
- [x] Code splitting enabled
- [ ] Lighthouse score > 90

### ✅ SEO & Metadata
- [x] Meta tags configured
- [x] OpenGraph images set
- [x] Schema.org structured data added
- [x] Sitemap generated (`/sitemap.xml`)
- [x] Robots.txt configured

---

## Environment Variables

### Required Variables

Create `.env.production` or configure in your hosting platform:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Keys
OPENAI_API_KEY=your_openai_api_key

# Webhooks
NEXT_PUBLIC_N8N_WEBHOOK_URL=your_n8n_webhook_url

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://starsmiles.com.au
```

### Optional Variables

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
VERCEL_ANALYTICS_ID=your_vercel_analytics_id

# Monitoring
SENTRY_DSN=your_sentry_dsn

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
```

---

## Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Automatic deployments from Git
- Built-in CDN and edge functions
- Zero configuration needed
- Automatic HTTPS
- Preview deployments for pull requests

**Steps:**

1. **Connect Repository**
   ```bash
   # Push to GitHub/GitLab
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository
   - Vercel auto-detects Next.js

3. **Configure Environment**
   - Add all environment variables in Vercel dashboard
   - Settings → Environment Variables
   - Add each variable from `.env.local`

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys automatically
   - Get production URL: `https://your-site.vercel.app`

5. **Add Custom Domain**
   - Settings → Domains
   - Add `starsmiles.com.au`
   - Configure DNS records as instructed

**Build Command**: `npm run build`
**Output Directory**: `.next`
**Install Command**: `npm install`

---

### Option 2: Netlify

**Steps:**

1. **Connect Repository**
   ```bash
   git push origin main
   ```

2. **Deploy Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Install Netlify Plugin**
   - Add `netlify-plugin-next` to `netlify.toml`
   ```toml
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

4. **Environment Variables**
   - Site settings → Environment variables
   - Add all variables

---

### Option 3: Self-Hosted (Docker)

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**Deploy:**
```bash
# Build image
docker build -t star-smiles .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=xxx \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx \
  -e OPENAI_API_KEY=xxx \
  star-smiles
```

---

## DNS Configuration

### For starsmiles.com.au

**A Record:**
```
Type: A
Name: @
Value: [Your hosting IP]
TTL: 3600
```

**CNAME Record (www):**
```
Type: CNAME
Name: www
Value: starsmiles.com.au
TTL: 3600
```

**For Vercel:**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

---

## Post-Deployment Tasks

### 1. Verify Deployment

Test all critical functionality:

- [ ] Homepage loads
- [ ] Booking system works
- [ ] Contact form submits
- [ ] Patient portal login/signup
- [ ] AI chatbot responds
- [ ] All service pages load
- [ ] Blog posts display
- [ ] Images load properly
- [ ] Mobile responsiveness

### 2. Performance Testing

**Run Lighthouse:**
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Test production site
lighthouse https://starsmiles.com.au --view
```

**Target Scores:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

### 3. Setup Monitoring

**Vercel Analytics** (if using Vercel):
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**Google Analytics:**
```tsx
// components/GoogleAnalytics.tsx
'use client'

import Script from 'next/script'

export default function GoogleAnalytics({ GA_ID }: { GA_ID: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  )
}
```

### 4. SEO Setup

**Google Search Console:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `starsmiles.com.au`
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: `https://starsmiles.com.au/sitemap.xml`

**Google Business Profile:**
- Update website URL to production domain
- Ensure NAP (Name, Address, Phone) matches exactly

---

## Continuous Deployment

### Automatic Deployments (Vercel/Netlify)

**On every push to `main`:**
```bash
git add .
git commit -m "Update feature"
git push origin main
# Automatic deployment triggered
```

**Preview Deployments:**
```bash
git checkout -b new-feature
git push origin new-feature
# Preview URL created automatically
```

### Manual Build & Deploy

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Deploy (depends on hosting)
vercel --prod
# or
netlify deploy --prod
```

---

## Database Migration

### Supabase Setup

1. **Verify Tables Exist:**
   - `patients`
   - `appointments`
   - `availability`
   - Row-level security enabled

2. **Check Policies:**
   ```sql
   -- Allow authenticated users to read their own data
   CREATE POLICY "Users can view own appointments"
   ON appointments
   FOR SELECT
   USING (auth.uid() = patient_id);
   ```

3. **Indexes:**
   ```sql
   CREATE INDEX idx_appointments_patient ON appointments(patient_id);
   CREATE INDEX idx_appointments_date ON appointments(date);
   CREATE INDEX idx_appointments_status ON appointments(status);
   ```

---

## Security Checklist

- [ ] API keys in environment variables (not in code)
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Content Security Policy configured
- [ ] CORS properly configured
- [ ] Rate limiting on API routes
- [ ] Input validation on all forms
- [ ] SQL injection protection (Supabase handles this)
- [ ] XSS protection (Next.js handles this)

---

## Backup Strategy

### Code Backup
```bash
# Automated via Git
git push origin main
git push backup main
```

### Database Backup (Supabase)
- Automatic daily backups (Supabase Pro)
- Manual backup: Project Settings → Database → Backup

### Media Files
- Store in Supabase Storage
- Configure automatic backups

---

## Rollback Procedure

### Vercel/Netlify
1. Go to Deployments
2. Find previous working deployment
3. Click "Promote to Production"

### Manual
```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push origin main --force
```

---

## Performance Optimization

### Enable Compression
```javascript
// next.config.mjs (already configured)
compress: true
```

### HTTP/2 Server Push
- Automatically enabled on Vercel
- Configure on other platforms via headers

### Edge Caching
```javascript
// For static pages
export const revalidate = 3600 // 1 hour

// For API routes
export const dynamic = 'force-static'
```

---

## Maintenance Mode

Create `app/maintenance/page.tsx`:

```tsx
export default function Maintenance() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-xl text-gray-600 mb-8">
          We're improving our website. Please check back soon!
        </p>
        <p className="text-gray-600">
          For urgent matters, call <a href="tel:+61395620675" className="text-star-blue">(03) 9562 0675</a>
        </p>
      </div>
    </div>
  )
}
```

Enable by redirecting in `middleware.ts` or `next.config.mjs`.

---

## Support & Troubleshooting

### Common Issues

**Build Fails:**
```bash
# Clear cache and rebuild
rm -rf .next node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

**Images Not Loading:**
- Check image paths are correct
- Verify images exist in `public/` folder
- Check Next.js Image domains configuration

**API Routes 500 Error:**
- Check environment variables are set
- Verify API keys are valid
- Check server logs for errors

**Slow Performance:**
- Run Lighthouse audit
- Check bundle sizes: `npm run build` → analyze output
- Verify CDN is working
- Check database query performance

---

## Quick Deploy Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Test production build
npm run start

# Deploy to Vercel
vercel --prod

# Deploy to Netlify
netlify deploy --prod
```

---

## Success Metrics

Monitor these after deployment:

- **Page Load Time**: < 2 seconds
- **Time to Interactive**: < 3 seconds
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **Uptime**: > 99.9%
- **Error Rate**: < 0.1%

---

## Conclusion

Your Star Smiles Dental website is now optimized and ready for production deployment!

**Next Steps:**
1. Choose hosting platform (Vercel recommended)
2. Configure environment variables
3. Deploy to production
4. Test all functionality
5. Monitor performance
6. Setup analytics

**Support:**
- Next.js Docs: https://nextjs.org/docs
- Vercel Support: https://vercel.com/support
- Supabase Docs: https://supabase.com/docs

Good luck with your launch! 🚀
