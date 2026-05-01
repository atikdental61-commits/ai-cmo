import { useState } from 'react';
import { Calendar, Plus, Edit2, Trash2, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  type: string;
  channel: string;
  date: string;
  time: string;
  status: 'draft' | 'scheduled' | 'published';
  agent: string;
}

const initialContent: ContentItem[] = [
  { id: 1, title: '10 Growth Hacks for SaaS Startups', type: 'Blog Post', channel: 'Blog', date: '2026-04-02', time: '09:00', status: 'scheduled', agent: 'Content Writer' },
  { id: 2, title: 'Why AI Marketing is the Future', type: 'Article', channel: 'Blog', date: '2026-04-02', time: '14:00', status: 'draft', agent: 'Content Writer' },
  { id: 3, title: 'Reddit Marketing: A Complete Guide', type: 'Thread', channel: 'Reddit', date: '2026-04-03', time: '11:30', status: 'scheduled', agent: 'Reddit Agent' },
  { id: 4, title: 'Product Launch Announcement', type: 'Thread', channel: 'X/Twitter', date: '2026-04-03', time: '16:00', status: 'scheduled', agent: 'X Agent' },
  { id: 5, title: 'How to Optimize for ChatGPT', type: 'Article', channel: 'Blog', date: '2026-04-04', time: '10:00', status: 'draft', agent: 'Content Writer' },
  { id: 6, title: 'Indie Hacker Marketing Playbook', type: 'Post', channel: 'Hacker News', date: '2026-04-05', time: '09:30', status: 'scheduled', agent: 'HN Agent' },
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function ContentCalendarView() {
  const [content, setContent] = useState(initialContent);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedWeek, setSelectedWeek] = useState(0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-blue-400" />;
      case 'draft':
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'scheduled':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-white/10 text-slate-400 border-white/20';
    }
  };

  const deleteItem = (id: number) => {
    setContent(content.filter((item) => item.id !== id));
  };

  const updateStatus = (id: number, newStatus: 'draft' | 'scheduled' | 'published') => {
    setContent(content.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Calendar className="h-7 w-7 text-violet-400" />
            Content Calendar
          </h2>
          <p className="text-sm text-slate-400 mt-1">Plan and schedule your content across all channels</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-white/5 p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${viewMode === 'calendar' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white'}`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded text-sm transition-all ${viewMode === 'list' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white'}`}
            >
              List
            </button>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white">
            <Plus className="h-4 w-4" />
            New Content
          </button>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
        <button
          onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
          className="text-sm text-slate-400 hover:text-white px-3 py-1 rounded transition-colors"
        >
          ← Previous Week
        </button>
        <span className="text-sm font-medium text-white">Week of April 1 - April 7, 2026</span>
        <button
          onClick={() => setSelectedWeek(selectedWeek + 1)}
          className="text-sm text-slate-400 hover:text-white px-3 py-1 rounded transition-colors"
        >
          Next Week →
        </button>
      </div>

      {viewMode === 'calendar' ? (
        /* Calendar View */
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day, index) => {
            const dayContent = content.filter((item) => {
              const itemDate = new Date(item.date);
              const dayOfWeek = itemDate.getDay() || 7;
              return dayOfWeek === index + 1;
            });

            return (
              <div key={index} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 min-h-[280px]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{day}</p>
                    <p className="text-xs text-slate-400">Apr {index + 1}</p>
                  </div>
                  <button className="text-xs text-violet-400 hover:text-violet-300">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {dayContent.length > 0 ? (
                    dayContent.map((item) => (
                      <div
                        key={item.id}
                        className="group rounded-lg bg-white/[0.03] border border-white/[0.06] p-3 hover:bg-white/[0.05] transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-white line-clamp-2">{item.title}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs px-1.5 py-0.5 rounded border ${getStatusColor(item.status)}`}>
                                {item.status}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{item.time} • {item.channel}</p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 text-slate-400 hover:text-white"><Edit2 className="h-3 w-3" /></button>
                            <button onClick={() => deleteItem(item.id)} className="p-1 text-slate-400 hover:text-red-400"><Trash2 className="h-3 w-3" /></button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-xs text-slate-500">No content scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
          <div className="divide-y divide-white/[0.06]">
            {content.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <span className="text-sm font-medium text-white">{item.title}</span>
                  </div>
                  <span className="text-xs text-slate-400">• {item.type} on {item.channel}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-400">{item.date} at {item.time}</span>
                  <span className={`text-xs px-2 py-0.5 rounded border ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <span className="text-xs text-slate-400">{item.agent}</span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateStatus(item.id, 'draft')} className="text-xs px-2 py-1 text-slate-400 hover:text-white">Draft</button>
                    <button onClick={() => updateStatus(item.id, 'scheduled')} className="text-xs px-2 py-1 text-blue-400 hover:text-blue-300">Schedule</button>
                    <button onClick={() => updateStatus(item.id, 'published')} className="text-xs px-2 py-1 text-emerald-400 hover:text-emerald-300">Publish</button>
                    <button onClick={() => deleteItem(item.id)} className="p-1.5 text-slate-400 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Scheduled', value: content.filter(c => c.status === 'scheduled').length, color: 'text-blue-400' },
          { label: 'Drafts', value: content.filter(c => c.status === 'draft').length, color: 'text-yellow-400' },
          { label: 'Published', value: content.filter(c => c.status === 'published').length, color: 'text-emerald-400' },
          { label: 'This Week', value: content.length, color: 'text-violet-400' },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4 text-center">
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
