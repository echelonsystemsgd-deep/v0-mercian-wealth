import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mercian Wealth · Bespoke Website Architecture',
    short_name: 'Mercian Wealth',
    description: 'Bespoke digital experiences and high-converting website architecture engineered for UK commercial enterprises.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030206',
    theme_color: '#030206',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
