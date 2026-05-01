import { useState } from 'react';
import { HelpCircle, Search, Mail, MessageCircle, FileText, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';

const faqItems = [
  {
    q: 'How do I get started with Alinin AI CMO?',
    a: 'Enter your website URL on the homepage and click "Analyze". Our AI agents will scan your site and deploy a personalized marketing strategy within minutes.',
  },
  {
    q: 'What are the 6 AI agents?',
    a: 'SEO Agent (technical audits), GEO Agent (AI visibility tracking), Content Writer, Reddit Agent (organic mentions), Hacker News Agent, and X/Twitter Agent (social presence).',
  },
  {
    q: 'How does Global Lead Discovery work?',
    a: 'Enter keywords related to your product. We scan search data from 195+ countries to find companies, their intent level (researching/comparing/ready to buy), and key contacts.',
  },
  {
    q: 'Can I cancel my subscription?',
    a: 'Yes, anytime. Go to Settings > Billing > Cancel. Your access continues until the end of the billing period.',
  },
  {
    q: 'How do I reach out to leads?',
    a: 'Use the Lead Discovery dashboard. Click the email/LinkedIn/Twitter/Reddit icons to generate a personalized template. Customize and send directly.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never train AI models on your data.',
  },
  {
    q: 'How do I change my plan?',
    a: 'Go to Settings > Billing > Change Plan. You can upgrade or downgrade anytime. Changes apply to the next billing cycle.',
  },
  {
    q: 'What APIs do I need to configure?',
    a: 'For full functionality: Supabase (auth/DB), OpenAI API key (AI chat/analysis), Stripe (payments), Resend (emails). See SETUP.md.',
  },
];

const quickLinks = [
  { label: 'API Documentation', description: 'Full API reference', icon: FileText },
  { label: 'Contact Support', description: 'Get help from the team', icon: Mail },
  { label: 'Community Forum', description: 'Join discussions', icon: MessageCircle },
  { label: 'Feature Requests', description: 'Suggest new features', icon: Sparkles },
];

export default function HelpView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const filteredFaq = faqItems.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <HelpCircle className="h-7 w-7 text-violet-400" />
          Help & Support
        </h2>
        <p className="text-sm text-slate-400 mt-1">Find answers to common questions and get support</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search FAQ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, i) => (
          <button
            key={i}
            className="flex flex-col items-center gap-2 rounded-xl bg-white/[0.02] border border-white/[0.06] p-5 hover:bg-white/[0.05] hover:border-violet-500/30 transition-all"
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <link.icon className="h-5 w-5 text-white" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-white">{link.label}</p>
              <p className="text-xs text-slate-400">{link.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <div className="p-5 border-b border-white/[0.06]">
          <h3 className="text-lg font-semibold text-white">
            {searchTerm ? `Search results (${filteredFaq.length})` : 'Frequently Asked Questions'}
          </h3>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item, index) => (
              <div key={index} className="transition-colors">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-medium text-white pr-4">{item.q}</span>
                  <ChevronRight
                    className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform ${
                      expandedIndex === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedIndex === index && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400">No results found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Still need help? */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-6 text-center">
        <h3 className="text-lg font-semibold text-white mb-2">Still need help?</h3>
        <p className="text-sm text-slate-400 mb-4">Our team is available to assist you</p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:support@aicmo.com"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/10 border border-white/10 transition-all"
          >
            <ExternalLink className="h-4 w-4" />
            View Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
