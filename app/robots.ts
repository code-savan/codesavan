import type { MetadataRoute } from 'next';

const SITE_URL = 'https://www.codesavan.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /api/ is the only live match; the rest are legacy/defensive
        // entries so auth, admin, or account paths are never indexed
        // if they are ever reintroduced.
        disallow: ['/api/', '/admin/', '/dashboard/', '/login/', '/signup/'],
      },
      // AI answer-engine crawlers: explicitly allowed per owner decision
      // (crawl access granted for citation in AI answers; see AEO audit).
      ...[
        'GPTBot',
        'ChatGPT-User',
        'ClaudeBot',
        'PerplexityBot',
        'Google-Extended',
        'CCBot',
        'Applebot-Extended',
      ].map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
