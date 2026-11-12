import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Xbox Series X',
    short_name: 'Xbox Series X',
    description: 'The launch of the Xbox Series X',
    lang: 'it',
    display: 'standalone',
    orientation: 'portrait',
    scope: '/',
    start_url: '/',
    background_color: '#17171B',
    theme_color: '#17171B',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
