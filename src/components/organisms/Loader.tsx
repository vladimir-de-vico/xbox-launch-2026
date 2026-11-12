'use client'

import { useRef } from 'react'
import { Button, Dialog } from 'react-aria-components'
import { Logo } from '@/components/atoms/Logo.tsx'
import { Wordmark } from '@/components/atoms/Wordmark.tsx'
import { gsap, useGSAP } from '@/lib/gsap.ts'
import { prefersReducedMotion } from '@/lib/motion.ts'
import { useExperience } from '@/store/experience.ts'

const Loader = () => {
  const isSceneReady = useExperience((s) => s.isSceneReady)
  const isPreloaderOut = useExperience((s) => s.isPreloaderOut)
  const enter = useExperience((s) => s.enter)
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = prefersReducedMotion()
      if (!isSceneReady) {
        if (!reduced) {
          gsap.to('.loader-logo', { rotate: 360, duration: 1.8, ease: 'none' })
        }
        return
      }
      gsap
        .timeline()
        .to('.loader-logo', {
          scale: 1,
          rotate: reduced ? 0 : 720,
          color: '#9bf140',
          duration: reduced ? 0.3 : 1.8,
          ease: 'expo.inOut',
        })
        .to('.loader-reveal', {
          autoAlpha: 1,
          delay: 0.4,
          duration: 0.6,
          ease: 'power3.inOut',
        })
    },
    { scope: root, dependencies: [isSceneReady] }
  )

  const leave = (withAudio: boolean) =>
    gsap.to(root.current, {
      autoAlpha: 0,
      duration: prefersReducedMotion() ? 0 : 0.5,
      ease: 'power3.inOut',
      onComplete: () => enter(withAudio),
    })
  const enterWithAudio = () => leave(true)
  const enterWithoutAudio = () => leave(false)

  if (isPreloaderOut) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-overlay bg-(image:--gradient-stage) select-none"
      ref={root}
    >
      <Dialog aria-label="Xbox Series X" className="size-full outline-none">
        <div className="relative flex size-full flex-col items-center justify-center">
          <p className="sr-only" role="status">
            {isSceneReady ? 'Esperienza pronta' : 'Caricamento in corso'}
          </p>
          <div className="flex flex-col items-center">
            <span
              className="loader-logo flex items-center justify-center rounded-full bg-dark-primary p-0.5 text-dark-secondary"
              style={{ transform: 'scale(5)' }}
            >
              <Logo />
            </span>
            <Wordmark className="loader-reveal invisible mt-2.5 block opacity-0" />
          </div>

          <Button
            className="loader-reveal invisible absolute bottom-[30vh] mt-11 cursor-pointer rounded-md bg-dark-secondary px-[30px] py-2.5 font-text text-pure-white text-xs uppercase opacity-0 outline-none transition-colors duration-100 ease-cubic data-focus-visible:bg-green data-hovered:bg-green data-focus-visible:text-pure-black data-hovered:text-pure-black"
            isDisabled={!isSceneReady}
            onPress={enterWithAudio}
          >
            Enter
          </Button>

          <div className="loader-reveal invisible absolute bottom-0 left-0 flex w-full justify-center px-[5vw] py-11 uppercase opacity-0">
            <p className="block max-w-80 text-center font-text text-[10px] text-pure-white leading-[18px]">
              This website uses audio to enhance your experience. Use your
              headphones or{' '}
              <Button
                className="cursor-pointer rounded-md font-text text-[10px] text-pure-white uppercase underline outline-none data-focus-visible:bg-dark-secondary data-focus-visible:text-green"
                isDisabled={!isSceneReady}
                onPress={enterWithoutAudio}
              >
                enter without audio
              </Button>
              .
            </p>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export { Loader }
