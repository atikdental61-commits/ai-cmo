// Vercel Serverless Function: /api/email
// Requires: RESEND_API_KEY env var

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { to, subject, html, from } = req.body;
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY not set' });
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: from || 'Alinin AI CMO <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    });

    const data = await resendRes.json();
    if (!resendRes.ok) return res.status(resendRes.status).json(data);
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
