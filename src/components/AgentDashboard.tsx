import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Globe,
  PenTool,
  MessageSquare,
  Newspaper,
  AtSign,
  TrendingUp,
  Activity,
  ChevronRight,
  Sparkles,
  BarChart3,
  Eye,
  Target,
  Zap,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  MessageCircle,
  Settings,
} from 'lucide-react';
import Sidebar from './Sidebar';
import ChatPanel from './ChatPanel';
import AnalyticsView from './AnalyticsView';
import OpportunitiesView from './OpportunitiesView';
import SettingsView from './SettingsView';
import ContentCalendarView from './ContentCalendarView';
import CompetitorView from './CompetitorView';
import ReportsView from './ReportsView';
import AgentSettingsModal from './AgentSettingsModal';
import LeadsView from './LeadsView';
import GlobalSearchView from './GlobalSearchView';
import IntegrationsStatus from './IntegrationsStatus';
import NotificationsView from './NotificationsView';
import HelpView from './HelpView';
import OnboardingFlow from './OnboardingFlow';

interface AgentDashboardProps {
  url: string;
  onBack: () => void;
}

const agents = [
  {
    id: 'seo',
    name: 'SEO Agent',
    icon: Search,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    textColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    status: 'active',
    tasksToday: 12,
    score: 78,
  },
  {
    id: 'geo',
    name: 'GEO Agent',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    status: 'active',
    tasksToday: 8,
    score: 65,
  },
  {
    id: 'content',
    name: 'Content Writer',
    icon: PenTool,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-500/10',
    textColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    status: 'active',
    tasksToday: 5,
    score: 82,
  },
  {
    id: 'reddit',
    name: 'Reddit Agent',
    icon: MessageSquare,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    status: 'active',
    tasksToday: 15,
    score: 91,
  },
  {
    id: 'hn',
    name: 'Hacker News',
    icon: Newspaper,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/20',
    status: 'active',
    tasksToday: 6,
    score: 73,
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: AtSign,
    color: 'from-slate-400 to-zinc-400',
    bgColor: 'bg-slate-400/10',
    textColor: 'text-slate-300',
    borderColor: 'border-slate-400/20',
    status: 'active',
    tasksToday: 10,
    score: 85,
  },
];

const activityFeed = [
  {
    agent: 'SEO Agent',
    icon: Search,
    color: 'text-emerald-400',
    action: 'Completed daily audit',
    detail: 'Found 3 critical issues, 5 warnings. Mobile score improved to 94.',
    time: '2 min ago',
    type: 'success',
  },
  {
    agent: 'Reddit Agent',
    icon: MessageSquare,
    color: 'text-orange-400',
    action: 'New opportunity found',
    detail: 'r/startups thread "Best marketing tools for indie devs" — high relevance match.',
    time: '5 min ago',
    type: 'opportunity',
  },
  {
    agent: 'GEO Agent',
    icon: Globe,
    color: 'text-blue-400',
    action: 'AI visibility update',
    detail: 'Your brand mentioned in 3/10 ChatGPT queries. Up from 1/10 last week.',
    time: '12 min ago',
    type: 'info',
  },
  {
    agent: 'Content Writer',
    icon: PenTool,
    color: 'text-violet-400',
    action: 'Article draft ready',
    detail: '"10 Growth Hacks for SaaS Startups in 2026" — 2,400 words, SEO score: 89.',
    time: '18 min ago',
    type: 'success',
  },
  {
    agent: 'X / Twitter',
    icon: AtSign,
    color: 'text-slate-300',
    action: 'Thread scheduled',
    detail: '5-tweet thread about product launch scheduled for 2:00 PM EST.',
    time: '25 min ago',
    type: 'info',
  },
  {
    agent: 'Hacker News',
    icon: Newspaper,
    color: 'text-yellow-400',
    action: 'Discussion tracked',
    detail: 'Front page thread about AI marketing tools. 87% relevance. Reply drafted.',
    time: '32 min ago',
    type: 'opportunity',
  },
  {
    agent: 'SEO Agent',
    icon: Search,
    color: 'text-emerald-400',
    action: 'Backlink opportunity',
    detail: 'Found 4 high-DA sites in your niche accepting guest posts.',
    time: '45 min ago',
    type: 'opportunity',
  },
  {
    agent: 'Reddit Agent',
    icon: MessageSquare,
    color: 'text-orange-400',
    action: 'Reply posted',
    detail: 'Replied to r/SaaS discussion about marketing automation. 23 upvotes.',
    time: '1 hour ago',
    type: 'success',
  },
];

