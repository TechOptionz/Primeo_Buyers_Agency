import type { MetadataRoute } from 'next';
import { SITE } from '@/config/site';

/**
 * Crawlers that feed AI answer engines and assistants (ChatGPT and OpenAI search, Claude, Perplexity,
 * Google's AI features, Bing and Copilot, Apple Intelligence, Meta AI, Amazon, DuckDuckGo, Common
 * Crawl). "*" already allows everything; naming them makes the permission explicit for tools that
 * look for their own entry, and documents the decision.
 */
export const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Googlebot',
  'Bingbot', 'msnbot',
  'Applebot', 'Applebot-Extended',
  'meta-externalagent', 'FacebookBot',
  'Amazonbot', 'DuckAssistBot', 'CCBot', 'YouBot', 'cohere-ai', 'MistralAI-User',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, { userAgent: AI_CRAWLERS, allow: '/' }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
