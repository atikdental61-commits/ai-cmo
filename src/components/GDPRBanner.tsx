import { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';

export default function GDPRBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr_consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('gdpr_consent', 'all');
    setVisible(false);
  };

  const acceptEssential = () => {
    localStorage.setItem('gdpr_consent', 'essential');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[300] bg-slate-900/95 backdrop-blur-xl border-t border-white/10 p-4 animate-in slide-in-from-bottom">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0">
            <Cookie className="h-5 w-5 text-violet-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">We use cookies 🍪</p>
            <p className="text-xs text-slate-400 mt-1">
              We use essential cookies for authentication and security. Analytics cookies help us improve your experience.
              <a href="/?page=privacy" className="text-violet-400 hover:text-violet-300 ml-1 underline">Learn more</a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={acceptEssential}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 transition-all"
          >
            Essential Only
          </button>
          <button
            onClick={acceptAll}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white hover:opacity-90 transition-all"
          >
            <Check className="h-3.5 w-3.5" />
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
