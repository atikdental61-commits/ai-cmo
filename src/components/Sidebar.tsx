import { useState } from 'react';
import {
  LayoutDashboard,
  Search,
  Globe,
  PenTool,
  MessageSquare,
  Newspaper,
  AtSign,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Calendar,
  FileText,
  Users,
  Key,
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'global', label: 'Global Search', icon: Globe },
  { id: 'leads', label: 'Lead Discovery', icon: Users },
  { id: 'agents', label: 'AI Agents', icon: Sparkles, badge: 6 },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'geo', label: 'GEO & AI', icon: Globe },
  { id: 'content', label: 'Content', icon: PenTool },
  { id: 'reddit', label: 'Reddit', icon: MessageSquare },
  { id: 'hn', label: 'Hacker News', icon: Newspaper },
  { id: 'twitter', label: 'X / Twitter', icon: AtSign },
];

const secondaryItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'opportunities', label: 'Opportunities', icon: Target, badge: 23 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'competitors', label: 'Competitors', icon: Target },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const bottomItems = [
  { id: 'integrations', label: 'Integrations', icon: Key },
  { id: 'notifications', label: 'Notifications', icon: Bell, badge: 5 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'help', label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`sticky top-16 h-[calc(100vh-4rem)] bg-slate-900/50 border-r border-white/5 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center h-8 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Main Menu */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <div className="mb-4">
            {!collapsed && (
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider px-3 mb-2">
                Main
              </p>
            )}
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="flex-shrink-0 h-5 min-w-[20px] px-1.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>

          <div className="mb-4">
            {!collapsed && (
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider px-3 mb-2">
                Insights
              </p>
            )}
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  activeSection === item.id
                    ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="flex-shrink-0 h-5 min-w-[20px] px-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="p-2 border-t border-white/5 space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="flex-shrink-0 h-5 min-w-[20px] px-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-medium flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
          
          {/* User Profile */}
          <div className={`mt-2 p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] ${
            collapsed ? 'flex items-center justify-center' : ''
          }`}>
            {collapsed ? (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white">
                U
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">User</p>
                  <p className="text-xs text-slate-400">Max Plan</p>
                </div>
                <LogOut className="h-4 w-4 text-slate-400 hover:text-white cursor-pointer" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
