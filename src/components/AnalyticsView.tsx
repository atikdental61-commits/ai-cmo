import { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Globe,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react';

const timeRanges = ['7 days', '30 days', '90 days', '12 months'];

const overviewStats = [
  {
    label: 'Total Impressions',
    value: '124,563',
    change: '+12.5%',
    trend: 'up',
    icon: Eye,
    color: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Website Visitors',
    value: '45,231',
    change: '+8.2%',
    trend: 'up',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    label: 'AI Mentions',
    value: '1,892',
    change: '+23.1%',
    trend: 'up',
    icon: Globe,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'SEO Score',
    value: '78/100',
    change: '+5',
    trend: 'up',
    icon: Search,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
];

const channelPerformance = [
  { channel: 'Organic Search', visitors: 18450, change: 12.3, color: 'bg-emerald-500' },
  { channel: 'AI Referrals', visitors: 8920, change: 45.2, color: 'bg-blue-500' },
  { channel: 'Reddit', visitors: 6340, change: 28.7, color: 'bg-orange-500' },
  { channel: 'Twitter/X', visitors: 5120, change: 15.8, color: 'bg-slate-400' },
  { channel: 'Hacker News', visitors: 3890, change: -5.2, color: 'bg-yellow-500' },
  { channel: 'Direct', visitors: 2510, change: 3.1, color: 'bg-violet-500' },
];

const weeklyData = [
  { day: 'Mon', visitors: 5200, impressions: 12400 },
  { day: 'Tue', visitors: 6100, impressions: 14200 },
  { day: 'Wed', visitors: 5800, impressions: 13800 },
  { day: 'Thu', visitors: 7200, impressions: 16500 },
  { day: 'Fri', visitors: 6800, impressions: 15900 },
  { day: 'Sat', visitors: 4500, impressions: 10200 },
  { day: 'Sun', visitors: 4200, impressions: 9800 },
];

const topPages = [
  { page: '/', views: 12450, change: 8.2 },
  { page: '/blog/growth-hacks', views: 8920, change: 45.2 },
  { page: '/pricing', views: 6340, change: 12.1 },
  { page: '/blog/ai-marketing', views: 5120, change: 28.7 },
  { page: '/features', views: 3890, change: -2.1 },
];

const aiVisibility = [
  { platform: 'ChatGPT', mentions: 45, queries: 120, score: 37.5 },
  { platform: 'Claude', mentions: 32, queries: 85, score: 37.6 },
  { platform: 'Perplexity', mentions: 58, queries: 150, score: 38.7 },
  { platform: 'Gemini', mentions: 28, queries: 95, score: 29.5 },
];

export default function AnalyticsView() {
  const [activeRange, setActiveRange] = useState('30 days');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics</h2>
          <p className="text-sm text-slate-400 mt-1">Track your marketing performance across all channels</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setActiveRange(range)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeRange === range
                    ? 'bg-violet-500/20 text-violet-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewStats.map((stat, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className={`h-10 w-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-1 px-2 py-1 rounded-full ${
                stat.trend === 'up'
                  ? 'text-emerald-400 bg-emerald-500/10'
                  : 'text-red-400 bg-red-500/10'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Chart */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Weekly Overview</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-violet-500" />
                <span className="text-xs text-slate-400">Visitors</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-indigo-500" />
                <span className="text-xs text-slate-400">Impressions</span>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-between h-48 gap-2">
            {weeklyData.map((day, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-t from-violet-600 to-violet-400 transition-all hover:opacity-80"
                    style={{ height: `${(day.visitors / 8000) * 100}%` }}
                  />
                  <div
                    className="w-full rounded-t-sm bg-gradient-to-t from-indigo-600 to-indigo-400 transition-all hover:opacity-80"
                    style={{ height: `${(day.impressions / 20000) * 80}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Performance */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
          <h3 className="text-lg font-semibold text-white mb-6">Channel Performance</h3>
          <div className="space-y-4">
            {channelPerformance.map((channel, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${channel.color}`} />
                    <span className="text-sm text-slate-300">{channel.channel}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-white">{channel.visitors.toLocaleString()}</span>
                    <span className={`text-xs flex items-center gap-1 ${
                      channel.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {channel.change >= 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {Math.abs(channel.change)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${channel.color} transition-all`}
                    style={{ width: `${(channel.visitors / 20000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
          <h3 className="text-lg font-semibold text-white mb-6">Top Pages</h3>
          <div className="space-y-3">
            {topPages.map((page, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 w-6">{i + 1}</span>
                  <span className="text-sm text-slate-300 font-mono">{page.page}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-white">{page.views.toLocaleString()}</span>
                  <span className={`text-xs flex items-center gap-1 ${
                    page.change >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {page.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {Math.abs(page.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Visibility */}
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
          <h3 className="text-lg font-semibold text-white mb-6">AI Visibility</h3>
          <div className="space-y-4">
            {aiVisibility.map((platform, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white">{platform.platform}</span>
                  <span className="text-lg font-bold text-violet-400">{platform.score.toFixed(1)}%</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Mentions</p>
                    <p className="text-sm font-semibold text-white">{platform.mentions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Queries Tested</p>
                    <p className="text-sm font-semibold text-white">{platform.queries}</p>
                  </div>
                </div>
                <div className="mt-3 w-full bg-white/5 rounded-full h-1.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
                    style={{ width: `${platform.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
