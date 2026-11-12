import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import type { ReactNode } from 'react'
import './globals.css'

const x360 = localFont({
  src: '../fonts/x360.woff2',
  variable: '--font-x360-local',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Xbox Series X',
  description: 'The launch of the Xbox Series X',
  applicationName: 'Xbox Series X',
  appleWebApp: { capable: true, title: 'Xbox Series X' },
  formatDetection: { telephone: false },
}

export const viewport: Viewport = {
  themeColor: '#17171B',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className={x360.variable} lang="it">
      <head>
        <link href="https://use.typekit.net" rel="preconnect" />
        <link href="https://use.typekit.net/xqn0xeo.css" rel="stylesheet" />
      </head>
      <body className="font-display">{children}</body>
    </html>
  )
}
