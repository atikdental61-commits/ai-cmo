import { useState } from 'react';
import {
  MessageSquare,
  Search,
  Globe,
  Newspaper,
  AtSign,
  SortAsc,
  Clock,
  Star,
  CheckCircle2,
  Circle,
} from 'lucide-react';

const filters = ['All', 'Reddit', 'SEO', 'GEO', 'Content', 'HN', 'X'];
const sortOptions = ['Relevance', 'Newest', 'Priority'];

const opportunities = [
  {
    id: 1,
    type: 'reddit',
    source: 'r/startups',
    title: 'Best marketing tools for indie devs in 2026',
    description: 'High-relevance thread with 340+ upvotes. Multiple users asking about marketing automation tools. Perfect opportunity to share your experience.',
    relevance: 94,
    priority: 'high',
    time: '2 hours ago',
    status: 'new',
    icon: MessageSquare,
    color: 'text-orange-400',
  },
  {
    id: 2,
    type: 'seo',
    source: 'Blog Post',
    title: 'Guest post opportunity on high-DA site',
    description: 'TechCrunch accepting guest posts about AI marketing. Domain Authority: 94. Estimated traffic boost: 2,500+ monthly visitors.',
    relevance: 88,
    priority: 'high',
    time: '3 hours ago',
    status: 'new',
    icon: Search,
    color: 'text-emerald-400',
  },
  {
    id: 3,
    type: 'geo',
    source: 'ChatGPT',
    title: 'Brand not mentioned in "Alinin AI CMO tools" query',
    description: 'ChatGPT recommends 5 competitors but not your brand. Suggested fix: Add structured data and update product descriptions.',
    relevance: 85,
    priority: 'high',
    time: '4 hours ago',
    status: 'new',
    icon: Globe,
    color: 'text-blue-400',
  },
  {
    id: 4,
    type: 'reddit',
    source: 'r/SaaS',
    title: 'How to get first 1000 users for my SaaS',
    description: 'Active discussion with 280+ comments. Users sharing marketing strategies. Relevant for organic mention.',
    relevance: 92,
    priority: 'medium',
    time: '5 hours ago',
    status: 'draft',
    icon: MessageSquare,
    color: 'text-orange-400',
  },
  {
    id: 5,
    type: 'hn',
    source: 'Hacker News',
    title: 'Show HN: AI-powered marketing automation',
    description: 'Related product launch on front page. Opportunity to engage in comments and share insights.',
    relevance: 78,
    priority: 'medium',
    time: '6 hours ago',
    status: 'new',
    icon: Newspaper,
    color: 'text-yellow-400',
  },
  {
    id: 6,
    type: 'content',
    source: 'Trending Topic',
    title: '"AI Marketing" search volume up 340%',
    description: 'Major keyword opportunity. Current top results have low content quality. Potential to rank in top 3 with comprehensive guide.',
    relevance: 91,
    priority: 'high',
    time: '8 hours ago',
    status: 'in_progress',
    icon: Search,
    color: 'text-emerald-400',
  },
  {
    id: 7,
    type: 'twitter',
    source: 'X/Twitter',
    title: 'Viral thread about marketing automation',
    description: '@techleader shared thread about marketing tools with 5K+ retweets. Good opportunity for reply with valuable insights.',
    relevance: 76,
    priority: 'low',
    time: '10 hours ago',
    status: 'new',
    icon: AtSign,
    color: 'text-slate-300',
  },
  {
    id: 8,
    type: 'reddit',
    source: 'r/entrepreneur',
    title: 'Marketing budget for bootstrapped startup',
    description: 'Users discussing affordable marketing solutions. Multiple mentions of "need automation tools". 180+ upvotes.',
    relevance: 87,
    priority: 'medium',
    time: '12 hours ago',
    status: 'draft',
    icon: MessageSquare,
    color: 'text-orange-400',
  },
];

export default function OpportunitiesView() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Relevance');

  const filteredOpportunities = activeFilter === 'All'
    ? opportunities
    : opportunities.filter((opp) => opp.type === activeFilter.toLowerCase());

  const sortedOpportunities = [...filteredOpportunities].sort((a, b) => {
    if (activeSort === 'Relevance') return b.relevance - a.relevance;
    return 0;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-500/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'low':
        return 'text-blue-400 bg-blue-500/10';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <Circle className="h-4 w-4 text-violet-400" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      default:
        return <Circle className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Opportunities</h2>
          <p className="text-sm text-slate-400 mt-1">
            AI-discovered opportunities across all channels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-sm font-medium">
            {opportunities.length} opportunities
          </span>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <SortAsc className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400">Sort by:</span>
          {sortOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveSort(option)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                activeSort === option
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-4">
        {sortedOpportunities.map((opp) => (
          <div
            key={opp.id}
            className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5 hover:bg-white/[0.04] transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center ${opp.color}`}>
                <opp.icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  {getStatusIcon(opp.status)}
                  <span className="text-xs text-slate-400">{opp.source}</span>
                  <span className="text-xs text-slate-600">•</span>
                  <span className="text-xs text-slate-500">{opp.time}</span>
                </div>
                <h3 className="text-base font-medium text-white mb-2 group-hover:text-violet-400 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-4">
                  {opp.description}
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getPriorityColor(opp.priority)}`}>
                    {opp.priority} priority
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5 text-yellow-400" />
                    <span className="text-xs text-slate-400">{opp.relevance}% relevance</span>
                  </div>
                  <span className="text-xs text-slate-500 capitalize">{opp.type}</span>
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2">
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-xs font-medium text-white hover:opacity-90 transition-opacity">
                  Take Action
                </button>
                <button className="px-4 py-2 rounded-lg bg-white/5 text-xs text-slate-400 hover:bg-white/10 transition-colors">
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
