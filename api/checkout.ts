// Vercel Serverless Function: /api/checkout
// Requires: STRIPE_SECRET_KEY env var
// npm install stripe (in your backend project)

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { priceId, email, plan } = req.body;
  // Vercel serverless may not send Origin; use request host or VERCEL_URL
  const publicOrigin =
    (typeof req.headers.origin === 'string' && req.headers.origin) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'http://localhost:5173';

  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecret) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY not set' });
  }

  try {
    const params = new URLSearchParams();
    params.append('mode', plan === 'founder' ? 'payment' : 'subscription');
    params.append('payment_method_types[]', 'card');
    params.append('line_items[0][price]', priceId);
    params.append('line_items[0][quantity]', '1');
    params.append('success_url', `${publicOrigin}/?success=true&plan=${plan}`);
    params.append('cancel_url', `${publicOrigin}/?canceled=true`);
    if (email) params.append('customer_email', email);

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const session = await stripeRes.json();

    if (session.error) {
      return res.status(400).json({ error: session.error.message });
    }

    res.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
