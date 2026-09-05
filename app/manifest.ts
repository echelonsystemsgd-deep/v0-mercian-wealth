import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mercian Wealth',
    short_name: 'Mercian Wealth',
    description: 'High-Converting Websites & Booking Systems for UK Local Businesses',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090B',
    theme_color: '#09090B',
    icons: [
      {
        src: '/Logo1.jpeg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
      {
        src: '/Logo1.jpeg',
        sizes: '512x512',
        type: 'image/jpeg',
      },
    ],
  }
}
