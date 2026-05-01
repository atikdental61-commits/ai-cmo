import { useState } from 'react';
import {
  Search,
  Globe,
  TrendingUp,
  Users,
  Building2,
  MapPin,
  Sparkles,
  Loader2,
  ArrowUpRight,
  Mail,
  Plus,
  Filter,
  Download,
  BarChart3,
  Activity,
  Target,
  Zap,
} from 'lucide-react';

interface RegionData {
  country: string;
  flag: string;
  searches: number;
  growth: number;
  potential: 'high' | 'medium' | 'low';
  topCity: string;
  region: string;
}

interface CompanyLead {
  id: number;
  company: string;
  domain: string;
  industry: string;
  location: string;
  flag: string;
  size: string;
  searchVolume: number;
  potential: number;
  contactPerson: string;
  contactRole: string;
  email: string;
  intent: 'researching' | 'comparing' | 'ready_to_buy';
  lastActivity: string;
}

const regionMockData: Record<string, RegionData[]> = {
  default: [
    { country: 'United States', flag: '🇺🇸', searches: 12450, growth: 23.4, potential: 'high', topCity: 'San Francisco', region: 'North America' },
    { country: 'United Kingdom', flag: '🇬🇧', searches: 8920, growth: 18.7, potential: 'high', topCity: 'London', region: 'Europe' },
    { country: 'Germany', flag: '🇩🇪', searches: 6750, growth: 15.2, potential: 'high', topCity: 'Berlin', region: 'Europe' },
    { country: 'Canada', flag: '🇨🇦', searches: 5430, growth: 12.8, potential: 'medium', topCity: 'Toronto', region: 'North America' },
    { country: 'Australia', flag: '🇦🇺', searches: 4890, growth: 28.1, potential: 'high', topCity: 'Sydney', region: 'Oceania' },
    { country: 'India', flag: '🇮🇳', searches: 4520, growth: 45.6, potential: 'high', topCity: 'Bangalore', region: 'Asia' },
    { country: 'Singapore', flag: '🇸🇬', searches: 3870, growth: 32.4, potential: 'high', topCity: 'Singapore', region: 'Asia' },
    { country: 'Netherlands', flag: '🇳🇱', searches: 3210, growth: 19.5, potential: 'medium', topCity: 'Amsterdam', region: 'Europe' },
    { country: 'Brazil', flag: '🇧🇷', searches: 2980, growth: 22.1, potential: 'medium', topCity: 'São Paulo', region: 'South America' },
    { country: 'France', flag: '🇫🇷', searches: 2750, growth: 14.3, potential: 'medium', topCity: 'Paris', region: 'Europe' },
    { country: 'Japan', flag: '🇯🇵', searches: 2540, growth: 8.7, potential: 'medium', topCity: 'Tokyo', region: 'Asia' },
    { country: 'Spain', flag: '🇪🇸', searches: 2120, growth: 17.9, potential: 'medium', topCity: 'Madrid', region: 'Europe' },
    { country: 'Mexico', flag: '🇲🇽', searches: 1890, growth: 25.3, potential: 'medium', topCity: 'Mexico City', region: 'North America' },
    { country: 'UAE', flag: '🇦🇪', searches: 1670, growth: 38.2, potential: 'high', topCity: 'Dubai', region: 'Middle East' },
    { country: 'Türkiye', flag: '🇹🇷', searches: 1540, growth: 29.8, potential: 'high', topCity: 'İstanbul', region: 'Europe' },
  ],
};

