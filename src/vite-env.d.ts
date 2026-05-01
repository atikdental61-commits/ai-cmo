/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_CLERK_PUBLISHABLE_KEY: string;
  readonly VITE_AI_API_ENDPOINT: string;
  readonly VITE_OPENAI_API_KEY: string;
  readonly VITE_ANTHROPIC_API_KEY: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_STRIPE_PRICE_PRO: string;
  readonly VITE_STRIPE_PRICE_MAX: string;
  readonly VITE_STRIPE_PRICE_FOUNDER: string;
  readonly VITE_STRIPE_CHECKOUT_ENDPOINT: string;
  readonly VITE_EMAIL_API_ENDPOINT: string;
  readonly VITE_GOOGLE_PAGESPEED_API_KEY: string;
  readonly VITE_DATAFORSEO_LOGIN: string;
  readonly VITE_DATAFORSEO_PASSWORD: string;
  readonly VITE_SERPAPI_KEY: string;
  readonly VITE_REDDIT_CLIENT_ID: string;
  readonly VITE_REDDIT_CLIENT_SECRET: string;
  readonly VITE_TWITTER_BEARER_TOKEN: string;
  readonly VITE_LINKEDIN_CLIENT_ID: string;
  readonly VITE_LINKEDIN_CLIENT_SECRET: string;
  readonly VITE_POSTHOG_KEY: string;
  readonly VITE_POSTHOG_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
