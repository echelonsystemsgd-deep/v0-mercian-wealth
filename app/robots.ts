import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mercianwealth.com'

  const protectedRoutes = [
    '/admin/',
    '/client/',
    '/dashboard/',
    '/api/',
    '/invoice/',
    '/quote/',
    '/login',
    '/signup',
    '/forgot-password',
    '/reset-password',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: protectedRoutes,
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: protectedRoutes,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
