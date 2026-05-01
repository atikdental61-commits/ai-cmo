import { useState } from 'react';
import { Target, TrendingUp, TrendingDown, Globe, BarChart3, ExternalLink, Plus, Search } from 'lucide-react';

interface Competitor {
  id: number;
  name: string;
  domain: string;
  traffic: string;
  seoScore: number;
  aiScore: number;
  keywords: number;
  backlinks: string;
  trend: 'up' | 'down';
  trendValue: number;
}

const competitors: Competitor[] = [
  { id: 1, name: 'MarketingAI', domain: 'marketingai.io', traffic: '124K', seoScore: 89, aiScore: 72, keywords: 12450, backlinks: '45K', trend: 'up', trendValue: 12.4 },
  { id: 2, name: 'GrowthBot', domain: 'growthbot.ai', traffic: '89K', seoScore: 81, aiScore: 65, keywords: 8900, backlinks: '32K', trend: 'up', trendValue: 8.2 },
  { id: 3, name: 'AstraCMO', domain: 'astracmo.com', traffic: '76K', seoScore: 78, aiScore: 58, keywords: 6500, backlinks: '28K', trend: 'down', trendValue: 3.1 },
  { id: 4, name: 'MarketForge', domain: 'marketforge.io', traffic: '54K', seoScore: 72, aiScore: 81, keywords: 4800, backlinks: '19K', trend: 'up', trendValue: 15.8 },
];

const keywordGaps = [
  { keyword: 'ai marketing agent', yourRank: 8, competitorRank: 1, volume: '12.5K' },
  { keyword: 'cmo automation', yourRank: 15, competitorRank: 3, volume: '8.2K' },
  { keyword: 'marketing ai suite', yourRank: 22, competitorRank: 2, volume: '5.8K' },
  { keyword: 'autonomous marketing', yourRank: 6, competitorRank: 4, volume: '4.1K' },
];

export default function CompetitorView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompetitors = competitors.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Target className="h-7 w-7 text-violet-400" />
            Competitor Analysis
          </h2>
          <p className="text-sm text-slate-400 mt-1">Track competitors and discover keyword opportunities</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white">
          <Plus className="h-4 w-4" />
          Add Competitor
        </button>
      </div>

      {/* Your Brand Card */}
      <div className="rounded-xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-violet-400">YOUR BRAND</p>
              <p className="text-xl font-bold text-white">YourProduct.com</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-xs text-slate-400">Traffic</p>
              <p className="text-lg font-bold text-white">42K</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">SEO Score</p>
              <p className="text-lg font-bold text-white">78</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">AI Score</p>
              <p className="text-lg font-bold text-white">73</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Keywords</p>
              <p className="text-lg font-bold text-white">3.2K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Competitor List */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Competitors ({filteredCompetitors.length})</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search competitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 w-64 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {filteredCompetitors.map((comp) => (
            <div
              key={comp.id}
              onClick={() => {}}
              className="flex items-center justify-between p-4 hover:bg-white/[0.03] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{comp.name}</p>
                  <p className="text-xs text-slate-400">{comp.domain}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 text-right">
                <div>
                  <p className="text-xs text-slate-400">Traffic</p>
                  <p className="text-sm font-semibold text-white">{comp.traffic}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">SEO</p>
                  <p className="text-sm font-semibold text-emerald-400">{comp.seoScore}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">AI Score</p>
                  <p className="text-sm font-semibold text-blue-400">{comp.aiScore}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Keywords</p>
                  <p className="text-sm font-semibold text-white">{comp.keywords.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  {comp.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <span className={`text-xs ${comp.trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {comp.trendValue}%
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keyword Gap Analysis */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Keyword Gap Analysis</h3>
            <p className="text-sm text-slate-400 mt-1">Keywords competitors rank for that you don't</p>
          </div>
          <button className="text-sm text-violet-400 hover:text-violet-300 flex items-center gap-1">
            View all gaps <ExternalLink className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-medium text-slate-400">Keyword</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-slate-400">Your Rank</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-slate-400">Best Competitor</th>
                <th className="text-center py-3 px-4 text-xs font-medium text-slate-400">Volume</th>
                <th className="text-right py-3 px-4 text-xs font-medium text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {keywordGaps.map((gap, i) => (
                <tr key={i} className="border-b border-white/[0.06]">
                  <td className="py-4 px-4">
                    <span className="font-medium text-white">{gap.keyword}</span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-red-500/10 text-red-400 text-sm font-medium">
                      #{gap.yourRank}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium">
                      #{gap.competitorRank}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-slate-300">{gap.volume}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-xs px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 hover:bg-violet-500/20 transition-colors">
                      Target Keyword
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
