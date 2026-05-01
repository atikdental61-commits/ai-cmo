import { LucideIcon, RefreshCw } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export default function EmptyState({ icon: Icon, title, description, action, secondaryAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-6">
        <Icon className="h-10 w-10 text-slate-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-slate-400 text-center max-w-md mb-8 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-3">
        {action && (
          <button
            onClick={action.onClick}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            {action.label}
          </button>
        )}
        {secondaryAction && (
          <button
            onClick={secondaryAction.onClick}
            className="px-5 py-2.5 rounded-xl bg-white/5 text-sm text-slate-300 hover:bg-white/10 border border-white/10 transition-all"
          >
            {secondaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