const seoMetrics = [
  { label: 'Page Speed', value: 94, change: '+12', trend: 'up' },
  { label: 'Mobile Score', value: 91, change: '+8', trend: 'up' },
  { label: 'SEO Score', value: 78, change: '+5', trend: 'up' },
  { label: 'Accessibility', value: 88, change: '+3', trend: 'up' },
];

const geoMetrics = [
  { query: 'best marketing tool for startups', mentioned: true, position: 3 },
  { query: 'AI marketing agent', mentioned: true, position: 5 },
  { query: 'automated SEO tool', mentioned: false, position: null },
  { query: 'reddit marketing automation', mentioned: true, position: 2 },
];

export default function AgentDashboard({ url, onBack }: AgentDashboardProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [liveActivities, setLiveActivities] = useState(activityFeed);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const newActivity = {
        agent: randomAgent.name,
        icon: randomAgent.icon,
        color: randomAgent.textColor,
        action: ['Task completed', 'New opportunity', 'Score updated', 'Analysis complete'][
          Math.floor(Math.random() * 4)
        ],
        detail: 'Automated task completed successfully.',
        time: 'Just now',
        type: ['success', 'opportunity', 'info'][Math.floor(Math.random() * 3)] as string,
      };
      setLiveActivities((prev) => [newActivity, ...prev.slice(0, 9)]);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const [showAgentModal, setShowAgentModal] = useState(false);
  const [selectedAgentForModal, setSelectedAgentForModal] = useState<any>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('onboarding_completed');
  });

  const completeOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  const openAgentSettings = (agent: any) => {
    setSelectedAgentForModal(agent);
    setShowAgentModal(true);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'analytics':
        return <AnalyticsView />;
      case 'opportunities':
        return <OpportunitiesView />;
      case 'calendar':
        return <ContentCalendarView />;
      case 'competitors':
        return <CompetitorView />;
      case 'reports':
        return <ReportsView />;
      case 'leads':
        return <LeadsView />;
      case 'global':
        return <GlobalSearchView />;
      case 'integrations':
        return <IntegrationsStatus />;
      case 'notifications':
        return <NotificationsView />;
      case 'help':
        return <HelpView />;
      case 'settings':
        return <SettingsView />;
      case 'agents':
      case 'seo':
      case 'geo':
      case 'content':
      case 'reddit':
      case 'hn':
      case 'twitter':
        return renderDashboardContent();
      default:
        return renderDashboardContent();
    }
  };

  const renderDashboardContent = () => (
    <>
      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Tasks Today', value: '56', icon: Activity, change: '+12%', color: 'text-violet-400' },
          { label: 'Opportunities Found', value: '23', icon: Target, change: '+8', color: 'text-emerald-400' },
          { label: 'AI Visibility Score', value: '73%', icon: Eye, change: '+15%', color: 'text-blue-400' },
          { label: 'Traffic Potential', value: '2.4K', icon: TrendingUp, change: '+34%', color: 'text-orange-400' },
        ].map((stat, i) => (
          <div
            key={i}
            className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Agents */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-violet-400" />
            Active Agents
          </h2>
          <div className="space-y-3">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(activeAgent === agent.id ? null : agent.id)}
                className={`w-full text-left rounded-xl border p-4 transition-all ${
                  activeAgent === agent.id
                    ? `${agent.borderColor} ${agent.bgColor}`
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
                      <agent.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-xs text-slate-400">{agent.tasksToday} tasks today</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${agent.textColor}`}>{agent.score}%</p>
                      <p className="text-xs text-slate-500">score</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAgentSettings(agent);
                      }}
                      className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                    <ChevronRight
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        activeAgent === agent.id ? 'rotate-90' : ''
                      }`}
                    />
                  </div>
                </div>

                {activeAgent === agent.id && (
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-400">Running</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">Performance</span>
                        <span className="text-white">{agent.score}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${agent.color}`}
                          style={{ width: `${agent.score}%` }}
                        />
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-white/5 p-2 text-center">
                        <p className="text-xs text-slate-400">Today</p>
                        <p className="text-sm font-semibold text-white">{agent.tasksToday}</p>
                      </div>
                      <div className="rounded-lg bg-white/5 p-2 text-center">
                        <p className="text-xs text-slate-400">Status</p>
                        <p className="text-sm font-semibold text-emerald-400">Active</p>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column - Activity Feed */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-400" />
            Live Activity
          </h2>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            <div className="space-y-0">
              {liveActivities.map((activity, i) => (
                <div
                  key={i}
                  className={`p-4 border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors ${
                    i === 0 ? 'bg-white/[0.03]' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 ${activity.color}`}>
                      <activity.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-slate-400">{activity.agent}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-white font-medium">{activity.action}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{activity.detail}</p>
                      {activity.type === 'opportunity' && (
                        <button className="mt-2 inline-flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                          View opportunity
                          <ArrowUpRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Metrics */}
        <div className="lg:col-span-1 space-y-4">
          {/* SEO Metrics */}
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-violet-400" />
            Performance Metrics
          </h2>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
              <Search className="h-4 w-4 text-emerald-400" />
              SEO Scores
            </h3>
            <div className="space-y-4">
              {seoMetrics.map((metric, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-slate-400">{metric.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{metric.value}</span>
                      <span className="text-xs text-emerald-400 flex items-center gap-0.5">
                        <ArrowUpRight className="h-3 w-3" />
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-2">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GEO Metrics */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" />
              AI Visibility (GEO)
            </h3>
            <div className="space-y-3">
              {geoMetrics.map((metric, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02]"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 truncate">{metric.query}</p>
                  </div>
                  {metric.mentioned ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">#{metric.position}</span>
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    </div>
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Overall AI Score</span>
                <span className="text-lg font-bold text-blue-400">73%</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <h3 className="text-sm font-medium text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Generate SEO Report', icon: Search },
                { label: 'View Content Calendar', icon: PenTool },
                { label: 'Check Reddit Mentions', icon: MessageSquare },
                { label: 'Export Analytics', icon: BarChart3 },
              ].map((action, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 rounded-lg p-3 text-sm text-slate-300 hover:bg-white/[0.05] transition-colors"
                >
                  <action.icon className="h-4 w-4 text-slate-400" />
                  {action.label}
                  <ChevronRight className="h-4 w-4 text-slate-500 ml-auto" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom - Daily Suggestions */}
      <div className="mt-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          Today's Action Items
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Fix 3 broken internal links',
              agent: 'SEO Agent',
              priority: 'High',
              priorityColor: 'text-red-400 bg-red-500/10',
              description: 'Found broken links on /blog and /pricing pages that affect crawlability.',
            },
            {
              title: 'Reply to r/startups thread',
              agent: 'Reddit Agent',
              priority: 'Medium',
              priorityColor: 'text-yellow-400 bg-yellow-500/10',
              description: 'High-relevance thread about marketing automation tools. Draft ready.',
            },
            {
              title: 'Publish "Growth Guide" article',
              agent: 'Content Writer',
              priority: 'Medium',
              priorityColor: 'text-yellow-400 bg-yellow-500/10',
              description: 'Article draft complete. SEO score 89. Ready for review and publishing.',
            },
            {
              title: 'Optimize meta descriptions',
              agent: 'SEO Agent',
              priority: 'High',
              priorityColor: 'text-red-400 bg-red-500/10',
              description: '5 pages have missing or duplicate meta descriptions.',
            },
            {
              title: 'Schedule X thread for product update',
              agent: 'X Agent',
              priority: 'Low',
              priorityColor: 'text-blue-400 bg-blue-500/10',
              description: '5-tweet thread about new features ready for scheduling.',
            },
            {
              title: 'Update schema markup',
              agent: 'GEO Agent',
              priority: 'High',
              priorityColor: 'text-red-400 bg-red-500/10',
              description: 'Add FAQ schema to improve AI visibility in ChatGPT responses.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">{item.agent}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${item.priorityColor}`}>
                  {item.priority}
                </span>
              </div>
              <h4 className="text-sm font-medium text-white mb-1">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              <button className="mt-3 text-xs text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
                Take action
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Alinin AI CMO Dashboard</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 rounded-lg bg-white/5 px-3 py-1.5 text-sm text-slate-400">
                <Globe className="h-4 w-4" />
                <span className="max-w-[200px] truncate">{url || 'example.com'}</span>
              </div>
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-slate-300 hover:bg-white/10 transition-colors"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {renderContent()}
        </div>
      </div>

      {/* Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-110 flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>

      {/* Chat Panel */}
      <ChatPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Agent Settings Modal */}
      <AgentSettingsModal
        isOpen={showAgentModal}
        onClose={() => setShowAgentModal(false)}
        agent={selectedAgentForModal}
      />

      {/* Onboarding Flow */}
      {showOnboarding && (
        <OnboardingFlow
          onComplete={completeOnboarding}
          onSkip={completeOnboarding}
        />
      )}
    </div>
  );
}
