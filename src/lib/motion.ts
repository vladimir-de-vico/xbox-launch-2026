const STEP_DURATION = 1.8
const REDUCED_STEP_DURATION = 0.6

const prefersReducedMotion = () =>
  typeof globalThis.matchMedia === 'function' &&
  globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches

const stepDuration = () =>
  prefersReducedMotion() ? REDUCED_STEP_DURATION : STEP_DURATION

export {
  prefersReducedMotion,
  REDUCED_STEP_DURATION,
  STEP_DURATION,
  stepDuration,
}
