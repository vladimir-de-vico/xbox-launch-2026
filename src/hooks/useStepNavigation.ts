'use client'

import { useEffect } from 'react'
import { steps } from '@/data/steps.ts'
import { Observer } from '@/lib/gsap.ts'
import { useExperience } from '@/store/experience.ts'

const NEXT_KEYS = new Set(['ArrowDown', 'PageDown', ' '])
const PREV_KEYS = new Set(['ArrowUp', 'PageUp'])

// Arrow keys on buttons are free; Space activates them
const shouldIgnore = (event: KeyboardEvent) => {
  if (!(event.target instanceof Element)) {
    return false
  }
  if (
    event.target.closest(
      'input, textarea, [aria-haspopup], [role="menu"], [role="dialog"]'
    )
  ) {
    return true
  }
  return event.key === ' ' && event.target.closest('button, a') !== null
}

const targetFor = (key: string, step: number) => {
  if (NEXT_KEYS.has(key)) {
    return step + 1
  }
  if (PREV_KEYS.has(key)) {
    return step - 1
  }
  if (key === 'Home') {
    return 0
  }
  return key === 'End' ? steps.length - 1 : null
}

const onKeyDown = (event: KeyboardEvent) => {
  const { isMenuOpen, isPreloaderOut, step, goTo } = useExperience.getState()
  const target = targetFor(event.key, step)
  if (target === null || !isPreloaderOut || isMenuOpen || shouldIgnore(event)) {
    return
  }
  event.preventDefault()
  goTo(target)
}

/** Wheel, touch, drag and keyboard step navigation. */
const useStepNavigation = () => {
  const isEnabled = useExperience((s) => s.isPreloaderOut && !s.isMenuOpen)

  useEffect(() => {
    if (!isEnabled) {
      return
    }
    const { next, prev } = useExperience.getState()
    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      preventDefault: true,
      onUp: (self) => (self.event.type === 'wheel' ? prev() : next()),
      onDown: (self) => (self.event.type === 'wheel' ? next() : prev()),
    })
    globalThis.addEventListener('keydown', onKeyDown)
    return () => {
      observer.kill()
      globalThis.removeEventListener('keydown', onKeyDown)
    }
  }, [isEnabled])
}

export { useStepNavigation }