const generateCompanies = (): CompanyLead[] => {
  return [
    { id: 1, company: 'TechVantage Inc', domain: 'techvantage.com', industry: 'SaaS', location: 'San Francisco, USA', flag: '🇺🇸', size: '50-200', searchVolume: 487, potential: 96, contactPerson: 'Jennifer Walsh', contactRole: 'CMO', email: 'j.walsh@techvantage.com', intent: 'ready_to_buy', lastActivity: '2 hours ago' },
    { id: 2, company: 'Nordic Cloud Systems', domain: 'nordiccloud.io', industry: 'Cloud Infra', location: 'Stockholm, Sweden', flag: '🇸🇪', size: '200-500', searchVolume: 412, potential: 92, contactPerson: 'Erik Lindqvist', contactRole: 'Head of Marketing', email: 'erik@nordiccloud.io', intent: 'comparing', lastActivity: '5 hours ago' },
    { id: 3, company: 'BrightFlow Analytics', domain: 'brightflow.ai', industry: 'AI/ML', location: 'London, UK', flag: '🇬🇧', size: '20-50', searchVolume: 389, potential: 89, contactPerson: 'Oliver Bennett', contactRole: 'Founder', email: 'oliver@brightflow.ai', intent: 'ready_to_buy', lastActivity: '1 hour ago' },
    { id: 4, company: 'Maple Digital Co', domain: 'mapledigital.ca', industry: 'Marketing', location: 'Toronto, Canada', flag: '🇨🇦', size: '10-50', searchVolume: 354, potential: 87, contactPerson: 'Sophie Chen', contactRole: 'Growth Lead', email: 'sophie@mapledigital.ca', intent: 'researching', lastActivity: '3 hours ago' },
    { id: 5, company: 'BangaloreTech Labs', domain: 'btlabs.in', industry: 'B2B SaaS', location: 'Bangalore, India', flag: '🇮🇳', size: '100-200', searchVolume: 328, potential: 84, contactPerson: 'Arjun Sharma', contactRole: 'VP Marketing', email: 'arjun@btlabs.in', intent: 'comparing', lastActivity: '6 hours ago' },
    { id: 6, company: 'Sydney Growth Co', domain: 'sydneygrowth.au', industry: 'Consulting', location: 'Sydney, Australia', flag: '🇦🇺', size: '5-20', searchVolume: 296, potential: 82, contactPerson: 'James O\'Connor', contactRole: 'CEO', email: 'james@sydneygrowth.au', intent: 'ready_to_buy', lastActivity: '8 hours ago' },
    { id: 7, company: 'Berlin Beta GmbH', domain: 'berlinbeta.de', industry: 'Fintech', location: 'Berlin, Germany', flag: '🇩🇪', size: '50-100', searchVolume: 274, potential: 79, contactPerson: 'Klaus Mueller', contactRole: 'Head of Growth', email: 'klaus@berlinbeta.de', intent: 'researching', lastActivity: '12 hours ago' },
    { id: 8, company: 'İstanbul Tech Hub', domain: 'istbtech.com.tr', industry: 'E-commerce', location: 'İstanbul, Türkiye', flag: '🇹🇷', size: '20-100', searchVolume: 248, potential: 78, contactPerson: 'Ayşe Yılmaz', contactRole: 'Pazarlama Direktörü', email: 'ayse@istbtech.com.tr', intent: 'comparing', lastActivity: '4 hours ago' },
    { id: 9, company: 'DubaiVenture FZCO', domain: 'dubaiventure.ae', industry: 'Investment', location: 'Dubai, UAE', flag: '🇦🇪', size: '10-50', searchVolume: 218, potential: 76, contactPerson: 'Ahmed Al-Rashid', contactRole: 'Marketing Director', email: 'ahmed@dubaiventure.ae', intent: 'ready_to_buy', lastActivity: '2 hours ago' },
    { id: 10, company: 'São Paulo Scale', domain: 'spscale.com.br', industry: 'SaaS', location: 'São Paulo, Brazil', flag: '🇧🇷', size: '50-200', searchVolume: 196, potential: 74, contactPerson: 'Carlos Silva', contactRole: 'CMO', email: 'carlos@spscale.com.br', intent: 'researching', lastActivity: '1 day ago' },
  ];
};

const continents = ['All', 'North America', 'Europe', 'Asia', 'South America', 'Oceania', 'Middle East', 'Africa'];

