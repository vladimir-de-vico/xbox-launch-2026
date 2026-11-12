'use client'

import { useRef, useState } from 'react'
import { StepSlide } from '@/components/molecules/StepSlide.tsx'
import { steps } from '@/data/steps.ts'
import { gsap, SplitText, useGSAP } from '@/lib/gsap.ts'
import { prefersReducedMotion } from '@/lib/motion.ts'
import { useExperience } from '@/store/experience.ts'

const EXIT = 0.5
const SWAP_DELAY = 0.1
const FADE = 0.3

const parts = (slide: HTMLElement) => ({
  lines: [...slide.querySelectorAll('.title-line')],
  cta: slide.querySelector('.step-cta'),
  paragraph: slide.querySelector('.step-paragraph'),
})

const slideAt = (root: HTMLElement | null, index: number) =>
  root?.children.item(index) as HTMLElement | null

const StepSlides = () => {
  const step = useExperience((s) => s.step)
  const [shown, setShown] = useState(-1)
  const root = useRef<HTMLDivElement>(null)
  const direction = useRef<'intro' | 'forward' | 'backward'>('intro')
  const split = useRef<SplitText | null>(null)

  useGSAP(() => gsap.set('.title-line, .step-cta', { yPercent: 100 }), {
    scope: root,
  })

  // Exit the shown slide, then swap
  useGSAP(
    () => {
      const slide = slideAt(root.current, shown)
      if (step < 0 || step === shown) {
        return
      }
      if (!slide) {
        setShown(step)
        return
      }
      direction.current = step > shown ? 'forward' : 'backward'
      if (prefersReducedMotion()) {
        gsap.to(slide, { autoAlpha: 0, duration: FADE })
        gsap.delayedCall(FADE, () => setShown(step))
        return
      }
      const out = direction.current === 'forward' ? -1 : 1
      const { lines, cta } = parts(slide)
      const exit = { duration: EXIT, ease: 'power3.in' }
      for (const [i, line] of lines.entries()) {
        const distance = i === 1 && shown === 0 ? 500 : 100
        gsap.to(line, { ...exit, yPercent: distance * out })
      }
      if (split.current) {
        gsap.to(split.current.lines, { ...exit, yPercent: 200 * out })
      }
      if (cta) {
        gsap.to(cta, { ...exit, yPercent: 100 * out })
      }
      gsap.delayedCall(EXIT + SWAP_DELAY, () => setShown(step))
    },
    { dependencies: [step] }
  )

  // Enter the newly shown slide
  useGSAP(
    () => {
      split.current?.revert()
      split.current = null
      const slide = slideAt(root.current, shown)
      if (!slide) {
        return
      }
      const { lines, cta, paragraph } = parts(slide)
      if (prefersReducedMotion()) {
        gsap.set(cta ? [...lines, cta] : lines, { yPercent: 0 })
        gsap.fromTo(slide, { autoAlpha: 0 }, { autoAlpha: 1, duration: FADE })
        return
      }
      gsap.set(slide, { autoAlpha: 1 })
      const mode = direction.current
      const from = mode === 'backward' ? -100 : 100
      const ease = 'power3.out'
      const delays = {
        intro: [1, 1.2, 0.5],
        forward: [0.3, 0.4, 0.5],
        backward: [0.5, 0.4, 0.4],
      }[mode]
      for (const [i, line] of lines.entries()) {
        gsap.fromTo(
          line,
          { yPercent: from },
          { yPercent: 0, duration: 1.2, delay: delays[i], ease }
        )
      }
      if (cta) {
        gsap.fromTo(
          cta,
          { yPercent: from },
          { yPercent: 0, duration: 0.9, delay: 0.5, ease }
        )
      }
      if (paragraph) {
        split.current = SplitText.create(paragraph, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) =>
            gsap.fromTo(
              self.lines,
              { yPercent: from * 2 },
              {
                yPercent: 0,
                stagger: mode === 'backward' ? -0.025 : 0.05,
                duration: 0.9,
                delay: delays[2],
                ease,
              }
            ),
        })
      }
    },
    { dependencies: [shown] }
  )

  return (
    <div ref={root}>
      {steps.map((s, i) => (
        <StepSlide isShown={i === shown} key={s.id} step={s} />
      ))}
    </div>
  )
}

export { StepSlides }
