import { useState } from 'react';
import {
  User,
  Bell,
  Shield,
  Globe,
  CreditCard,
  Key,
  Mail,
  Lock,
  Save,
  Check,
} from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Globe },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function SettingsView() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weeklyReport: true,
    dailyDigest: false,
    opportunities: true,
    agentAlerts: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-slate-400 mt-1">Manage your account preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                  activeSection === section.id
                    ? 'bg-violet-500/10 text-violet-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <section.icon className="h-5 w-5" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeSection === 'profile' && (
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Profile Settings</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white">
                    U
                  </div>
                  <div>
                    <button className="px-4 py-2 rounded-lg bg-violet-500/20 text-violet-400 text-sm font-medium hover:bg-violet-500/30 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-slate-400 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full bg-white/5 rounded-lg pl-11 pr-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      defaultValue="https://example.com"
                      className="w-full bg-white/5 rounded-lg pl-11 pr-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                  <textarea
                    defaultValue="Solo founder building SaaS products."
                    rows={3}
                    className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                  >
                    {saved ? (
                      <>
                        <Check className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
              <div className="space-y-6">
                {[
                  { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                  { key: 'push', label: 'Push Notifications', description: 'Receive push notifications in browser' },
                  { key: 'weeklyReport', label: 'Weekly Report', description: 'Get a weekly summary of performance' },
                  { key: 'dailyDigest', label: 'Daily Digest', description: 'Daily summary of agent activities' },
                  { key: 'opportunities', label: 'Opportunity Alerts', description: 'Get notified about new opportunities' },
                  { key: 'agentAlerts', label: 'Agent Alerts', description: 'Important alerts from AI agents' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.description}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications]
                          ? 'bg-violet-500'
                          : 'bg-white/10'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'translate-x-5'
                            : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                  >
                    {saved ? (
                      <>
                        <Check className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Preferences
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Lock className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium text-white">Change Password</p>
                        <p className="text-xs text-slate-400">Update your password regularly</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-400 mb-2">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white/5 rounded-lg px-4 py-3 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-3 mb-4">
                    <Key className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-400">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-white/5 text-sm text-slate-300 hover:bg-white/10 transition-colors">
                    Enable 2FA
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-medium text-white hover:opacity-90 transition-opacity"
                  >
                    {saved ? (
                      <>
                        <Check className="h-4 w-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Update Security
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Integrations</h3>
              <div className="space-y-4">
                {[
                  { name: 'Google Analytics', description: 'Connect your GA4 property', connected: true },
                  { name: 'Google Search Console', description: 'Monitor search performance', connected: true },
                  { name: 'Twitter/X', description: 'Post and monitor X/Twitter', connected: false },
                  { name: 'Reddit', description: 'Monitor and post on Reddit', connected: false },
                  { name: 'Slack', description: 'Get notifications in Slack', connected: false },
                ].map((integration, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{integration.name}</p>
                        <p className="text-xs text-slate-400">{integration.description}</p>
                      </div>
                    </div>
                    <button
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        integration.connected
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {integration.connected ? 'Connected' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'billing' && (
            <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Billing & Subscription</h3>
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Current Plan</p>
                      <p className="text-2xl font-bold text-white mt-1">Max Plan</p>
                      <p className="text-sm text-slate-400 mt-1">$99/month • Renews on Apr 15, 2026</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-white/10 text-sm text-white hover:bg-white/20 transition-colors">
                      Change Plan
                    </button>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-sm font-medium text-white mb-4">Usage This Month</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Credits Used</span>
                        <span className="text-sm text-white">1,247 / 2,000</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 w-[62%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Messages</span>
                        <span className="text-sm text-white">12,470 / 20,000</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2">
                        <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[62%]" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                  <p className="text-sm font-medium text-white mb-4">Payment Method</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-16 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center text-xs font-bold text-white">
                        VISA
                      </div>
                      <div>
                        <p className="text-sm text-white">•••• •••• •••• 4242</p>
                        <p className="text-xs text-slate-400">Expires 12/27</p>
                      </div>
                    </div>
                    <button className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
