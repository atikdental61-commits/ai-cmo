import { lazy, Suspense, ComponentType } from 'react';
import { DashboardSkeleton } from './Skeleton';

/**
 * Lazy load a component with a loading fallback
 * Usage: const AnalyticsView = lazyLoad(() => import('./AnalyticsView'), <DashboardSkeleton />);
 */
export function lazyLoad(
  importFn: () => Promise<{ default: ComponentType<any> }>,
  fallback: React.ReactNode = <DashboardSkeleton />
) {
  const LazyComponent = lazy(importFn);

  return function LazyWrapper(props: any) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

/**
 * Simple lazy page wrapper for AgentDashboard routing
 */
export function LazyPage({ children, loading }: { children: React.ReactNode; loading?: React.ReactNode }) {
  return (
    <Suspense fallback={loading || <DashboardSkeleton />}>
      {children}
    </Suspense>
  );
}
