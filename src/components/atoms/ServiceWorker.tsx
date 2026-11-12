'use client'

import { useEffect } from 'react'

const ServiceWorker = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .catch((error: unknown) => console.error('Service worker', error))
    }
  }, [])
  return null
}

export { ServiceWorker }
