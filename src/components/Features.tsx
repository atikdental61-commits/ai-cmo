import { 
  Search, 
  Globe, 
  PenTool, 
  MessageSquare, 
  Newspaper, 
  AtSign,
  ArrowRight 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const features = [
  {
    icon: Search,
    title: 'SEO Agent',
    description: 'Daily technical audits checking page speed, mobile optimization, links. Prioritized recommendations delivered every morning.',
    color: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/20',
    savings: '~$4,000/mo',
  },
  {
    icon: Globe,
    title: 'GEO Agent',
    description: 'Track your brand presence in ChatGPT, Claude & Perplexity answers. Optimize for AI-generated recommendations.',
    color: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/20',
    savings: 'New channel',
  },
  {
    icon: PenTool,
    title: 'Content Writer',
    description: 'SEO-optimized articles on relevant topics. Built with real keyword data and competitive landscape analysis.',
    color: 'from-violet-500 to-purple-500',
    shadow: 'shadow-violet-500/20',
    savings: '~$1,500/mo',
  },
  {
    icon: MessageSquare,
    title: 'Reddit Agent',
    description: 'Monitors niche subreddits 24/7. Finds organic mention opportunities. Generates culturally-appropriate replies.',
    color: 'from-orange-500 to-red-500',
    shadow: 'shadow-orange-500/20',
    savings: '~$1,000/mo',
  },
  {
    icon: Newspaper,
    title: 'Hacker News Agent',
    description: 'Suggests posts, tracks discussions, finds opportunities to mention your product to the technical audience.',
    color: 'from-yellow-500 to-orange-500',
    shadow: 'shadow-yellow-500/20',
    savings: '~$500/mo',
  },
  {
    icon: AtSign,
    title: 'X / Twitter Agent',
    description: 'Creates post ideas, replies, and threads. Analyzes current niche discussions. Maintains your brand presence.',
    color: 'from-slate-500 to-zinc-500',
    shadow: 'shadow-slate-500/20',
    savings: '~$1,500/mo',
  },
];

export default function Features() {
  const { t } = useLanguage();
  return (
    <section id="features" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-slate-300 ring-1 ring-white/10 backdrop-blur-sm mb-4">
            6 Agents Working For You
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Your complete marketing team,
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              fully autonomous
            </span>
          </h2>
          <p className="mt-4 text-slate-400 max-w-xl mx-auto">
            Each agent specializes in a specific channel. Together they cover your entire distribution strategy.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} ${feature.shadow} shadow-lg mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{feature.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Save {feature.savings}
                </span>
                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-violet-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] px-8 py-6">
            <div className="text-left">
              <p className="text-sm text-slate-400">{t('traditionalCost')}</p>
              <p className="text-2xl font-bold text-white">$13,500<span className="text-sm font-normal text-slate-400">/month</span></p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="text-left">
              <p className="text-sm text-slate-400">{t('withAiCmo')}</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                $99<span className="text-sm font-normal text-slate-400">/month</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
