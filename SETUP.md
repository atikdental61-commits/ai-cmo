# 🚀 AI CMO - Production Setup Guide

This guide walks you through enabling all real backend integrations.

## Quick Start

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Edit .env.local and add your API keys

# 3. Install dependencies
npm install

# 4. Run development server
npm run dev

# 5. Build for production
npm run build
```

## Required Backend Functions

Most integrations need a backend (for security). Deploy these as **Vercel Functions**, **Cloudflare Workers**, or **Supabase Edge Functions**.

---

## 1. 🔐 Authentication & Database — Supabase

**Why:** Auth + PostgreSQL DB + Realtime + Storage in one platform.

### Setup
1. Go to [supabase.com](https://supabase.com) → New Project
2. Project Settings → API → Copy `URL` and `anon public key`
3. Add to `.env.local`:
   ```
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```

### Required Tables (run in SQL Editor)
```sql
-- Leads
create table leads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  email text,
  company text,
  status text default 'discovered',
  source text,
  relevance int,
  created_at timestamp default now()
);

-- Activities log
create table activities (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  agent text,
  action text,
  detail text,
  created_at timestamp default now()
);

-- Subscriptions
create table subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  plan text,
  stripe_customer_id text,
  status text,
  current_period_end timestamp
);

-- Enable Row Level Security
alter table leads enable row level security;
alter table activities enable row level security;
alter table subscriptions enable row level security;

-- RLS Policies
create policy "Users see own leads" on leads for all using (auth.uid() = user_id);
create policy "Users see own activities" on activities for all using (auth.uid() = user_id);
create policy "Users see own subscription" on subscriptions for all using (auth.uid() = user_id);
```

---

## 2. 🤖 AI / LLM — OpenAI or Claude

**Why:** Power chat, content generation, and analysis.

### Backend Function (`/api/ai.ts` for Vercel)
```ts
import OpenAI from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const { messages, model = 'gpt-4o-mini' } = req.body;
  
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: 1000,
    });
    res.json({ content: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
```

### Environment Variables
```
# Frontend (.env.local)
VITE_AI_API_ENDPOINT=https://yourapp.vercel.app/api/ai

# Backend (Vercel Project Settings → Environment Variables)
OPENAI_API_KEY=sk-xxx
```

**Get OpenAI key:** [platform.openai.com](https://platform.openai.com)

---

## 3. 💳 Payments — Stripe

**Why:** Subscriptions, one-time payments, customer portal.

### Setup
1. [stripe.com](https://stripe.com) → Dashboard
2. Create products: Pro ($20/mo), Max ($99/mo), Founder ($1000)
3. Copy Publishable Key and Price IDs

### Backend Function (`/api/checkout.ts`)
```ts
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req, res) {
  const { priceId, email } = req.body;
  
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.origin}/?success=true`,
    cancel_url: `${req.headers.origin}/?canceled=true`,
    customer_email: email,
  });
  
  res.json({ sessionId: session.id, url: session.url });
}
```

### Webhook (`/api/stripe-webhook.ts`)
```ts
// Listen for subscription events and update Supabase
// Configure webhook URL in Stripe Dashboard → Developers → Webhooks
```

### Environment Variables
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
VITE_STRIPE_PRICE_PRO=price_xxx
VITE_STRIPE_PRICE_MAX=price_xxx
VITE_STRIPE_PRICE_FOUNDER=price_xxx
VITE_STRIPE_CHECKOUT_ENDPOINT=https://yourapp.vercel.app/api/checkout

# Backend
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

## 4. 📧 Email — Resend

**Why:** Transactional emails, outreach campaigns.

### Backend Function (`/api/email.ts`)
```ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { to, subject, html, from } = req.body;
  
  const data = await resend.emails.send({
    from: from || 'AI CMO <hi@yourdomain.com>',
    to,
    subject,
    html,
  });
  
  res.json(data);
}
```

### Environment Variables
```
VITE_EMAIL_API_ENDPOINT=https://yourapp.vercel.app/api/email
RESEND_API_KEY=re_xxx
```

**Get Resend key:** [resend.com](https://resend.com) — 3,000 emails/month free

---

## 5. 🔍 SEO Data — Google PageSpeed + DataForSEO

### Google PageSpeed (Free)
1. [console.cloud.google.com](https://console.cloud.google.com) → Enable PageSpeed Insights API
2. Create credentials → API Key
3. Add: `VITE_GOOGLE_PAGESPEED_API_KEY=AIzaxxx`

**Note:** Works directly from browser! No backend needed.

### DataForSEO (Paid - keyword volume, backlinks)
1. [dataforseo.com](https://dataforseo.com) — From $0.30/1000 requests
2. Add: `VITE_DATAFORSEO_LOGIN=` and `VITE_DATAFORSEO_PASSWORD=`

### SerpAPI (Google search results)
1. [serpapi.com](https://serpapi.com) — 100 free searches/month
2. Add: `VITE_SERPAPI_KEY=xxx`

---

## 6. 📱 Social Media APIs

### Reddit (Free, public)
✅ No setup needed — works out of the box for public posts.

### Hacker News (Free, public)
✅ No setup needed — uses HN Algolia API.

### Twitter / X
1. [developer.twitter.com](https://developer.twitter.com) — Apply for API access
2. Add: `VITE_TWITTER_BEARER_TOKEN=xxx`
3. **Requires backend proxy** (Twitter blocks browser CORS)

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

Add environment variables in Vercel Dashboard → Project Settings → Environment Variables.

### Option 2: Netlify
```bash
npm run build
# Drag dist/ folder to app.netlify.com/drop
```

### Option 3: Cloudflare Pages
```bash
# Connect GitHub repo at pages.cloudflare.com
# Build command: npm run build
# Output directory: dist
```

---

## 📊 Cost Estimate (Monthly)

| Service | Free Tier | Paid Start |
|---------|-----------|------------|
| Supabase | 500MB DB, 50K auth users | $25/mo |
| OpenAI GPT-4o-mini | - | ~$5-50/mo |
| Stripe | 2.9% + 30¢ per transaction | - |
| Resend | 3,000 emails/mo | $20/mo |
| Google PageSpeed | Unlimited | Free |
| SerpAPI | 100 searches/mo | $50/mo |
| DataForSEO | - | ~$30/mo |
| Vercel | Hobby plan | $20/mo Pro |
| **TOTAL (MVP)** | **$0** | **~$50-150/mo** |

---

## ✅ Verification

After setup, visit `/dashboard → Integrations` to see real-time status of all services.

Each service shows:
- ✅ Configured
- ❌ Not configured (with required env vars)

---

## 🆘 Troubleshooting

**CORS errors?** → Move API call to backend function
**API key exposed?** → Move to backend, never use VITE_ prefix for secrets
**Rate limits?** → Add caching or upgrade plan
**Stripe webhook failing?** → Check webhook secret matches

For more help: [docs/](./docs/)
