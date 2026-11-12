import { RichText } from '@/components/atoms/RichText.tsx'
import { MainCta } from '@/components/molecules/MainCta.tsx'
import type { Step } from '@/data/steps.ts'

interface StepSlideProps {
  step: Step
  isShown: boolean
}

const alignments = {
  left: 'items-start pl-[17.8125vw] max-lg:pl-[10vw] max-md:pl-5',
  right:
    'items-start pl-[50vw] max-lg:pl-[45vw] max-md:pr-[5vw] max-md:pl-[40vw] max-sm:pl-5',
  center: 'items-center text-center',
}

const hero = 'text-[14.583333333333334vw] max-md:text-[25.583333333333334vw]'
const heroSub =
  'font-text text-[clamp(16px,0.818rem+0.7767vw,28px)] uppercase tracking-[0.4em]'
const title = 'text-[clamp(2.5rem,1.8932rem+2.589vw,5rem)]'

const StepSlide = ({ step, isShown }: StepSlideProps) => {
  const isHero = step.id === 0
  const lines = step.titleLines

  return (
    <div
      aria-hidden={!isShown}
      className={`pointer-events-none fixed inset-0 z-text flex h-dvh w-screen flex-col justify-center font-display ${alignments[step.alignment]} ${isHero ? '-mt-[5vw] max-sm:-mt-[15vw]' : ''}`}
      inert={!isShown}
    >
      {lines.length === 2 && (
        <h2 className="flex flex-col overflow-hidden font-normal">
          <span className="block overflow-hidden">
            <span
              className={`title-line block leading-[1.2em] ${isHero ? hero : title}`}
            >
              <RichText text={lines[0]} />
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className={`title-line block leading-[1.2em] ${isHero ? heroSub : title}`}
            >
              <RichText text={lines[1]} />
            </span>
          </span>
        </h2>
      )}

      {step.description !== '' && (
        <div
          className={`mt-[35px] max-w-[550px] font-text text-[clamp(14px,0.825rem+0.25vw,18px)] leading-[1.3em] max-lg:max-w-[400px] max-md:max-w-[360px] max-sm:max-w-screen max-sm:pr-[5vw] ${isShown ? 'block' : 'hidden'}`}
        >
          <p className="step-paragraph">{step.description}</p>
        </div>
      )}

      {step.ctaLabel !== '' && (
        <div className="mt-[35px] flex overflow-hidden">
          <div className="step-cta pointer-events-auto">
            <MainCta label={step.ctaLabel} />
          </div>
        </div>
      )}
    </div>
  )
}

export { StepSlide }
