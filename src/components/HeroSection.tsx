import { useState } from 'react';
import { Globe, ArrowRight, Loader2, Zap, TrendingUp, Users, Search, MessageSquare, Newspaper } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

export default function HeroSection({ onAnalyze, isAnalyzing }: HeroSectionProps) {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-sm text-slate-300 ring-1 ring-white/10 backdrop-blur-sm mb-8">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>{t('worldFirst')}</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            {t('heroHeading1')}
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              {t('heroHeading2')}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t('heroSub')}
          </p>

          {/* URL Input */}
          <form onSubmit={handleSubmit} className="mt-10 max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="url"
                  placeholder="Enter your website URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full rounded-xl bg-white/5 border border-white/10 pl-12 pr-4 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 backdrop-blur-sm transition-all"
                  disabled={isAnalyzing}
                />
              </div>
              <button
                type="submit"
                disabled={isAnalyzing || !url.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {t('analyzing')}
                  </>
                ) : (
                  <>
                    {t('analyze')}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Analyzing State */}
          {isAnalyzing && (
            <div className="mt-8 max-w-md mx-auto">
              <div className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex -space-x-3">
                    {[Search, TrendingUp, MessageSquare, Users, Newspaper, Zap].map((Icon, i) => (
                      <div
                        key={i}
                        className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center ring-2 ring-slate-900 animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-slate-300">
                    {t('deployingAgents')} <span className="text-violet-400">{url}</span>...
                  </p>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full animate-progress" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '3.1M+', label: t('viewsGenerated') },
              { value: '6', label: t('aiAgents') },
              { value: '$99/mo', label: t('monthlySavings') },
              { value: '24/7', label: t('alwaysWorking') },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span>Trusted by</span>
            {['indie hackers', 'solo founders', 'micro SaaS', 'startups'].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
