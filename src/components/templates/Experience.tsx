'use client'

import { Noise } from '@/components/atoms/Noise.tsx'
import { Footer } from '@/components/organisms/Footer.tsx'
import { Gallery } from '@/components/organisms/Gallery.tsx'
import { Header } from '@/components/organisms/Header.tsx'
import { Loader } from '@/components/organisms/Loader.tsx'
import { Scene } from '@/components/organisms/Scene.tsx'
import { ScrollIndicator } from '@/components/organisms/ScrollIndicator.tsx'
import { StepSlides } from '@/components/organisms/StepSlides.tsx'
import { useAmbientAudio } from '@/hooks/useAmbientAudio.ts'
import { useStepNavigation } from '@/hooks/useStepNavigation.ts'
import { useExperience } from '@/store/experience.ts'

const Experience = () => {
  useAmbientAudio()
  useStepNavigation()
  const isPreloaderOut = useExperience((s) => s.isPreloaderOut)

  return (
    <>
      <div inert={!isPreloaderOut}>
        <h1 className="sr-only">Xbox Series X</h1>
        <main>
          <Scene />
          <Gallery />
          <StepSlides />
        </main>
        <ScrollIndicator />
        <Header />
        <Footer />
      </div>
      <Noise />
      <Loader />
    </>
  )
}

export { Experience }
