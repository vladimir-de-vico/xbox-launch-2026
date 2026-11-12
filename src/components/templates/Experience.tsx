'use client'

import { useEffect } from 'react'
import { Noise } from '@/components/atoms/Noise.tsx'
import { Footer } from '@/components/organisms/Footer.tsx'
import { Header } from '@/components/organisms/Header.tsx'
import { Loader } from '@/components/organisms/Loader.tsx'
import { ScrollIndicator } from '@/components/organisms/ScrollIndicator.tsx'
import { useAmbientAudio } from '@/hooks/useAmbientAudio.ts'
import { useExperience } from '@/store/experience.ts'

const Experience = () => {
  useAmbientAudio()
  const isPreloaderOut = useExperience((s) => s.isPreloaderOut)

  // ponytail: placeholder until the 3D scene reports readiness
  useEffect(() => useExperience.getState().setSceneReady(), [])

  return (
    <>
      <div inert={!isPreloaderOut}>
        <h1 className="sr-only">Xbox Series X</h1>
        <main />
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
