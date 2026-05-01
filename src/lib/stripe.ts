import { loadStripe, Stripe } from '@stripe/stripe-js';

// =====================================================
// STRIPE PAYMENT INTEGRATION
// Setup: https://stripe.com → Dashboard → Get Publishable Key
// Create Products & Prices in Stripe Dashboard
// =====================================================

const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const checkoutEndpoint = import.meta.env.VITE_STRIPE_CHECKOUT_ENDPOINT;

export const isStripeConfigured = Boolean(stripeKey);

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise && stripeKey) {
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise || Promise.resolve(null);
}

export const PRICING_PLANS = {
  pro: {
    name: 'Pro',
    price: 20,
    priceId: import.meta.env.VITE_STRIPE_PRICE_PRO,
    features: ['500 credits/month', '20+ AI models', 'Real-time insights'],
  },
  max: {
    name: 'Max',
    price: 99,
    priceId: import.meta.env.VITE_STRIPE_PRICE_MAX,
    features: ['2,000 credits/month', 'Full Alinin AI CMO suite', 'All 6 agents'],
  },
  founder: {
    name: 'Founding User',
    price: 1000,
    priceId: import.meta.env.VITE_STRIPE_PRICE_FOUNDER,
    features: ['Lifetime access', '2,000 credits/month forever'],
  },
};

/**
 * Redirect to Stripe Checkout
 * Requires backend endpoint to create checkout session
 *
 * Backend example (Vercel Function):
 *   // /api/checkout.ts
 *   import Stripe from 'stripe';
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *   export default async function handler(req, res) {
 *     const session = await stripe.checkout.sessions.create({
 *       mode: 'subscription',
 *       payment_method_types: ['card'],
 *       line_items: [{ price: req.body.priceId, quantity: 1 }],
 *       success_url: `${req.headers.origin}/success`,
 *       cancel_url: `${req.headers.origin}/pricing`,
 *       customer_email: req.body.email,
 *     });
 *     res.json({ sessionId: session.id });
 *   }
 */
export async function checkout(plan: 'pro' | 'max' | 'founder', email?: string): Promise<{ error?: string }> {
  const priceId = PRICING_PLANS[plan].priceId;

  if (!stripeKey || !checkoutEndpoint || !priceId) {
    return {
      error: 'Stripe not fully configured. Set VITE_STRIPE_PUBLISHABLE_KEY, VITE_STRIPE_CHECKOUT_ENDPOINT, and price IDs.',
    };
  }

  try {
    // Create checkout session via backend
    const res = await fetch(checkoutEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, email, plan }),
    });

    if (!res.ok) throw new Error(`Checkout error: ${res.status}`);
    const { sessionId, url } = await res.json();

    // Option A: Redirect via Stripe URL (preferred)
    if (url) {
      window.location.href = url;
      return {};
    }

    // Option B: Redirect via Stripe.js (older API)
    const stripe = await getStripe();
    if (!stripe) return { error: 'Stripe failed to load' };
    // @ts-expect-error - redirectToCheckout exists on older Stripe.js types
    const result = await stripe.redirectToCheckout({ sessionId });
    return result.error ? { error: result.error.message } : {};
  } catch (err: any) {
    return { error: err.message };
  }
}

/**
 * Get customer portal URL (for managing subscription)
 */
export async function openCustomerPortal(customerId: string): Promise<{ error?: string }> {
  if (!checkoutEndpoint) {
    return { error: 'Endpoint not configured' };
  }
  try {
    const res = await fetch(`${checkoutEndpoint}/portal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId }),
    });
    const { url } = await res.json();
    window.location.href = url;
    return {};
  } catch (err: any) {
    return { error: err.message };
  }
}
