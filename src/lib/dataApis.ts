// =====================================================
// REAL DATA APIs - SEO, Social Media, Search
// =====================================================

const pageSpeedKey = import.meta.env.VITE_GOOGLE_PAGESPEED_API_KEY;
const serpApiKey = import.meta.env.VITE_SERPAPI_KEY;
const dataForSEOLogin = import.meta.env.VITE_DATAFORSEO_LOGIN;
const dataForSEOPassword = import.meta.env.VITE_DATAFORSEO_PASSWORD;
const twitterToken = import.meta.env.VITE_TWITTER_BEARER_TOKEN;

// =====================================================
// GOOGLE PAGESPEED INSIGHTS - Real SEO/Performance Data
// Get key: https://developers.google.com/speed/docs/insights/v5/get-started
// =====================================================

export interface PageSpeedResult {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  fcp: string; // First Contentful Paint
  lcp: string; // Largest Contentful Paint
  cls: string; // Cumulative Layout Shift
  error?: string;
}

export async function analyzePageSpeed(url: string, strategy: 'mobile' | 'desktop' = 'mobile'): Promise<PageSpeedResult> {
  if (!pageSpeedKey) {
    return {
      performance: 0,
      seo: 0,
      accessibility: 0,
      bestPractices: 0,
      fcp: 'N/A',
      lcp: 'N/A',
      cls: 'N/A',
      error: 'Google PageSpeed API key not configured.',
    };
  }

  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices&key=${pageSpeedKey}`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`PageSpeed error: ${res.status}`);
    const data = await res.json();

    const categories = data.lighthouseResult?.categories || {};
    const audits = data.lighthouseResult?.audits || {};

    return {
      performance: Math.round((categories.performance?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
    };
  } catch (err: any) {
    return {
      performance: 0,
      seo: 0,
      accessibility: 0,
      bestPractices: 0,
      fcp: 'N/A',
      lcp: 'N/A',
      cls: 'N/A',
      error: err.message,
    };
  }
}

// =====================================================
// SERPAPI - Real Google Search Results & Keyword Data
// Get key: https://serpapi.com
// =====================================================

export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  position: number;
}

export async function googleSearch(query: string): Promise<{ results: SearchResult[]; error?: string }> {
  if (!serpApiKey) {
    return { results: [], error: 'SerpAPI key not configured.' };
  }

  try {
    // Note: SerpAPI may require CORS proxy or backend call from browser
    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${serpApiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    return { results: data.organic_results || [] };
  } catch (err: any) {
    return { results: [], error: err.message };
  }
}

// =====================================================
// REDDIT API - Public, no auth needed for read-only
// =====================================================

export interface RedditPost {
  title: string;
  url: string;
  subreddit: string;
  score: number;
  numComments: number;
  author: string;
  createdAt: number;
}

export async function searchReddit(query: string, subreddit?: string): Promise<{ posts: RedditPost[]; error?: string }> {
  try {
    const baseUrl = subreddit
      ? `https://www.reddit.com/r/${subreddit}/search.json`
      : 'https://www.reddit.com/search.json';
    const url = `${baseUrl}?q=${encodeURIComponent(query)}&sort=relevance&limit=25${subreddit ? '&restrict_sr=1' : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Reddit error: ${res.status}`);
    const data = await res.json();

    const posts: RedditPost[] = (data.data?.children || []).map((c: any) => ({
      title: c.data.title,
      url: `https://reddit.com${c.data.permalink}`,
      subreddit: c.data.subreddit_name_prefixed,
      score: c.data.score,
      numComments: c.data.num_comments,
      author: c.data.author,
      createdAt: c.data.created_utc * 1000,
    }));

    return { posts };
  } catch (err: any) {
    return { posts: [], error: err.message };
  }
}

// =====================================================
// HACKER NEWS API - Public, no auth needed
// =====================================================

export interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  descendants: number;
}

export async function searchHackerNews(query: string): Promise<{ stories: HNStory[]; error?: string }> {
  try {
    const url = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(query)}&tags=story`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HN error: ${res.status}`);
    const data = await res.json();

    const stories: HNStory[] = (data.hits || []).slice(0, 20).map((hit: any) => ({
      id: hit.objectID,
      title: hit.title,
      url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      score: hit.points,
      by: hit.author,
      descendants: hit.num_comments,
    }));

    return { stories };
  } catch (err: any) {
    return { stories: [], error: err.message };
  }
}

// =====================================================
// TWITTER/X API - Requires backend (CORS + Bearer Token)
// =====================================================

export async function searchTwitter(_query: string): Promise<{ tweets: any[]; error?: string }> {
  if (!twitterToken) {
    return { tweets: [], error: 'Twitter API requires backend proxy. Set up /api/twitter endpoint.' };
  }
  // Twitter API blocks direct browser calls due to CORS — must proxy via backend
  return { tweets: [], error: 'Use backend proxy for Twitter API calls.' };
}

// =====================================================
// DATAFORSEO - Comprehensive SEO Data (keyword volume, backlinks, etc.)
// =====================================================

export async function getKeywordData(keywords: string[]): Promise<{ data: any[]; error?: string }> {
  if (!dataForSEOLogin || !dataForSEOPassword) {
    return { data: [], error: 'DataForSEO credentials not configured.' };
  }

  try {
    const auth = btoa(`${dataForSEOLogin}:${dataForSEOPassword}`);
    const res = await fetch('https://api.dataforseo.com/v3/keywords_data/google/search_volume/live', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([{ keywords, language_code: 'en', location_code: 2840 }]),
    });
    const data = await res.json();
    return { data: data.tasks?.[0]?.result || [] };
  } catch (err: any) {
    return { data: [], error: err.message };
  }
}

// =====================================================
// CONFIGURATION STATUS
// =====================================================

export const apiStatus = {
  pageSpeed: Boolean(pageSpeedKey),
  serpApi: Boolean(serpApiKey),
  dataForSEO: Boolean(dataForSEOLogin && dataForSEOPassword),
  twitter: Boolean(twitterToken),
  reddit: true, // Public API
  hackerNews: true, // Public API
};
