import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AgentDashboard from './components/AgentDashboard';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Features from './components/Features';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import PasswordResetModal from './components/PasswordResetModal';
import GDPRBanner from './components/GDPRBanner';
import ErrorBoundary from './components/ErrorBoundary';
import LegalPages from './components/LegalPages';
import EmailConfirmation from './components/EmailConfirmation';
import NotFoundPage from './components/NotFoundPage';
import { ToastProvider } from './components/Toast';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

type AppRoute = 'home' | 'dashboard' | 'legal' | 'email-confirm' | 'not-found';

function AppContent() {
  const { user, loading, isConfigured } = useAuth();
  const [route, setRoute] = useState<AppRoute>('home');
  const [legalPageType, setLegalPageType] = useState<'privacy' | 'terms' | 'cookies'>('privacy');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  // Centralized routing — determine initial route from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page');
    const type = params.get('type');
    const verifyToken = params.get('token');

    if (verifyToken && type === 'signup') {
      setRoute('email-confirm');
    } else if (page === 'privacy' || page === 'terms' || page === 'cookies') {
      setLegalPageType(page as 'privacy' | 'terms' | 'cookies');
      setRoute('legal');
    }
  }, []);

  const navigateTo = (newRoute: AppRoute) => {
    setRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = (url: string) => {
    setWebsiteUrl(url);
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (!user) {
        setAuthMode('signup');
        setShowAuthModal(true);
      } else {
        navigateTo('dashboard');
      }
    }, 2500);
  };

  const handleGetStarted = () => {
    if (!user) {
      setAuthMode('signup');
      setShowAuthModal(true);
    } else {
      navigateTo('dashboard');
    }
  };

  const openSignIn = () => { setAuthMode('signin'); setShowAuthModal(true); };
  const openSignUp = () => { setAuthMode('signup'); setShowAuthModal(true); };

  // Auto-redirect to dashboard when user signs in after URL entry
  useEffect(() => {
    if (user && websiteUrl && route === 'home' && !showAuthModal) {
      navigateTo('dashboard');
    }
  }, [user, websiteUrl, route, showAuthModal]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <svg className="h-6 w-6 text-white animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-sm text-slate-400 animate-pulse">Loading Alinin AI CMO...</p>
        </div>
      </div>
    );
  }

  // ===== ROUTE: Email Confirmation =====
  if (route === 'email-confirm') {
    return <EmailConfirmation />;
  }

  // ===== ROUTE: Dashboard =====
  if (route === 'dashboard' && user) {
    return <AgentDashboard url={websiteUrl} onBack={() => navigateTo('home')} />;
  }

  // ===== ROUTE: Legal Pages =====
  if (route === 'legal') {
    return (
      <div className="min-h-screen bg-slate-950">
        <LegalPages onBack={() => navigateTo('home')} initialPage={legalPageType} />
        <GDPRBanner />
      </div>
    );
  }

  // ===== ROUTE: 404 =====
  if (route === 'not-found') {
    return (
      <div className="min-h-screen bg-slate-950">
        <NotFoundPage onBack={() => navigateTo('home')} />
        <GDPRBanner />
      </div>
    );
  }

  // ===== ROUTE: Home / Landing =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <Navbar
        onSignIn={openSignIn}
        onSignUp={openSignUp}
        onOpenDashboard={() => user ? navigateTo('dashboard') : openSignUp()}
        showSetupBanner={!isConfigured}
      />
      <HeroSection
        onAnalyze={handleAnalyze}
        isAnalyzing={isAnalyzing}
        showSetupBanner={!isConfigured}
      />
      <Features />
      <Testimonials />
      <Pricing onGetStarted={handleGetStarted} />
      <Footer
        onPrivacyClick={() => { setLegalPageType('privacy'); navigateTo('legal'); }}
        onTermsClick={() => { setLegalPageType('terms'); navigateTo('legal'); }}
        onCookiesClick={() => { setLegalPageType('cookies'); navigateTo('legal'); }}
      />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
        onForgotPassword={() => { setShowAuthModal(false); setShowPasswordReset(true); }}
      />
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
        onBackToSignIn={() => { setShowPasswordReset(false); setShowAuthModal(true); }}
      />
      <GDPRBanner />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
