import { useState } from 'react';
import {
  Users,
  Search,
  Globe,
  Mail,
  TrendingUp,
  RefreshCw,
  Send,
  MessageSquare,
  Clock,
  Sparkles,
  Mic,
  MicOff,
  Download,
} from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  role: string;
  company: string;
  email: string;
  linkedin: string;
  twitter: string;
  reddit: string;
  source: string;
  status: 'discovered' | 'contacted' | 'following_up' | 'converted' | 'rejected';
  relevance: number;
  history: { date: string; note: string }[];
}

const initialLeads: Lead[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'VP of Marketing',
    company: 'NextGen SaaS',
    email: 'sarah.j@nextgensaas.io',
    linkedin: 'linkedin.com/in/sarah-jenkins-vpm',
    twitter: '@sarahj_marketing',
    reddit: 'u/sarah_mktg',
    source: 'Competitor backlink gap',
    status: 'discovered',
    relevance: 96,
    history: [{ date: '2026-03-25', note: 'Lead discovered via AI scanning' }],
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Head of Growth',
    company: 'CloudScale AI',
    email: 'mchen@cloudscale.ai',
    linkedin: 'linkedin.com/in/michael-chen-growth',
    twitter: '@chen_growth',
    reddit: 'u/cloud_mchen',
    source: 'Reddit r/SaaS mention',
    status: 'contacted',
    relevance: 91,
    history: [
      { date: '2026-03-22', note: 'Lead discovered' },
      { date: '2026-03-23', note: 'Initial outreach sent via LinkedIn' },
    ],
  },
  {
    id: 3,
    name: 'Amanda Brooks',
    role: 'Founder & CEO',
    company: 'EcoCart',
    email: 'amanda@ecocart.com',
    linkedin: 'linkedin.com/in/amanda-brooks-ecocart',
    twitter: '@amanda_ecocart',
    reddit: 'u/ecocart_founder',
    source: 'HN Discussion thread',
    status: 'following_up',
    relevance: 88,
    history: [
      { date: '2026-03-18', note: 'Lead discovered via HN' },
      { date: '2026-03-20', note: 'Initial Email sent' },
      { date: '2026-03-24', note: 'Follow up Email sent (Waiting for reply)' },
    ],
  },
  {
    id: 4,
    name: 'David Larsson',
    role: 'Chief Marketing Officer',
    company: 'Apex Data',
    email: 'd.larsson@apexdata.co',
    linkedin: 'linkedin.com/in/david-larsson- apex',
    twitter: '@david_apexdata',
    reddit: 'u/david_larsson_mktg',
    source: 'Google Search Keyword "AI marketing suite"',
    status: 'discovered',
    relevance: 85,
    history: [{ date: '2026-03-26', note: 'Lead identified via AI targeting' }],
  },
  {
    id: 5,
    name: 'Elena Rostova',
    role: 'Digital Acquisition Lead',
    company: 'VibeFlow',
    email: 'elena@vibeflow.io',
    linkedin: 'linkedin.com/in/elena-rostova-vibeflow',
    twitter: '@elena_vibeflow',
    reddit: 'u/elena_vibeflow',
    source: 'Twitter/X discussion mention',
    status: 'converted',
    relevance: 94,
    history: [
      { date: '2026-03-15', note: 'Discovered via X' },
      { date: '2026-03-16', note: 'Outreach via Email' },
      { date: '2026-03-22', note: 'Demo scheduled & converted to customer' },
    ],
  },
];

