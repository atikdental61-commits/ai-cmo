import { CheckCircle2, XCircle, ExternalLink, Key, Database, Zap, CreditCard, Mail, Globe } from 'lucide-react';
import { isSupabaseConfigured } from '../lib/supabase';
import { isAIConfigured } from '../lib/ai';
import { isStripeConfigured } from '../lib/stripe';
import { isEmailConfigured } from '../lib/email';
import { apiStatus } from '../lib/dataApis';

const integrations = [
  {
    name: 'Authentication & Database',
    description: 'Supabase — User auth, database, real-time',
    icon: Database,
    color: 'from-emerald-500 to-teal-500',
    configured: isSupabaseConfigured,
    envVars: ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'],
    setupUrl: 'https://supabase.com',
  },
  {
    name: 'AI / LLM',
    description: 'OpenAI / Claude — Chat, content generation',
    icon: Zap,
    color: 'from-violet-500 to-purple-500',
    configured: isAIConfigured,
    envVars: ['VITE_AI_API_ENDPOINT', 'VITE_OPENAI_API_KEY'],
    setupUrl: 'https://platform.openai.com',
  },
  {
    name: 'Payments',
    description: 'Stripe — Subscriptions, one-time payments',
    icon: CreditCard,
    color: 'from-indigo-500 to-blue-500',
    configured: isStripeConfigured,
    envVars: ['VITE_STRIPE_PUBLISHABLE_KEY', 'VITE_STRIPE_CHECKOUT_ENDPOINT'],
    setupUrl: 'https://stripe.com',
  },
  {
    name: 'Email Service',
    description: 'Resend — Transactional emails, outreach',
    icon: Mail,
    color: 'from-pink-500 to-rose-500',
    configured: isEmailConfigured,
    envVars: ['VITE_EMAIL_API_ENDPOINT'],
    setupUrl: 'https://resend.com',
  },
  {
    name: 'Google PageSpeed',
    description: 'Real SEO & performance metrics',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    configured: apiStatus.pageSpeed,
    envVars: ['VITE_GOOGLE_PAGESPEED_API_KEY'],
    setupUrl: 'https://developers.google.com/speed',
  },
  {
    name: 'SerpAPI',
    description: 'Real Google search results',
    icon: Globe,
    color: 'from-amber-500 to-orange-500',
    configured: apiStatus.serpApi,
    envVars: ['VITE_SERPAPI_KEY'],
    setupUrl: 'https://serpapi.com',
  },
  {
    name: 'DataForSEO',
    description: 'Keyword volume, backlinks, SEO data',
    icon: Globe,
    color: 'from-emerald-500 to-green-500',
    configured: apiStatus.dataForSEO,
    envVars: ['VITE_DATAFORSEO_LOGIN', 'VITE_DATAFORSEO_PASSWORD'],
    setupUrl: 'https://dataforseo.com',
  },
  {
    name: 'Reddit API',
    description: 'Public — Always available',
    icon: Globe,
    color: 'from-orange-500 to-red-500',
    configured: apiStatus.reddit,
    envVars: [],
    setupUrl: 'https://www.reddit.com/dev/api',
  },
  {
    name: 'Hacker News API',
    description: 'Public — Always available',
    icon: Globe,
    color: 'from-yellow-500 to-orange-500',
    configured: apiStatus.hackerNews,
    envVars: [],
    setupUrl: 'https://github.com/HackerNews/API',
  },
  {
    name: 'Twitter / X API',
    description: 'Requires backend proxy',
    icon: Globe,
    color: 'from-slate-500 to-zinc-500',
    configured: apiStatus.twitter,
    envVars: ['VITE_TWITTER_BEARER_TOKEN'],
    setupUrl: 'https://developer.twitter.com',
  },
];

export default function IntegrationsStatus() {
  const configuredCount = integrations.filter((i) => i.configured).length;
  const totalCount = integrations.length;
  const percentage = Math.round((configuredCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Key className="h-7 w-7 text-violet-400" />
          Integrations & API Status
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Configure third-party services to enable real functionality
        </p>
      </div>

      {/* Progress */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm text-slate-400">Setup Progress</p>
            <p className="text-2xl font-bold text-white">
              {configuredCount} <span className="text-sm font-normal text-slate-400">of {totalCount} configured</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-violet-400">{percentage}%</p>
            <p className="text-xs text-slate-400">complete</p>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Quick Setup Note */}
      <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
        <p className="text-sm text-blue-200">
          💡 <strong>Quick Start:</strong> Copy <code className="px-1.5 py-0.5 rounded bg-white/10 text-blue-300">.env.example</code> to{' '}
          <code className="px-1.5 py-0.5 rounded bg-white/10 text-blue-300">.env.local</code> and add your API keys. See{' '}
          <code className="px-1.5 py-0.5 rounded bg-white/10 text-blue-300">SETUP.md</code> for full instructions.
        </p>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, i) => (
          <div
            key={i}
            className={`rounded-xl border p-5 transition-all ${
              integration.configured
                ? 'bg-emerald-500/[0.03] border-emerald-500/20'
                : 'bg-white/[0.02] border-white/[0.06]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${integration.color} flex items-center justify-center`}>
                  <integration.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{integration.name}</h3>
                  <p className="text-xs text-slate-400">{integration.description}</p>
                </div>
              </div>
              {integration.configured ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-slate-600 flex-shrink-0" />
              )}
            </div>

            {integration.envVars.length > 0 && (
              <div className="space-y-1.5 mb-3">
                <p className="text-xs text-slate-500">Required env vars:</p>
                {integration.envVars.map((env) => (
                  <code key={env} className="block text-xs px-2 py-1 rounded bg-black/30 text-slate-300 font-mono truncate">
                    {env}
                  </code>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  integration.configured
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-slate-500/10 text-slate-400'
                }`}
              >
                {integration.configured ? '✓ Configured' : 'Not configured'}
              </span>
              <a
                href={integration.setupUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 font-medium"
              >
                Setup Guide
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
