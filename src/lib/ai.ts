// =====================================================
// AI / LLM SERVICE - OpenAI / Anthropic Claude
// =====================================================
// SECURITY NOTE: Never expose API keys in production!
// Use a backend proxy (Vercel Functions, Cloudflare Workers).
//
// For backend proxy, deploy this Vercel function:
//
//   // /api/ai.ts
//   import OpenAI from 'openai';
//   const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
//   export default async function handler(req, res) {
//     const { messages, model = 'gpt-4o-mini' } = req.body;
//     const response = await openai.chat.completions.create({ model, messages });
//     res.json(response.choices[0].message);
//   }
// =====================================================

const apiEndpoint = import.meta.env.VITE_AI_API_ENDPOINT;
const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const isAIConfigured = Boolean(apiEndpoint || openaiKey);

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  error?: string;
}

/**
 * Send messages to AI and get a response
 * Tries backend proxy first (recommended), falls back to direct OpenAI
 */
export async function chat(messages: ChatMessage[], model = 'gpt-4o-mini'): Promise<AIResponse> {
  // Option 1: Use backend proxy (RECOMMENDED for production)
  if (apiEndpoint) {
    try {
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, model }),
      });
      if (!res.ok) throw new Error(`AI API error: ${res.status}`);
      const data = await res.json();
      return { content: data.content || data.message?.content || '' };
    } catch (err: any) {
      return { content: '', error: err.message };
    }
  }

  // Option 2: Direct OpenAI call (NOT RECOMMENDED - exposes key)
  if (openaiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({ model, messages }),
      });
      if (!res.ok) throw new Error(`OpenAI error: ${res.status}`);
      const data = await res.json();
      return { content: data.choices[0]?.message?.content || '' };
    } catch (err: any) {
      return { content: '', error: err.message };
    }
  }

  // Mock response when not configured
  return {
    content: `[AI Mock] To enable real AI responses, configure VITE_AI_API_ENDPOINT or VITE_OPENAI_API_KEY in your .env.local file.\n\nYour message: "${messages[messages.length - 1]?.content?.slice(0, 100)}"`,
  };
}

/**
 * Generate a marketing strategy for a website
 */
export async function generateMarketingStrategy(url: string, niche?: string): Promise<AIResponse> {
  return chat([
    {
      role: 'system',
      content: 'You are an expert CMO. Generate concise, actionable marketing strategies.',
    },
    {
      role: 'user',
      content: `Create a marketing strategy for: ${url}${niche ? ` (niche: ${niche})` : ''}. Include SEO, content, social media, and growth tactics.`,
    },
  ]);
}

/**
 * Generate outreach email for a lead
 */
export async function generateOutreachEmail(
  leadName: string,
  leadCompany: string,
  context: string
): Promise<AIResponse> {
  return chat([
    {
      role: 'system',
      content: 'You are a B2B sales expert. Write personalized, non-salesy outreach emails.',
    },
    {
      role: 'user',
      content: `Write a short outreach email to ${leadName} at ${leadCompany}. Context: ${context}`,
    },
  ]);
}

/**
 * Analyze website content for SEO recommendations
 */
export async function analyzeSEO(url: string, content?: string): Promise<AIResponse> {
  return chat([
    {
      role: 'system',
      content: 'You are an SEO expert. Provide specific, prioritized SEO recommendations.',
    },
    {
      role: 'user',
      content: `Analyze SEO for ${url}. ${content ? `Content sample: ${content.slice(0, 2000)}` : ''}`,
    },
  ]);
}