export default function GlobalSearchView() {
  const [keyword, setKeyword] = useState('');
  const [activeKeyword, setActiveKeyword] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedIntent, setSelectedIntent] = useState('all');
  const [companies, setCompanies] = useState<CompanyLead[]>([]);
  const [regions, setRegions] = useState<RegionData[]>([]);

  const handleSearch = () => {
    if (!keyword.trim()) return;
    setIsSearching(true);
    setHasSearched(false);
    setActiveKeyword(keyword);

    setTimeout(() => {
      setRegions(regionMockData.default);
      setCompanies(generateCompanies());
      setIsSearching(false);
      setHasSearched(true);
    }, 2000);
  };

  const filteredRegions = selectedRegion === 'All'
    ? regions
    : regions.filter((r) => r.region === selectedRegion);

  const filteredCompanies = selectedIntent === 'all'
    ? companies
    : companies.filter((c) => c.intent === selectedIntent);

  const totalSearches = regions.reduce((sum, r) => sum + r.searches, 0);
  const totalCountries = regions.length;
  const avgGrowth = regions.length > 0 ? Math.round(regions.reduce((sum, r) => sum + r.growth, 0) / regions.length) : 0;

  const getIntentBadge = (intent: string) => {
    switch (intent) {
      case 'ready_to_buy':
        return { label: '🔥 Ready to Buy', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'comparing':
        return { label: '⚖️ Comparing', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' };
      case 'researching':
        return { label: '🔍 Researching', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' };
      default:
        return { label: 'Unknown', color: 'bg-slate-500/10 text-slate-400' };
    }
  };

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high':
        return 'bg-emerald-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-slate-500';
      default:
        return 'bg-slate-500';
    }
  };

  const suggestedKeywords = [
    'AI marketing tool',
    'SaaS automation',
    'SEO optimization',
    'CRM software',
    'B2B lead generation',
    'analytics platform',
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Globe className="h-7 w-7 text-violet-400" />
          Global Lead Discovery by Keywords
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Find which regions, companies and people worldwide are searching for keywords related to your product
        </p>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-6 backdrop-blur-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Enter keywords (e.g., 'AI marketing tool', 'CRM software')..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                disabled={isSearching}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching || !keyword.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSearching ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Scanning Globe...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Discover Worldwide
                </>
              )}
            </button>
          </div>

          {/* Suggested Keywords */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400">Try:</span>
            {suggestedKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => {
                  setKeyword(kw);
                }}
                className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 transition-colors"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Searching State */}
      {isSearching && (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-12">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <Globe className="h-16 w-16 text-violet-400 animate-spin" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-white">Scanning the globe for "{keyword}"...</p>
              <p className="text-sm text-slate-400 mt-2">Analyzing search data from 195 countries and 50,000+ companies</p>
            </div>
            <div className="w-full max-w-md bg-white/5 rounded-full h-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full animate-progress" />
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && !isSearching && (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Search className="h-5 w-5 text-violet-400" />
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">+{avgGrowth}%</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalSearches.toLocaleString()}</p>
              <p className="text-sm text-slate-400 mt-1">Total Searches</p>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-blue-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{totalCountries}</p>
              <p className="text-sm text-slate-400 mt-1">Active Countries</p>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-emerald-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{companies.length}</p>
              <p className="text-sm text-slate-400 mt-1">Companies Found</p>
            </div>

            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-orange-400" />
                </div>
              </div>
              <p className="text-2xl font-bold text-white">{companies.filter(c => c.intent === 'ready_to_buy').length}</p>
              <p className="text-sm text-slate-400 mt-1">Ready to Buy</p>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-violet-400" />
            <span className="text-sm text-slate-400">Active keyword:</span>
            <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-semibold border border-violet-500/20">
              "{activeKeyword}"
            </span>
          </div>

          {/* Geographic Distribution + World Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Region Filter & Map Visualization */}
            <div className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-violet-400" />
                  Geographic Distribution
                </h3>
                <button className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  Export Map
                </button>
              </div>

              {/* Region Filter */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                {continents.map((continent) => (
                  <button
                    key={continent}
                    onClick={() => setSelectedRegion(continent)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedRegion === continent
                        ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                        : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {continent}
                  </button>
                ))}
              </div>

              {/* World Map Visualization (SVG-based heatmap) */}
              <div className="rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950/50 border border-white/[0.04] p-6 mb-5 relative overflow-hidden">
                <svg viewBox="0 0 800 400" className="w-full h-auto">
                  {/* Simplified continents as colored rectangles representing world map zones */}
                  {/* North America */}
                  <g>
                    <path
                      d="M 80 120 Q 100 80 180 100 L 250 130 L 240 200 L 150 220 L 80 180 Z"
                      fill="rgba(139, 92, 246, 0.4)"
                      stroke="rgba(139, 92, 246, 0.8)"
                      strokeWidth="1"
                    />
                    <text x="160" y="170" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">N. America</text>
                    <circle cx="160" cy="155" r="20" fill="rgba(16, 185, 129, 0.5)" className="animate-pulse" />
                  </g>

                  {/* South America */}
                  <g>
                    <path
                      d="M 220 250 Q 250 230 270 260 L 280 340 L 240 360 L 210 320 Z"
                      fill="rgba(99, 102, 241, 0.3)"
                      stroke="rgba(99, 102, 241, 0.7)"
                      strokeWidth="1"
                    />
                    <text x="245" y="305" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">S. America</text>
                    <circle cx="245" cy="290" r="12" fill="rgba(245, 158, 11, 0.5)" className="animate-pulse" />
                  </g>

                  {/* Europe */}
                  <g>
                    <path
                      d="M 380 100 Q 400 80 440 90 L 470 110 L 460 160 L 410 170 L 380 150 Z"
                      fill="rgba(139, 92, 246, 0.5)"
                      stroke="rgba(139, 92, 246, 0.9)"
                      strokeWidth="1"
                    />
                    <text x="425" y="135" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">Europe</text>
                    <circle cx="425" cy="120" r="22" fill="rgba(16, 185, 129, 0.6)" className="animate-pulse" />
                  </g>

                  {/* Africa */}
                  <g>
                    <path
                      d="M 400 180 Q 420 170 460 180 L 470 280 L 430 310 L 400 280 Z"
                      fill="rgba(99, 102, 241, 0.25)"
                      stroke="rgba(99, 102, 241, 0.6)"
                      strokeWidth="1"
                    />
                    <text x="430" y="240" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">Africa</text>
                  </g>

                  {/* Asia */}
                  <g>
                    <path
                      d="M 490 100 Q 530 80 620 100 L 680 130 L 670 200 L 580 220 L 490 180 Z"
                      fill="rgba(139, 92, 246, 0.45)"
                      stroke="rgba(139, 92, 246, 0.85)"
                      strokeWidth="1"
                    />
                    <text x="585" y="160" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle">Asia</text>
                    <circle cx="585" cy="145" r="18" fill="rgba(16, 185, 129, 0.5)" className="animate-pulse" />
                  </g>

                  {/* Oceania */}
                  <g>
                    <path
                      d="M 620 280 Q 660 270 700 290 L 690 330 L 640 340 L 620 320 Z"
                      fill="rgba(99, 102, 241, 0.35)"
                      stroke="rgba(99, 102, 241, 0.7)"
                      strokeWidth="1"
                    />
                    <text x="655" y="310" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle">Oceania</text>
                    <circle cx="655" cy="300" r="10" fill="rgba(245, 158, 11, 0.5)" className="animate-pulse" />
                  </g>

                  {/* Middle East */}
                  <g>
                    <path
                      d="M 470 170 L 510 165 L 520 200 L 480 210 Z"
                      fill="rgba(139, 92, 246, 0.4)"
                      stroke="rgba(139, 92, 246, 0.8)"
                      strokeWidth="1"
                    />
                    <text x="495" y="190" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">M.East</text>
                    <circle cx="495" cy="180" r="8" fill="rgba(16, 185, 129, 0.5)" className="animate-pulse" />
                  </g>
                </svg>
                <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    High activity
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                    Medium activity
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-500" />
                    Low activity
                  </div>
                </div>
              </div>

              {/* Region List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredRegions.map((region, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-2xl flex-shrink-0">{region.flag}</span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white truncate">{region.country}</p>
                          <div className={`h-2 w-2 rounded-full ${getPotentialColor(region.potential)}`} />
                        </div>
                        <p className="text-xs text-slate-400">{region.topCity} • {region.region}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">{region.searches.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">searches</p>
                      </div>
                      <div className="flex items-center gap-1 min-w-[60px] justify-end">
                        <TrendingUp className="h-3 w-3 text-emerald-400" />
                        <span className="text-xs font-medium text-emerald-400">+{region.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performance Regions */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-5">
                <BarChart3 className="h-5 w-5 text-violet-400" />
                Top Performing Regions
              </h3>
              <div className="space-y-4">
                {regions.slice(0, 8).map((region, i) => {
                  const percentage = (region.searches / regions[0].searches) * 100;
                  return (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{region.flag}</span>
                          <span className="text-sm text-slate-300">{region.country}</span>
                        </div>
                        <span className="text-xs font-semibold text-white">{region.searches.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Companies Searching for This Keyword */}
          <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
            <div className="p-5 border-b border-white/[0.06]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-violet-400" />
                    Companies Actively Searching
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">Real-time intent data from companies worldwide</p>
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-slate-400" />
                  {[
                    { id: 'all', label: 'All Intents' },
                    { id: 'ready_to_buy', label: '🔥 Ready' },
                    { id: 'comparing', label: '⚖️ Comparing' },
                    { id: 'researching', label: '🔍 Research' },
                  ].map((intent) => (
                    <button
                      key={intent.id}
                      onClick={() => setSelectedIntent(intent.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        selectedIntent === intent.id
                          ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                      }`}
                    >
                      {intent.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/[0.06]">
              {filteredCompanies.map((company) => {
                const intentBadge = getIntentBadge(company.intent);
                return (
                  <div
                    key={company.id}
                    className="p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-2xl flex-shrink-0">
                        {company.flag}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-semibold text-white">{company.company}</h4>
                          <span className="text-xs text-slate-400">• {company.domain}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${intentBadge.color}`}>
                            {intentBadge.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {company.location}
                          </span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-400">{company.industry}</span>
                          <span className="text-xs text-slate-500">•</span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {company.size} employees
                          </span>
                        </div>
                        <div className="mt-3 flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <Search className="h-3 w-3 text-violet-400" />
                            <span className="text-slate-300">{company.searchVolume} searches</span>
                          </div>
                          <span className="text-slate-500">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-slate-400">Contact:</span>
                            <span className="text-white font-medium">{company.contactPerson}</span>
                            <span className="text-slate-500">({company.contactRole})</span>
                          </div>
                          <span className="text-slate-500">•</span>
                          <span className="text-slate-500">{company.lastActivity}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      {/* Potential Score */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-slate-400">Potential</p>
                          <p className="text-xl font-bold text-violet-400">{company.potential}%</p>
                        </div>
                        <div className="relative h-12 w-12">
                          <svg className="transform -rotate-90 h-12 w-12">
                            <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.05)" strokeWidth="3" fill="none" />
                            <circle
                              cx="24"
                              cy="24"
                              r="20"
                              stroke="url(#gradient)"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={`${2 * Math.PI * 20}`}
                              strokeDashoffset={`${2 * Math.PI * 20 * (1 - company.potential / 100)}`}
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#8b5cf6" />
                                <stop offset="100%" stopColor="#6366f1" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <Zap className="absolute inset-0 m-auto h-4 w-4 text-violet-400" />
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => alert(`Sending outreach email to ${company.contactPerson} at ${company.email}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:bg-white/10 hover:text-white border border-white/10 transition-all"
                        >
                          <Mail className="h-3 w-3" />
                          Reach Out
                        </button>
                        <button
                          onClick={() => alert(`Added ${company.company} to your leads list`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
                        >
                          <Plus className="h-3 w-3" />
                          Add Lead
                        </button>
                        <button
                          onClick={() => alert(`Viewing ${company.company} full profile`)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                          title="View full profile"
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Showing {filteredCompanies.length} of {companies.length} companies
              </span>
              <button
                onClick={() => alert('Exporting all companies and regions data as CSV/PDF...')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-xs font-medium text-slate-300 hover:bg-white/10 transition-colors border border-white/10"
              >
                <Download className="h-3.5 w-3.5" />
                Export Full Report
              </button>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!hasSearched && !isSearching && (
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-12 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 mb-4">
            <Globe className="h-8 w-8 text-violet-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Discover Worldwide Demand</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Enter a keyword above to discover which countries, regions, and companies around the world are actively searching for your product or service.
          </p>
        </div>
      )}
    </div>
  );
}