export default function LeadsView() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [isFindingLeads, setIsFindingLeads] = useState<boolean>(false);
  
  // Conversational / Voice Assistance State
  const [voiceInput, setVoiceInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [assistantOutput, setAssistantOutput] = useState<string>('Speak or type your command to discover, reach out, or track leads.');
  
  // Custom outreach state
  const [outreachModalLead, setOutreachModalLead] = useState<Lead | null>(null);
  const [outreachChannel, setOutreachChannel] = useState<string>('email');
  const [outreachMessage, setOutreachMessage] = useState<string>('');

  const findNewLeads = () => {
    setIsFindingLeads(true);
    setAssistantOutput('Searching for high-relevance leads in your niche...');
    setTimeout(() => {
      const newLead: Lead = {
        id: Date.now(),
        name: 'Olivia Martinez',
        role: 'Marketing Coordinator',
        company: 'PulseMetric',
        email: 'olivia@pulsemetric.com',
        linkedin: 'linkedin.com/in/olivia-martinez-pulse',
        twitter: '@olivia_pulse',
        reddit: 'u/olivia_pulse',
        source: 'AI Predictive matching',
        status: 'discovered',
        relevance: 92,
        history: [{ date: '2026-03-27', note: 'Discovered via Alinin AI CMO' }],
      };
      setLeads((prev) => [newLead, ...prev]);
      setIsFindingLeads(false);
      setAssistantOutput('Perfect! Found a new potential customer: Olivia Martinez from PulseMetric (Relevance: 92%).');
    }, 2500);
  };

  const handleOutreachAction = (lead: Lead, channel: string) => {
    setOutreachModalLead(lead);
    setOutreachChannel(channel);
    
    let template = '';
    if (channel === 'email') {
      template = `Hi ${lead.name},\n\nI noticed your work at ${lead.company} and wanted to reach out. We recently optimized our web presence using Alinin AI CMO and noticed some common growth challenges in your niche.\n\nWould you be open to a 5-minute chat on how we can collaborate?\n\nBest regards,\n[Your Name]`;
    } else if (channel === 'linkedin') {
      template = `Hello ${lead.name}, I am impressed by the growth of ${lead.company}. I'd love to connect and share some insights regarding AI visibility optimization in your industry. Cheers!`;
    } else if (channel === 'twitter') {
      template = `Hi @${lead.twitter.replace('@', '')}, saw your tweet about startup marketing. We have a great automated growth agent running at our platform. Let's DM!`;
    } else {
      template = `Hey ${lead.name}, saw your post on Reddit. Totally agree with your points about user acquisition. Check out Alinin AI CMO for automated SEO & Reddit distribution!`;
    }
    setOutreachMessage(template);
    setAssistantOutput(`Drafting ${channel} template for ${lead.name}...`);
  };

  const submitOutreach = () => {
    if (!outreachModalLead) return;

    // Simulate outreach submission & auto-reporting update
    const updatedLeads = leads.map((l) => {
      if (l.id === outreachModalLead.id) {
        return {
          ...l,
          status: 'contacted' as const,
          history: [
            ...l.history,
            { date: '2026-03-27', note: `Outreach sent via ${outreachChannel.toUpperCase()}` },
          ],
        };
      }
      return l;
    });

    setLeads(updatedLeads);
    setAssistantOutput(`Successfully contacted ${outreachModalLead.name} via ${outreachChannel.toUpperCase()}. Status updated and tracked!`);
    setOutreachModalLead(null);
  };

  const handleFollowUpAction = (lead: Lead) => {
    const updatedLeads = leads.map((l) => {
      if (l.id === lead.id) {
        return {
          ...l,
          status: 'following_up' as const,
          history: [...l.history, { date: '2026-03-27', note: 'Sent automated follow-up' }],
        };
      }
      return l;
    });

    setLeads(updatedLeads);
    setAssistantOutput(`Sent follow up message to ${lead.name} and tracked status under active follow-ups.`);
  };

  // Conversational Assistant Processing
  const handleAssistantCommand = (cmd: string) => {
    const cleanCmd = cmd.toLowerCase().trim();
    if (cleanCmd.includes('find') || cleanCmd.includes('scan') || cleanCmd.includes('discover')) {
      findNewLeads();
    } else if (cleanCmd.includes('email') || cleanCmd.includes('contact')) {
      // Find a lead in our list that matches first name or name
      const targetLead = leads.find((l) =>
        cleanCmd.includes(l.name.toLowerCase().split(' ')[0]) || cleanCmd.includes(l.name.toLowerCase())
      );
      if (targetLead) {
        handleOutreachAction(targetLead, 'email');
      } else {
        setAssistantOutput("I couldn't find a lead matching that name in your active list. Please try using a first name.");
      }
    } else if (cleanCmd.includes('follow') || cleanCmd.includes('track')) {
      const targetLead = leads.find((l) =>
        cleanCmd.includes(l.name.toLowerCase().split(' ')[0]) || cleanCmd.includes(l.name.toLowerCase())
      );
      if (targetLead) {
        handleFollowUpAction(targetLead);
      } else {
        setAssistantOutput("Please specify the lead's name to follow up.");
      }
    } else if (cleanCmd.includes('report') || cleanCmd.includes('download')) {
      alert('Generating and downloading your detailed Lead Analytics and Outreach PDF Report...');
      setAssistantOutput('Your full Outreach and Discovery CSV/PDF report is successfully generated and downloaded.');
    } else {
      setAssistantOutput("I didn't understand the command. Try: 'find leads', 'email Michael Chen', 'follow up Sarah Jenkins', or 'download report'.");
    }
    setVoiceInput('');
  };

  // Simulated Voice Activation
  const startListening = () => {
    setIsListening(true);
    setAssistantOutput('Listening for your command... Try "find new leads"');
    setTimeout(() => {
      setIsListening(false);
      const voiceSampleCmd = 'find new leads';
      setVoiceInput(voiceSampleCmd);
      handleAssistantCommand(voiceSampleCmd);
    }, 2500);
  };

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || l.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Users className="h-7 w-7 text-violet-400" />
            Lead Discovery & Conversational Outreach
          </h2>
          <p className="text-sm text-slate-400 mt-1">Discover, reach out, and follow up potential customers autonomously</p>
        </div>
        <button
          onClick={findNewLeads}
          disabled={isFindingLeads}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all"
        >
          {isFindingLeads ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Scanning for leads...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Discover Potential Leads
            </>
          )}
        </button>
      </div>

      {/* Voice / Conversational Assistant Command Console */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/20 p-5 backdrop-blur-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 w-full">
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center relative flex-shrink-0 ${isListening ? 'animate-pulse' : ''}`}>
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-violet-400 uppercase tracking-wider mb-0.5">AI Conversational Assistant</p>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">{assistantOutput}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Type command: e.g. 'find leads', 'email Michael'"
              value={voiceInput}
              onChange={(e) => setVoiceInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAssistantCommand(voiceInput)}
              className="flex-1 md:w-64 bg-white/5 rounded-xl border border-white/10 pl-4 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 backdrop-blur-sm transition-all"
            />
            <button
              onClick={() => handleAssistantCommand(voiceInput)}
              className="p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center flex-shrink-0"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={startListening}
              className={`p-2.5 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all ${
                isListening
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : 'bg-white/5 text-slate-300 hover:text-white border-white/10 hover:bg-white/10'
              }`}
            >
              {isListening ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Discovered', value: leads.filter((l) => l.status === 'discovered').length, color: 'text-violet-400', filter: 'discovered' },
          { label: 'Contacted', value: leads.filter((l) => l.status === 'contacted').length, color: 'text-blue-400', filter: 'contacted' },
          { label: 'Following Up', value: leads.filter((l) => l.status === 'following_up').length, color: 'text-yellow-400', filter: 'following_up' },
          { label: 'Converted', value: leads.filter((l) => l.status === 'converted').length, color: 'text-emerald-400', filter: 'converted' },
        ].map((stat, i) => (
          <button
            key={i}
            onClick={() => setFilter(stat.filter)}
            className={`flex flex-col items-start rounded-xl bg-white/[0.02] border p-4 transition-all text-left ${
              filter === stat.filter
                ? 'border-violet-500/30 bg-violet-500/5'
                : 'border-white/[0.06] hover:bg-white/[0.04]'
            }`}
          >
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Main Leads Management Table / Feed */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <div className="p-4 border-b border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg bg-violet-500/10 text-violet-400 text-xs font-semibold">
              Potential Customers List ({filteredLeads.length})
            </span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-violet-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              All Leads
            </button>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full md:w-64 bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
              />
            </div>
            <button
              onClick={() => {
                alert('Downloading comprehensive lead CSV report...');
                setAssistantOutput('Outreach tracking report downloaded successfully.');
              }}
              className="p-2.5 rounded-xl bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center flex-shrink-0"
              title="Download Leads Report"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.03] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-lg font-bold text-violet-400 flex-shrink-0 border border-violet-500/10">
                    {lead.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-white">{lead.name}</h3>
                      <span className="text-xs text-slate-400">• {lead.role}</span>
                      <span className="text-xs text-slate-500 truncate">@ {lead.company}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Source: <span className="text-violet-400">{lead.source}</span></p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-xs font-semibold text-slate-300">Match relevance: {lead.relevance}%</span>
                      </div>
                      <span className="text-xs text-slate-500">•</span>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${
                        lead.status === 'discovered'
                          ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                          : lead.status === 'contacted'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : lead.status === 'following_up'
                          ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}>
                        {lead.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Lead Action Matrix */}
                <div className="flex flex-col sm:flex-row items-center gap-2 w-full md:w-auto">
                  {/* Channels & Action Buttons */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 w-full sm:w-auto justify-around sm:justify-start">
                    <button
                      onClick={() => handleOutreachAction(lead, 'email')}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      title="Send Outreach Email"
                    >
                      <Mail className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleOutreachAction(lead, 'linkedin')}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      title="Connect on LinkedIn"
                    >
                      <Users className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleOutreachAction(lead, 'twitter')}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      title="DM on Twitter/X"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleOutreachAction(lead, 'reddit')}
                      className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      title="Reddit Organic Reach"
                    >
                      <Globe className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleFollowUpAction(lead)}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:text-white hover:bg-white/10 hover:border-violet-500/30 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Clock className="h-3.5 w-3.5 text-yellow-400" />
                    Send Follow-up
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-400 font-medium">No leads match your active filters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Modal for Single Lead Direct Outreach Template and Trigger */}
      {outreachModalLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOutreachModalLead(null)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-white/10 shadow-2xl shadow-black/50 p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Reach Out to {outreachModalLead.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Send message through your marketing agent</p>
              </div>
              <button
                onClick={() => setOutreachModalLead(null)}
                className="p-1 rounded text-slate-400 hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300">Outreach Channel</label>
                <div className="flex items-center gap-2 mt-1 bg-white/5 border border-white/10 rounded-xl p-1">
                  {(['email', 'linkedin', 'twitter', 'reddit'] as const).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => handleOutreachAction(outreachModalLead, ch)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                        outreachChannel === ch
                          ? 'bg-violet-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-300">Message Draft</label>
                <textarea
                  rows={6}
                  value={outreachMessage}
                  onChange={(e) => setOutreachMessage(e.target.value)}
                  className="w-full mt-1 bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none font-sans"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.06]">
                <button
                  onClick={() => setOutreachModalLead(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-sm text-slate-400 hover:text-white border border-white/10 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={submitOutreach}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send & Track
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
