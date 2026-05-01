import { useState } from 'react';
import { ArrowLeft, Shield, FileText, Cookie } from 'lucide-react';

type PageType = 'privacy' | 'terms' | 'cookies';

interface LegalPagesProps {
  onBack?: () => void;
  initialPage?: PageType;
}

const pages: Record<PageType, { title: string; icon: any; content: string }> = {
  privacy: {
    title: 'Privacy Policy',
    icon: Shield,
    content: `
## Privacy Policy
*Last updated: March 27, 2026*

### 1. Information We Collect
We collect information you provide directly to us, including:
- Account information (name, email, password)
- Website URLs you submit for analysis
- Payment information (processed securely by Stripe)
- Communication preferences

### 2. How We Use Your Information
- To provide and maintain our Alinin AI CMO service
- To analyze websites and generate marketing insights
- To send service-related communications
- To improve and personalize our service

### 3. Data Security
All data is encrypted in transit (TLS 1.3) and at rest (AES-256). Our AI models never train on your data.

### 4. Your Rights
Access, correct, or delete your data anytime. Contact privacy@aicmo.com.
    `,
  },
  terms: {
    title: 'Terms of Service',
    icon: FileText,
    content: `
## Terms of Service
*Last updated: March 27, 2026*

### 1. Service Description
Alinin AI CMO provides AI-powered marketing automation: SEO audits, content generation, Reddit/NN/X monitoring, lead discovery.

### 2. Subscription & Billing
Monthly/annual billing. Cancel anytime. Refunds per our policy.

### 3. Intellectual Property
You retain content ownership. We own the platform and AI technology.

### 4. Limitation of Liability
Alinin AI CMO is provided "as is." Not liable for damages from service use.
    `,
  },
  cookies: {
    title: 'Cookie Policy',
    icon: Cookie,
    content: `
## Cookie Policy
*Last updated: March 27, 2026*

### 1. How We Use Cookies
- Essential cookies (authentication, security)
- Analytics cookies (usage patterns)
- Preference cookies (settings)

### 2. Third-Party Cookies
- Stripe (payments), Supabase (auth), PostHog (analytics)

### 3. Your Choices
Control cookies via browser settings. Essential cookies required for service.
    `,
  },
};

export default function LegalPages({ onBack, initialPage = 'privacy' }: LegalPagesProps) {
  const [activePage, setActivePage] = useState<PageType>(initialPage);
  const page = pages[activePage];
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="mx-auto max-w-3xl px-4">
        {onBack && (
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
        )}

        <div className="flex gap-2 mb-8 border-b border-white/10 pb-4">
          {(Object.keys(pages) as PageType[]).map(key => {
            const p = pages[key]; const PI = p.icon;
            return (
              <button key={key} onClick={() => setActivePage(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === key ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30' : 'text-slate-400 hover:text-white'
                }`}>
                <PI className="h-4 w-4" />{p.title}
              </button>
            );
          })}
        </div>

        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">{page.title}</h1>
          </div>
          <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
            {page.content}
          </div>
        </div>
      </div>
    </div>
  );
}
