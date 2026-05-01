import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en' | 'es';

interface Translations {
  [key: string]: {
    [lang in Language]: string;
  };
}

export const translations: Translations = {
  // Navbar
  features: { tr: 'Özellikler', en: 'Features', es: 'Características' },
  testimonials: { tr: 'Yorumlar', en: 'Testimonials', es: 'Testimonios' },
  pricing: { tr: 'Fiyatlandırma', en: 'Pricing', es: 'Precios' },
  login: { tr: 'Giriş Yap', en: 'Log in', es: 'Iniciar sesión' },
  getStarted: { tr: 'Hemen Başla', en: 'Get Started', es: 'Empezar' },
  // Hero
  worldFirst: { tr: "Alinin AI CMO — Dünyada ilk — 6 Ajan, 1 Dashboard", en: "Alinin AI CMO — World's First — 6 Agents, 1 Dashboard", es: 'Alinin AI CMO — El primero del mundo — 6 agentes, 1 panel' },
  heroHeading1: { tr: 'Web sitenizi girin.', en: 'Enter your website.', es: 'Ingrese su sitio web.' },
  heroHeading2: { tr: 'Bir pazarlama ekibi kazanın.', en: 'Get a marketing team.', es: 'Obtenga un equipo de marketing.' },
  heroSub: { tr: 'Yapay zeka ajanları SEO, içerik, Reddit, X, Hacker News ve yapay zeka görünürlüğünü yönetir — trafiğinizi ve kullanıcılarınızı artırmak için 24/7 çalışır.', en: 'AI agents handle SEO, content, Reddit, X, Hacker News, and AI visibility — working 24/7 to grow your traffic and users.', es: 'Los agentes de IA manejan SEO, contenido, Reddit, X, Hacker News y visibilidad de IA, trabajando 24/7 para aumentar su tráfico y usuarios.' },
  analyze: { tr: 'Analiz Et', en: 'Analyze', es: 'Analizar' },
  analyzing: { tr: 'Analiz ediliyor...', en: 'Analyzing...', es: 'Analizando...' },
  deployingAgents: { tr: "Pazarlama ajanları web siteniz için yayına alınıyor: ", en: "Deploying AI agents to analyze ", es: 'Desplegando agentes de IA para analizar ' },
  // Stats
  viewsGenerated: { tr: 'Görüntülenme', en: 'Views generated', es: 'Vistas generadas' },
  aiAgents: { tr: 'AI Ajanı', en: 'AI Agents', es: 'Agentes de IA' },
  monthlySavings: { tr: 'Aylık Tasarruf', en: 'vs $13,500/mo', es: 'vs $13,500/mes' },
  alwaysWorking: { tr: 'Her Zaman Aktif', en: 'Always working', es: 'Siempre activo' },
  // Features
  featuresHeading1: { tr: 'Sizin için çalışan 6 Ajan', en: '6 Agents Working For You', es: '6 agentes trabajando para usted' },
  featuresHeading2: { tr: 'Pazarlama ekibiniz,', en: 'Your complete marketing team,', es: 'Su equipo completo de marketing,' },
  fullyAutonomous: { tr: 'tamamen otonom', en: 'fully autonomous', es: 'totalmente autónomo' },
  traditionalCost: { tr: 'Geleneksel pazarlama ekibi maliyeti', en: 'Traditional marketing team cost', es: 'Costo del equipo de marketing tradicional' },
  withAiCmo: { tr: 'Alinin AI CMO ile', en: 'With Alinin AI CMO', es: 'Con Alinin AI CMO' },
  // Dashboard
  totalTasks: { tr: 'Günlük Toplam Görev', en: 'Total Tasks Today', es: 'Tareas totales hoy' },
  opportunitiesFound: { tr: 'Bulunan Fırsatlar', en: 'Opportunities Found', es: 'Oportunidades encontradas' },
  aiVisibilityScore: { tr: 'AI Görünürlük Skoru', en: 'AI Visibility Score', es: 'Puntuación de visibilidad IA' },
  trafficPotential: { tr: 'Trafik Potansiyeli', en: 'Traffic Potential', es: 'Potencial de tráfico' },
  activeAgents: { tr: 'Aktif Ajanlar', en: 'Active Agents', es: 'Agentes activos' },
  liveActivity: { tr: 'Canlı Aktivite', en: 'Live Activity', es: 'Actividad en vivo' },
  performanceMetrics: { tr: 'Performans Metrikleri', en: 'Performance Metrics', es: 'Métricas de rendimiento' },
  actionItems: { tr: 'Günün Görevleri', en: "Today's Action Items", es: 'Tareas de hoy' },
  back: { tr: 'Geri', en: 'Back', es: 'Volver' },
  refresh: { tr: 'Yenile', en: 'Refresh', es: 'Actualizar' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Detect browser language automatically
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (browserLang === 'tr') {
      setLanguage('tr');
    } else if (browserLang === 'es') {
      setLanguage('es');
    } else {
      setLanguage('en');
    }
  }, []);

  const t = (key: string): string => {
    const item = translations[key];
    if (!item) return key;
    return item[language] || item['en'];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
