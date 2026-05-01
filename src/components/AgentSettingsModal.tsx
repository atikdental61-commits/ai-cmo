import { useState } from 'react';
import { Settings, Pause, Play, RotateCw, Target, Clock, Bell } from 'lucide-react';
import Modal from './Modal';

interface AgentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: {
    id: string;
    name: string;
    icon: any;
    color: string;
    score: number;
  } | null;
}

export default function AgentSettingsModal({ isOpen, onClose, agent }: AgentSettingsModalProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [frequency, setFrequency] = useState('daily');
  const [notifications, setNotifications] = useState(true);
  const [priority, setPriority] = useState('medium');

  if (!agent) return null;

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${agent.name} Settings`} size="lg">
      <div className="space-y-6">
        {/* Status Control */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${agent.color} flex items-center justify-center`}>
              <agent.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{agent.name}</p>
              <p className="text-xs text-emerald-400">Currently Active • Score: {agent.score}%</p>
            </div>
          </div>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isPaused ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
            }`}
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
            {isPaused ? 'Resume Agent' : 'Pause Agent'}
          </button>
        </div>

        {/* Frequency Settings */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
            <Clock className="h-4 w-4 text-slate-400" />
            Task Frequency
          </label>
          <div className="flex gap-3">
            {['hourly', 'daily', 'weekly'].map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  frequency === freq
                    ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {freq.charAt(0).toUpperCase() + freq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
            <Target className="h-4 w-4 text-slate-400" />
            Priority Level
          </label>
          <div className="flex gap-3">
            {['high', 'medium', 'low'].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  priority === p
                    ? p === 'high' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      p === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-sm font-medium text-white">Enable Notifications</p>
              <p className="text-xs text-slate-400">Get alerts when agent finds opportunities</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`relative h-6 w-11 rounded-full transition-colors ${notifications ? 'bg-violet-500' : 'bg-white/10'}`}
          >
            <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${notifications ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </button>
        </div>

        {/* Advanced Options */}
        <div className="pt-4 border-t border-white/[0.06]">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <Settings className="h-4 w-4 text-slate-400" />
            Advanced Options
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <label className="text-xs text-slate-400">Max Tasks Per Day</label>
              <input
                type="number"
                defaultValue="50"
                className="mt-1 w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.06]">
              <label className="text-xs text-slate-400">Minimum Relevance Score</label>
              <input
                type="number"
                defaultValue="75"
                className="mt-1 w-full bg-white/5 rounded-lg px-3 py-2 text-sm text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Agent reset to default settings')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white border border-white/10"
            >
              <RotateCw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-medium text-white"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
