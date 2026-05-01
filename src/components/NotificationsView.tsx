import { useState } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, AlertTriangle, Clock, X, Check } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'error' | 'info' | 'warning';
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: 1, title: 'SEO score improved', message: 'Your website SEO score increased from 74 to 78. Great progress!', time: '15 min ago', type: 'success', read: false },
  { id: 2, title: 'New lead opportunity', message: '3 high-relevance leads found matching your keyword profile.', time: '1 hour ago', type: 'info', read: false },
  { id: 3, title: 'Reddit mention detected', message: 'Your brand was mentioned in r/SaaS. Reply drafted and ready for review.', time: '2 hours ago', type: 'info', read: false },
  { id: 4, title: 'AI visibility dropped', message: 'Your AI visibility score dropped by 5%. Competitors gaining ground.', time: '3 hours ago', type: 'warning', read: false },
  { id: 5, title: 'Content published', message: '"10 Growth Hacks for SaaS" article published successfully on your blog.', time: '5 hours ago', type: 'success', read: true },
  { id: 6, title: 'Stripe payment failed', message: 'Your monthly subscription payment failed. Update your payment method.', time: '1 day ago', type: 'error', read: true },
  { id: 7, title: 'Weekly report ready', message: 'Your weekly marketing report is ready. Check the Reports tab.', time: '2 days ago', type: 'info', read: true },
];

export default function NotificationsView() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'unread' ? notifications.filter(n => !n.read) : notifications;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'info': return <Info className="h-5 w-5 text-blue-400" />;
      default: return <Bell className="h-5 w-5 text-slate-400" />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return 'bg-white/[0.01]';
    switch (type) {
      case 'success': return 'bg-emerald-500/[0.03] border-emerald-500/10';
      case 'error': return 'bg-red-500/[0.03] border-red-500/10';
      case 'warning': return 'bg-yellow-500/[0.03] border-yellow-500/10';
      case 'info': return 'bg-blue-500/[0.03] border-blue-500/10';
      default: return 'bg-white/[0.02]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Bell className="h-7 w-7 text-violet-400" />
            Notifications
          </h2>
          <p className="text-sm text-slate-400 mt-1">Stay updated with your AI agents' activities</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg bg-white/5 p-1">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${filter === 'all' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white'}`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${filter === 'unread' ? 'bg-violet-500/20 text-violet-400' : 'text-slate-400 hover:text-white'}`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-xs text-slate-300 hover:bg-white/10 border border-white/10 transition-all"
            >
              <Check className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notification List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-2xl border p-5 transition-all hover:bg-white/[0.04] ${getBgColor(notification.type, notification.read)} ${notification.read ? 'border-white/[0.04]' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`text-sm font-semibold ${notification.read ? 'text-slate-400' : 'text-white'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </span>
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5"
                          title="Mark as read"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => dismiss(notification.id)}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/5"
                        title="Dismiss"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${notification.read ? 'text-slate-500' : 'text-slate-300'}`}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-4">
            <Bell className="h-8 w-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">All clear!</h3>
          <p className="text-sm text-slate-400">
            {filter === 'unread' ? 'No unread notifications.' : 'No notifications yet.'}
          </p>
        </div>
      )}
    </div>
  );
}
