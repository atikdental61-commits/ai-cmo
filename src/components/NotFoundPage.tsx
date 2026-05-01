import { Search, Home, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onBack?: () => void;
}

export default function NotFoundPage({ onBack }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Animated Graphic */}
        <div className="relative">
          <div className="text-[120px] sm:text-[160px] font-bold bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 bg-clip-text text-transparent leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-white/[0.02] border border-white/[0.06] flex items-center justify-center animate-pulse">
              <Search className="h-10 w-10 text-slate-500" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-white">Page not found</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10 transition-all w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </button>
          )}
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-all w-full sm:w-auto justify-center shadow-lg shadow-violet-500/25"
          >
            <Home className="h-4 w-4" />
            Return Home
          </button>
        </div>

        {/* Quick Links */}
        <div className="pt-6 border-t border-white/[0.06]">
          <p className="text-xs text-slate-500 mb-3">Popular pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: 'Features', href: '/#features' },
              { label: 'Pricing', href: '/#pricing' },
              { label: 'Testimonials', href: '/#testimonials' },
              { label: 'Dashboard', href: '/' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
