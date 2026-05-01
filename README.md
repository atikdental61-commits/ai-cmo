# 🚀 AI CMO - Your Autonomous Marketing Suite

World's first AI-powered CMO that audits websites, tracks AI visibility, generates multi-channel outreach, schedules content, and identifies worldwide leads automatically.

## 🌟 Key Features

- **🌐 World's First AI CMO Suite**: Autonomously manages SEO, GEO (AI Search visibility), Content, Reddit, Hacker News, and X/Twitter channels.
- **🗺️ Global Lead Discovery**: Enter keywords to scan real-time demand, intent, and companies looking for your services worldwide.
- **📞 Direct & Voice Conversational Outreach**: Voice activation or typing commands like 'find leads' or 'email contact'. Auto-schedules outreach and follow-ups.
- **📆 Advanced Content Calendar**: View scheduled, draft, and published multi-channel campaigns.
- **📄 Professional Reports**: Create and export detailed insights.
- **🌍 Dynamic Multi-Language Context**: Fully automatic language detection (`tr`, `en`, `es`) with manual overrides.
- **💳 Fully Featured Stripe Payment**: Direct link to checkout sessions and stripe subscription tracking.

## 🛠️ Tech Stack & Integrations

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Context API
- **Backend / DB**: Supabase Client (Auth, PostgreSQL DB), Node.js Serverless Functions (Vercel)
- **AI Inference**: OpenAI API Proxy
- **E-Commerce / Payments**: Stripe API checkout links
- **Outreach & Communication**: Resend transactional Email API
- **Marketing & Analytics**: Google PageSpeed Insights API, SerpAPI, DataForSEO APIs

## 📦 Getting Started

### 1. Set Up Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### 2. Install and Run
```bash
npm install
npm run dev
```

### 3. Deploy in Production (Vercel)
```bash
npm i -g vercel
vercel
```

## 📄 License
This project is for personal use and for SaaS builders.
