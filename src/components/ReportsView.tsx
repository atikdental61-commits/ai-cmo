import { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Users, Target, BarChart3, Clock } from 'lucide-react';

interface Report {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
  status: 'ready' | 'generating';
}

const reports: Report[] = [
  { id: 1, name: 'Monthly Marketing Performance', type: 'Full Report', date: 'March 1, 2026', size: '2.4 MB', status: 'ready' },
  { id: 2, name: 'SEO Audit Report', type: 'SEO', date: 'March 15, 2026', size: '1.8 MB', status: 'ready' },
  { id: 3, name: 'AI Visibility Analysis', type: 'GEO', date: 'March 18, 2026', size: '1.1 MB', status: 'ready' },
  { id: 4, name: 'Reddit Campaign Summary', type: 'Social', date: 'March 20, 2026', size: '856 KB', status: 'ready' },
];

export default function ReportsView() {
  const [selectedReportType, setSelectedReportType] = useState('all');

  const reportTypes = [
    { id: 'all', label: 'All Reports', icon: FileText },
    { id: 'seo', label: 'SEO Reports', icon: Target },
    { id: 'geo', label: 'GEO Reports', icon: BarChart3 },
    { id: 'social', label: 'Social Reports', icon: Users },
  ];

  const handleDownload = (report: Report) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${report.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerateReport = (type: string) => {
    alert(`Generating ${type} report... This will be available in a few minutes.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <FileText className="h-7 w-7 text-violet-400" />
            Reports
          </h2>
          <p className="text-sm text-slate-400 mt-1">Generate and download detailed marketing reports</p>
        </div>
      </div>

      {/* Generate New Report */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Generate New Report</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { type: 'Full Performance', icon: BarChart3, desc: 'Complete monthly overview' },
            { type: 'SEO Analysis', icon: Target, desc: 'Technical SEO insights' },
            { type: 'AI Visibility', icon: TrendingUp, desc: 'GEO & AI mentions' },
            { type: 'Social Summary', icon: Users, desc: 'Reddit, X & HN activity' },
          ].map((report, i) => (
            <button
              key={i}
              onClick={() => handleGenerateReport(report.type)}
              className="group flex flex-col items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.05] hover:border-violet-500/30 transition-all text-left"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <report.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-violet-400 transition-colors">{report.type}</p>
                <p className="text-xs text-slate-400 mt-1">{report.desc}</p>
              </div>
              <div className="mt-auto text-xs text-violet-400 flex items-center gap-1">
                Generate <Clock className="h-3 w-3" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedReportType(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              selectedReportType === type.id
                ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            <type.icon className="h-4 w-4" />
            {type.label}
          </button>
        ))}
      </div>

      {/* Reports List */}
      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recent Reports</h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="h-4 w-4" />
              Last 30 days
            </div>
          </div>
        </div>
        <div className="divide-y divide-white/[0.06]">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-violet-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{report.name}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-slate-400">{report.type}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{report.date}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready
                </span>
                <button
                  onClick={() => handleDownload(report)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm text-white hover:bg-white/10 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reports', value: '24', icon: FileText },
          { label: 'Downloads', value: '1,247', icon: Download },
          { label: 'Avg Report Size', value: '1.6 MB', icon: BarChart3 },
          { label: 'Last Generated', value: '2h ago', icon: Clock },
        ].map((stat, i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-lg bg-white/5 flex items-center justify-center">
                <stat.icon className="h-4 w-4 text-slate-400" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
