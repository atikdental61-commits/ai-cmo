import { Sparkles, ExternalLink, MessageCircle, Briefcase } from 'lucide-react';

interface FooterProps {
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onCookiesClick?: () => void;
}

export default function Footer({ onPrivacyClick, onTermsClick, onCookiesClick }: FooterProps) {
  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Alinin</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your AI marketing team. 6 agents working 24/7 to grow your traffic and users.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Briefcase className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Product',
              links: ['SEO Agent', 'GEO Agent', 'Reddit Agent', 'X Agent', 'HN Agent', 'Content Writer'],
            },
            {
              title: 'Company',
              links: ['About', 'Blog', 'Careers', 'Press', 'Contact'],
            },
            {
              title: 'Resources',
              links: ['Documentation', 'API', 'Pricing', 'Affiliates', 'Status'],
            },
          ].map((section, i) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 Alinin. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={onPrivacyClick} className="text-sm text-slate-500 hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={onTermsClick} className="text-sm text-slate-500 hover:text-white transition-colors">Terms of Service</button>
            <button onClick={onCookiesClick} className="text-sm text-slate-500 hover:text-white transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
