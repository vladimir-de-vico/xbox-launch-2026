'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { steps } from '@/data/steps.ts'
import { gsap, useGSAP } from '@/lib/gsap.ts'
import { prefersReducedMotion } from '@/lib/motion.ts'
import { useExperience } from '@/store/experience.ts'

const FULLSCREEN = 3
const GRID = 4
const FLY_AWAY = 5
const MOBILE_WIDTH = 480
const STAGE_GRADIENT =
  'linear-gradient(0deg, rgb(40 44 40) 0%, rgb(23 23 27) 100%)'

const images = steps.find((s) => s.images)?.images ?? []
const [firstSide, featured, lastSide] = images.slice(0, 3)
const secondRow = images.slice(3, 9)
const thirdRow = images.slice(9, 14)

const largeSize =
  'mr-4 flex h-[calc(50vh-32px)] last:mr-0 w-[calc(51.40625vw-1vh)] shrink-0 rounded-2xl max-lg:w-[calc(75vw-40px)] max-md:w-[calc(110vw-32px)]'
const large = `gallery-side relative z-1 overflow-hidden bg-pure-black ${largeSize}`
const small =
  'gallery-tile relative z-1 mr-4 flex h-[calc(25vh-16px)] w-[21.145833333333332vw] min-w-80 max-w-[405px] shrink-0 overflow-hidden rounded-2xl bg-pure-black last:mr-0 max-sm:w-[calc(50vw-40px)]'
const row = 'flex w-fit justify-around'

const Tile = ({ src, className }: { src: string; className: string }) => (
  <div className={className}>
    <Image
      alt=""
      className="object-cover opacity-50"
      fill={true}
      sizes="50vw"
      src={src}
    />
  </div>
)

const Gallery = () => {
  const step = useExperience((s) => s.step)
  const root = useRef<HTMLDivElement>(null)
  const slot = useRef<HTMLDivElement>(null)
  const isFirstRun = useRef<boolean>(true)

  const { contextSafe } = useGSAP({ scope: root })

  const apply = contextSafe((target: number, instant: boolean) => {
    const container = root.current
    const holder = slot.current
    if (!(container && holder)) {
      return
    }
    const duration = instant ? 0 : 1.8
    const ease = 'power3.inOut'
    const box = holder.getBoundingClientRect()
    const origin = container.getBoundingClientRect()
    const isGrid = target === GRID || target === FLY_AWAY
    const isScattered = target <= FULLSCREEN

    gsap.to(container, {
      yPercent: target < FULLSCREEN ? 100 : target === FLY_AWAY ? -100 : 0,
      duration,
      ease,
    })
    gsap.set(container, {
      background: target === FLY_AWAY ? 'transparent' : STAGE_GRADIENT,
      delay: target === FLY_AWAY ? 0 : duration,
    })
    gsap.set(holder, {
      backgroundColor: target === FLY_AWAY ? 'transparent' : 'black',
      delay: target === FLY_AWAY ? 0 : duration,
    })
    gsap.to('.gallery-featured', {
      x: isGrid ? 0 : origin.left - box.left,
      y: isGrid ? 0 : origin.top - box.top,
      width: isGrid ? box.width : globalThis.innerWidth,
      height: isGrid ? box.height : globalThis.innerHeight,
      borderRadius: isGrid && globalThis.innerWidth > MOBILE_WIDTH ? 16 : 0,
      duration,
      ease,
    })
    gsap.to('.gallery-side', {
      xPercent: (i: number) => (isScattered ? (i ? 150 : -150) : 0),
      yPercent: isScattered ? 60 : 0,
      scale: isScattered ? 2 : 1,
      duration,
      ease,
    })
    gsap.to('.gallery-row-2', {
      yPercent: isScattered ? 265 : 0,
      xPercent: isScattered ? -25 : target === FLY_AWAY ? 10 : 0,
      scale: isScattered ? 2.2 : 1,
      duration,
      ease,
    })
    gsap.to('.gallery-row-3', {
      yPercent: isScattered ? 400 : 0,
      xPercent: isScattered ? 25 : target === FLY_AWAY ? -10 : 0,
      scale: isScattered ? 2.2 : 1,
      duration,
      ease,
    })
    const flying = target === FLY_AWAY
    gsap.to('.gallery-featured, .gallery-tile, .gallery-side', {
      rotateX: flying ? 60 : 0,
      rotateY: flying ? 90 : 0,
      rotateZ: flying ? 5 : 0,
      duration: instant ? 0 : flying ? 1.5 : 1.8,
      ease: flying ? 'power2.inOut' : ease,
    })
  })

  useGSAP(
    () => {
      apply(step, isFirstRun.current || prefersReducedMotion())
      isFirstRun.current = false
    },
    { scope: root, dependencies: [step] }
  )

  useGSAP(
    () => {
      const onResize = contextSafe(() =>
        apply(useExperience.getState().step, true)
      )
      globalThis.addEventListener('resize', onResize)
      return () => globalThis.removeEventListener('resize', onResize)
    },
    { scope: root }
  )

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-grid flex select-none flex-col items-center"
      ref={root}
      style={{ background: STAGE_GRADIENT }}
    >
      <div className={`${row} pt-4 pb-2`}>
        <Tile className={large} src={firstSide ?? ''} />
        <div
          className={`relative z-2 justify-center bg-pure-black ${largeSize}`}
          ref={slot}
        >
          <Tile
            className="gallery-featured absolute top-0 left-0 z-1 flex size-full overflow-hidden bg-pure-black"
            src={featured ?? ''}
          />
        </div>
        <Tile className={large} src={lastSide ?? ''} />
      </div>
      <div className={`gallery-row-2 ${row} min-h-[25vh] py-2`}>
        {secondRow.map((src) => (
          <Tile className={small} key={src} src={src} />
        ))}
      </div>
      <div className={`gallery-row-3 ${row} min-h-[25vh] py-2`}>
        {thirdRow.map((src) => (
          <Tile className={small} key={src} src={src} />
        ))}
      </div>
    </div>
  )
}

export { Gallery }
