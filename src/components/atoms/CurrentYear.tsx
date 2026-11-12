'use client'

import { useSyncExternalStore } from 'react'

const BUILD_YEAR = new Date().getFullYear()
const subscribe = () => () => undefined

/** Build year in static HTML, visitor's year after hydration. */
const CurrentYear = () => (
  <>
    {useSyncExternalStore(
      subscribe,
      () => new Date().getFullYear(),
      () => BUILD_YEAR
    )}
  </>
)

export { CurrentYear }
