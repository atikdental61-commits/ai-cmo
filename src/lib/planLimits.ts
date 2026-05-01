// =====================================================
// SUBSCRIPTION PLAN LIMITS - Per-plan feature access
// =====================================================

export type PlanType = 'free' | 'pro' | 'max' | 'founder';

export interface PlanLimits {
  credits: number;
  websites: number;
  leadsPerMonth: number;
  outreachPerMonth: number;
  reportsPerMonth: number;
  agents: string[];
  features: string[];
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    credits: 5,
    websites: 1,
    leadsPerMonth: 10,
    outreachPerMonth: 5,
    reportsPerMonth: 2,
    agents: ['seo'],
    features: ['Basic SEO audit', '5 AI messages'],
  },
  pro: {
    credits: 500,
    websites: 3,
    leadsPerMonth: 100,
    outreachPerMonth: 50,
    reportsPerMonth: 10,
    agents: ['seo', 'content'],
    features: ['SEO & Content agents', '20+ AI models', 'Real-time insights', 'Projects'],
  },
  max: {
    credits: 2000,
    websites: 10,
    leadsPerMonth: 500,
    outreachPerMonth: 200,
    reportsPerMonth: 50,
    agents: ['seo', 'geo', 'content', 'reddit', 'hn', 'twitter'],
    features: [
      'All 6 AI agents',
      'Full Alinin AI CMO suite',
      'Global lead discovery',
      'Unlimited projects',
      'Export & reports',
      'Priority support',
    ],
  },
  founder: {
    credits: 2000,
    websites: 10,
    leadsPerMonth: 500,
    outreachPerMonth: 200,
    reportsPerMonth: 50,
    agents: ['seo', 'geo', 'content', 'reddit', 'hn', 'twitter'],
    features: [
      'All Max features',
      'Lifetime access',
      '2,000 credits/month forever',
      'Early access to features',
      'Founding Discord membership',
      'Priority support',
    ],
  },
};

/**
 * Check if user can access a feature based on their plan
 */
export function canAccess(
  plan: PlanType,
  resource: keyof PlanLimits,
  count: number
): { allowed: boolean; limit: number; remaining: number } {
  const limits = PLAN_LIMITS[plan];
  const limit = limits[resource] as number;
  return {
    allowed: count <= limit,
    limit,
    remaining: Math.max(0, limit - count),
  };
}

/**
 * Get plan name with proper formatting
 */
export function getPlanName(plan: PlanType): string {
  const names: Record<PlanType, string> = {
    free: 'Free',
    pro: 'Pro',
    max: 'Max',
    founder: 'Founding User',
  };
  return names[plan];
}

/**
 * Get plan price
 */
export function getPlanPrice(plan: PlanType): number {
  const prices: Record<PlanType, number> = {
    free: 0,
    pro: 20,
    max: 99,
    founder: 1000,
  };
  return prices[plan];
}

/**
 * Check if a specific agent is available in the plan
 */
export function hasAgentAccess(plan: PlanType, agentId: string): boolean {
  return PLAN_LIMITS[plan].agents.includes(agentId);
}
