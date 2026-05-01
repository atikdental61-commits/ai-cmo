import { useState } from 'react';
import { ArrowRight, Check, Sparkles, Globe, Search, MessageSquare, BarChart3, Rocket, Activity } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
  onSkip: () => void;
}

const steps = [
  {
    title: 'Welcome to Alinin AI CMO! 🚀',
    description: 'Your AI-powered marketing team is ready. Let us show you how to get the most out of your 6 marketing agents.',
    icon: Rocket,
    color: 'from-violet-500 to-indigo-600',
  },
  {
    title: 'Enter Your Website',
    description: 'Start by entering your website URL. Our agents will automatically analyze your site for SEO, performance, and AI visibility opportunities.',
    icon: Globe,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'Discover Global Leads',
    description: 'Use the Global Search to find companies worldwide searching for keywords related to your product. See their intent and reach out!',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Track Live Activity',
    description: 'Monitor your AI agents in real-time. See what SEO improvements, Reddit opportunities, and content drafts they\'re working on.',
    icon: Activity,
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'Engage & Convert',
    description: 'Reach out to leads via email, LinkedIn, or Twitter — all from one dashboard. Our conversational assistant can help with commands like "find leads" or "email Michael".',
    icon: MessageSquare,
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: 'Track Performance',
    description: 'View detailed analytics, generate reports, and export data. Watch your traffic grow with AI-powered marketing automation.',
    icon: BarChart3,
    color: 'from-indigo-500 to-purple-500',
  },
];

export default function OnboardingFlow({ onComplete, onSkip }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i <= step ? 'bg-gradient-to-r from-violet-500 to-indigo-500' : 'bg-white/10'
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 animate-in fade-in zoom-in-95">
          <div className="text-center mb-8">
            <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${current.color} mb-6 shadow-xl`}>
              <current.icon className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{current.title}</h2>
            <p className="text-slate-400 leading-relaxed">{current.description}</p>
          </div>

          {/* Feature bullets */}
          <div className="space-y-3 mb-8">
            {step === 0 && (
              <>
                {['6 AI agents working 24/7', 'SEO, Content, Reddit, X, HN, GEO', 'Global lead discovery with AI', 'Conversational voice assistant'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <Sparkles className="h-4 w-4 text-violet-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </>
            )}
            {step === 4 && (
              <>
                {['Send emails through Resend', 'Connect on LinkedIn', 'DM via Twitter/X', 'Organic Reddit engagement'].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={onSkip}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Skip tour
            </button>
            <div className="flex items-center gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2.5 rounded-lg bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step === steps.length - 1) {
                    onComplete();
                  } else {
                    setStep(step + 1);
                  }
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white hover:opacity-90 transition-all"
              >
                {step === steps.length - 1 ? (
                  <>
                    Get Started
                    <Rocket className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Step indicator */}
        <p className="text-center text-xs text-slate-500 mt-4">
          Step {step + 1} of {steps.length}
        </p>
      </div>
    </div>
  );
}
