const CACHE = 'xbox-launch-v1'
const PRECACHE = [
  '/',
  '/model/xbox.glb',
  '/draco/draco_decoder.wasm',
  '/draco/draco_wasm_wrapper.js',
  '/images/noise.webp',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  )
})

const networkFirst = async (request) => {
  const cache = await caches.open(CACHE)
  try {
    const response = await fetch(request)
    cache.put(request, response.clone())
    return response
  } catch {
    return (await cache.match(request)) ?? (await cache.match('/'))
  }
}

const cacheFirst = async (request) => {
  const cached = await caches.match(request)
  if (cached) {
    return cached
  }
  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(CACHE)
    cache.put(request, response.clone())
  }
  return response
}

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(CACHE)
  const cached = await cache.match(request)
  const network = fetch(request).then((response) => {
    if (response.ok) {
      cache.put(request, response.clone())
    }
    return response
  })
  if (cached) {
    network.catch(() => undefined)
    return cached
  }
  return network
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  // Range requests (audio seeking) are left to the network
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    request.headers.has('range')
  ) {
    return
  }
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request))
  } else if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(staleWhileRevalidate(request))
  }
})
