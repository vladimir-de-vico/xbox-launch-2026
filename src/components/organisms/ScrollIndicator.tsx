'use client'

import { steps } from '@/data/steps.ts'
import { useExperience } from '@/store/experience.ts'

const bar =
  'w-full transition-[height] duration-1600 ease-cubic will-change-[height] motion-reduce:duration-0'

const ScrollIndicator = () => {
  const step = useExperience((s) => s.step)
  const current = steps[step]
  const height = `${((step + 1) / steps.length) * 100}%`

  return (
    <div className="pointer-events-none fixed top-0 right-(--gutter) z-indicator flex h-full items-center justify-center">
      <p className="sr-only" role="status">
        {current
          ? `Sezione ${step + 1} di ${steps.length}: ${current.menuLabel}`
          : ''}
      </p>
      <div
        aria-hidden="true"
        className="relative z-1 h-[400px] w-0.5 bg-[linear-gradient(0deg,rgb(0_0_0/0)_0%,rgb(0_0_0)_50%,rgb(0_0_0/0)_100%)]"
      >
        <div
          className={`${bar} relative z-2 bg-[linear-gradient(0deg,rgb(155_241_64)_0%,rgb(155_241_64/0)_100%)]`}
          style={{ height }}
        />
        <div
          className={`${bar} absolute top-0 left-0 z-1 bg-[linear-gradient(0deg,rgb(155_241_64)_25%,rgb(155_241_64/0)_100%)] blur-[5px]`}
          style={{ height }}
        />
      </div>
    </div>
  )
}

export { ScrollIndicator }
