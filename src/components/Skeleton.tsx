interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export default function Skeleton({ className = '', variant = 'text', width, height, count = 1 }: SkeletonProps) {
  const baseClass = 'bg-white/5 animate-pulse rounded';

  const variants = {
    text: `${baseClass} h-4 w-full`,
    circular: `${baseClass} rounded-full`,
    rectangular: `${baseClass}`,
    card: `${baseClass} rounded-2xl p-6`,
  };

  const items = Array.from({ length: count }, (_, i) => i);

  return (
    <>
      {items.map((i) => (
        <div
          key={i}
          className={`${variants[variant]} ${className}`}
          style={{
            width: width || (variant === 'circular' ? 40 : undefined),
            height: height || (variant === 'circular' ? 40 : undefined),
          }}
        >
          {variant === 'card' && (
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-lg bg-white/10 animate-pulse" />
              <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded" />
              <div className="h-3 w-full bg-white/10 animate-pulse rounded" />
              <div className="h-3 w-2/3 bg-white/10 animate-pulse rounded" />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-4">
            <div className="h-5 w-5 rounded bg-white/10 animate-pulse mb-3" />
            <div className="h-8 w-20 bg-white/10 animate-pulse rounded mb-2" />
            <div className="h-3 w-16 bg-white/10 animate-pulse rounded" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agents */}
        <div className="space-y-3">
          <div className="h-6 w-32 bg-white/10 animate-pulse rounded" />
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white/10 animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 w-24 bg-white/10 animate-pulse rounded mb-2" />
                  <div className="h-3 w-16 bg-white/10 animate-pulse rounded" />
                </div>
                <div className="h-4 w-12 bg-white/10 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div className="space-y-3">
          <div className="h-6 w-28 bg-white/10 animate-pulse rounded" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <div className="h-3 w-20 bg-white/10 animate-pulse rounded mb-2" />
              <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded mb-2" />
              <div className="h-3 w-full bg-white/10 animate-pulse rounded" />
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="space-y-3">
          <div className="h-6 w-36 bg-white/10 animate-pulse rounded" />
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <div className="h-3 w-16 bg-white/10 animate-pulse rounded" />
                    <div className="h-3 w-12 bg-white/10 animate-pulse rounded" />
                  </div>
                  <div className="h-2 w-full bg-white/10 animate-pulse rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-white/[0.06]">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <div className="h-10 w-10 rounded-lg bg-white/10 animate-pulse flex-shrink-0" />
          <div className="flex-1">
            <div className="h-4 w-48 bg-white/10 animate-pulse rounded mb-2" />
            <div className="h-3 w-32 bg-white/10 animate-pulse rounded" />
          </div>
          <div className="h-8 w-24 bg-white/10 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}
