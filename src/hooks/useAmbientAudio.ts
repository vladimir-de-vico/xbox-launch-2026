'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap.ts'
import { useExperience } from '@/store/experience.ts'

const SRC = '/audio/ambient.mp3'
const MAX_VOLUME = 0.5
const START_RATE = 0.5

const useAmbientAudio = () => {
  const isAudioOn = useExperience((s) => s.isAudioOn)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!isAudioOn) {
      return
    }
    audioRef.current ??= Object.assign(new Audio(SRC), {
      loop: true,
      volume: 0,
      preservesPitch: false,
    })
    const audio = audioRef.current

    const fadeIn = () => {
      gsap.killTweensOf(audio)
      audio.play().catch(() => useExperience.getState().setAudioOn(false))
      gsap.fromTo(
        audio,
        { playbackRate: START_RATE },
        {
          volume: MAX_VOLUME,
          playbackRate: 1,
          duration: 1.6,
          ease: 'power2.in',
        }
      )
    }
    const fadeOut = () => {
      gsap.killTweensOf(audio)
      gsap.to(audio, {
        volume: 0,
        duration: 1.2,
        ease: 'power1.out',
        onComplete: () => audio.pause(),
      })
    }

    fadeIn()
    globalThis.addEventListener('blur', fadeOut)
    globalThis.addEventListener('focus', fadeIn)
    return () => {
      globalThis.removeEventListener('blur', fadeOut)
      globalThis.removeEventListener('focus', fadeIn)
      fadeOut()
    }
  }, [isAudioOn])
}

export { useAmbientAudio }
