import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/portal/', '/api/'],
    },
    sitemap: 'https://starsmiles.com.au/sitemap.xml',
  }
}
