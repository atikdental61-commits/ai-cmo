import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onSignIn?: () => void;
  onSignUp?: () => void;
  onOpenDashboard?: () => void;
  showSetupBanner?: boolean;
}

export default function Navbar({ onSignIn, onSignUp, onOpenDashboard, showSetupBanner }: NavbarProps) {
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      {showSetupBanner && (
        <div className="bg-amber-500/15 border-b border-amber-500/25 text-amber-100/95 text-[11px] sm:text-xs text-center leading-snug py-2 px-3">
          {t('demoModeBanner')}
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Alinin</span>
            <span className="hidden sm:inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-300 ring-1 ring-inset ring-violet-500/20 ml-2">
              AI CMO
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-slate-300 hover:text-white transition-colors">{t('features')}</a>
            <a href="#testimonials" className="text-sm text-slate-300 hover:text-white transition-colors">{t('testimonials')}</a>
            <a href="#pricing" className="text-sm text-slate-300 hover:text-white transition-colors">{t('pricing')}</a>
            
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
              {(['en', 'tr', 'es'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded text-xs font-semibold uppercase transition-all ${
                    language === lang
                      ? 'bg-violet-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenDashboard}
                  className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </button>
                <div className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 border border-white/10">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white">
                    {(user.fullName || user.email)[0].toUpperCase()}
                  </div>
                  <span className="text-xs text-slate-300 max-w-[100px] truncate">{user.fullName || user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={onSignIn}
                  className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  {t('login')}
                </button>
                <button
                  onClick={onSignUp}
                  className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-105"
                >
                  {t('getStarted')}
                </button>
              </>
            )}
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-4 py-4 space-y-3">
            <a href="#features" className="block text-sm text-slate-300 hover:text-white py-2">Features</a>
            <a href="#testimonials" className="block text-sm text-slate-300 hover:text-white py-2">Testimonials</a>
            <a href="#pricing" className="block text-sm text-slate-300 hover:text-white py-2">Pricing</a>
            <button className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
