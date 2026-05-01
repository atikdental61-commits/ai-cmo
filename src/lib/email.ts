// =====================================================
// EMAIL SERVICE - Resend (or any backend email provider)
// =====================================================
// IMPORTANT: Resend API requires server-side calls.
// You MUST deploy a backend endpoint.
//
// Backend example (Vercel Function):
//   // /api/email.ts
//   import { Resend } from 'resend';
//   const resend = new Resend(process.env.RESEND_API_KEY);
//   export default async function handler(req, res) {
//     const { to, subject, html, from } = req.body;
//     const data = await resend.emails.send({
//       from: from || 'Alinin AI CMO <onboarding@yourdomain.com>',
//       to, subject, html,
//     });
//     res.json(data);
//   }
// =====================================================

const emailEndpoint = import.meta.env.VITE_EMAIL_API_ENDPOINT;

export const isEmailConfigured = Boolean(emailEndpoint);

export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export interface EmailResponse {
  id?: string;
  error?: string;
}

/**
 * Send a single email via Resend (through backend)
 */
export async function sendEmail(payload: EmailPayload): Promise<EmailResponse> {
  if (!emailEndpoint) {
    return { error: 'Email service not configured. Set VITE_EMAIL_API_ENDPOINT.' };
  }

  try {
    const res = await fetch(emailEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Email API error: ${res.status}`);
    const data = await res.json();
    return { id: data.id };
  } catch (err: any) {
    return { error: err.message };
  }
}

/**
 * Send outreach email to a lead
 */
export async function sendOutreachEmail(
  leadEmail: string,
  leadName: string,
  message: string,
  fromName = 'Alinin AI CMO Team'
): Promise<EmailResponse> {
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <p>Hi ${leadName},</p>
      <div>${message.replace(/\n/g, '<br/>')}</div>
      <br/>
      <p style="color: #888; font-size: 12px;">
        Sent via Alinin AI CMO • ${fromName}<br/>
        <a href="#unsubscribe">Unsubscribe</a>
      </p>
    </div>
  `;
  return sendEmail({
    to: leadEmail,
    subject: `Quick question for ${leadName}`,
    html,
  });
}

/**
 * Send welcome email after signup
 */
export async function sendWelcomeEmail(email: string, name: string): Promise<EmailResponse> {
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #6366f1;">Welcome to Alinin AI CMO, ${name}! 👋</h1>
      <p>Your AI marketing team is ready. We've deployed 6 agents to grow your traffic 24/7.</p>
      <a href="${window.location.origin}" style="display: inline-block; background: linear-gradient(to right, #8b5cf6, #6366f1); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none;">
        Open Dashboard
      </a>
    </div>
  `;
  return sendEmail({
    to: email,
    subject: 'Welcome to Alinin AI CMO 🚀',
    html,
  });
}

/**
 * Send daily/weekly report email
 */
export async function sendReportEmail(
  email: string,
  reportData: { tasks: number; opportunities: number; visibility: number }
): Promise<EmailResponse> {
  const html = `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your Daily Alinin AI CMO Report</h2>
      <ul>
        <li><strong>${reportData.tasks}</strong> tasks completed</li>
        <li><strong>${reportData.opportunities}</strong> new opportunities found</li>
        <li>AI Visibility: <strong>${reportData.visibility}%</strong></li>
      </ul>
    </div>
  `;
  return sendEmail({
    to: email,
    subject: '📊 Your Daily Marketing Report',
    html,
  });
}
