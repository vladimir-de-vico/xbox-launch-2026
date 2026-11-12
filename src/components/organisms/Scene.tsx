'use client'

import { useEffect, useRef } from 'react'
import { steps } from '@/data/steps.ts'
import { prefersReducedMotion } from '@/lib/motion.ts'
import type { createStage } from '@/lib/stage.ts'
import { useExperience } from '@/store/experience.ts'

type Stage = Awaited<ReturnType<typeof createStage>>

const Scene = () => {
  const canvas = useRef<HTMLCanvasElement>(null)
  const stage = useRef<Stage | null>(null)
  const step = useExperience((s) => s.step)

  useEffect(() => {
    let disposed = false
    const { setSceneReady } = useExperience.getState()
    import('@/lib/stage.ts')
      .then(({ createStage: create }) =>
        canvas.current ? create(canvas.current) : null
      )
      .then((created) => {
        if (disposed) {
          created?.dispose()
          return
        }
        stage.current = created
      })
      .catch((error: unknown) => console.error('3D scene unavailable', error))
      .finally(setSceneReady)
    return () => {
      disposed = true
      stage.current?.dispose()
      stage.current = null
    }
  }, [])

  useEffect(() => {
    const target = steps[step]
    if (target) {
      stage.current?.goTo(target, prefersReducedMotion())
    }
  }, [step])

  return (
    <div aria-hidden="true" className="fixed inset-0 z-canvas">
      <canvas className="size-full touch-none" ref={canvas} />
    </div>
  )
}

export { Scene }
