import { Check, Zap, Crown, Building2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { checkout, isStripeConfigured } from '../lib/stripe';
import { useAuth } from '../context/AuthContext';

interface PricingProps {
  onGetStarted: () => void;
}

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '',
    description: 'Try it out with 5 credits',
    icon: Zap,
    features: [
      '5 credits (~50 messages)',
      'All Pro features (limited)',
      'Message history',
      'Basic AI assistance',
    ],
    cta: 'Start Free',
    popular: false,
    gradient: 'from-slate-500 to-slate-600',
  },
  {
    name: 'Pro',
    price: '$20',
    period: '/mo',
    description: 'For regular users',
    icon: Zap,
    features: [
      '500 credits (~5,000 messages)',
      '20+ open-source AI models',
      'Real-time insights',
      'Projects (shared context)',
      'Web, Reddit, X, YouTube search',
    ],
    cta: 'Get Pro',
    popular: false,
    gradient: 'from-violet-500 to-indigo-600',
  },
  {
    name: 'Max',
    price: '$99',
    period: '/mo',
    description: 'Full Alinin AI CMO suite',
    icon: Crown,
    features: [
      '2,000 credits (~20,000 messages)',
      'SEO Agent',
      'GEO & AI Targeting Agent',
      'Reddit Distribution Agent',
      'X / Twitter Agent',
      'Hacker News Agent',
      'Content Writer Agent',
      'Unlimited Projects',
    ],
    cta: 'Get Alinin AI CMO',
    popular: true,
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    name: 'Founding User',
    price: '$1,000',
    period: ' one-time',
    description: 'Lifetime access',
    icon: Building2,
    features: [
      '2,000 credits/month forever',
      'All Max features',
      'Lifetime platform access',
      'Founding Discord membership',
      'Priority support',
      'Early access to features',
      'Only 100 spots available',
    ],
    cta: 'Become a Founder',
    popular: false,
    gradient: 'from-amber-500 to-orange-500',
  },
];

export default function Pricing({ onGetStarted }: PricingProps) {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string>('');

  const handlePlanClick = async (planName: string) => {
    setStripeError('');
    if (planName === 'Free') {
      onGetStarted();
      return;
    }

    if (!user) {
      onGetStarted();
      return;
    }

    if (!isStripeConfigured) {
      setStripeError('Stripe is not configured yet. Add VITE_STRIPE_PUBLISHABLE_KEY to enable real checkout.');
      setTimeout(() => onGetStarted(), 1500);
      return;
    }

    const planKey = planName.toLowerCase().includes('found')
      ? 'founder'
      : planName.toLowerCase() === 'pro'
      ? 'pro'
      : planName.toLowerCase() === 'max'
      ? 'max'
      : 'pro';

    setLoadingPlan(planName);
    const result = await checkout(planKey as 'pro' | 'max' | 'founder', user.email);
    setLoadingPlan(null);

    if (result.error) {
      setStripeError(result.error);
    }
  };

  return (
    <section id="pricing" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-slate-300 ring-1 ring-white/10 backdrop-blur-sm mb-4">
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Start free, upgrade when ready
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            No hidden fees, no surprises. Cancel anytime.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-violet-500/10 to-transparent border-violet-500/30 scale-105 shadow-2xl shadow-violet-500/10'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-500/25">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${plan.gradient} mb-4`}>
                  <plan.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <p className="text-sm text-slate-400 mt-1">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-slate-400">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePlanClick(plan.name)}
                disabled={loadingPlan === plan.name}
                className={`w-full flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all disabled:opacity-50 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {loadingPlan === plan.name && <Loader2 className="h-4 w-4 animate-spin" />}
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Annual Discount */}
        <div className="mt-12 text-center space-y-3">
          {stripeError && (
            <div className="inline-block px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-300">
              ⚠️ {stripeError}
            </div>
          )}
          <p className="text-sm text-slate-400">
            💡 Annual billing available — save up to 20%
          </p>
        </div>
      </div>
    </section>
  );
}
