import { create } from 'zustand'
import { steps } from '@/data/steps.ts'
import { stepDuration } from '@/lib/motion.ts'

interface ExperienceState {
  isSceneReady: boolean
  isPreloaderOut: boolean
  step: number
  isAnimating: boolean
  isMenuOpen: boolean
  isAudioOn: boolean
  setSceneReady: () => void
  enter: (withAudio: boolean) => void
  goTo: (index: number) => void
  next: () => void
  prev: () => void
  setMenuOpen: (isOpen: boolean) => void
  setAudioOn: (isOn: boolean) => void
}

const MS_PER_SECOND = 1000

let unlockTimer: ReturnType<typeof setTimeout> | undefined

const useExperience = create<ExperienceState>()((set, get) => ({
  isSceneReady: false,
  isPreloaderOut: false,
  step: -1,
  isAnimating: false,
  isMenuOpen: false,
  isAudioOn: false,
  setSceneReady: () => set({ isSceneReady: true }),
  enter: (withAudio) =>
    set({ isPreloaderOut: true, isAudioOn: withAudio, step: 0 }),
  goTo: (index) => {
    const { step, isAnimating, isPreloaderOut } = get()
    if (
      !isPreloaderOut ||
      isAnimating ||
      index === step ||
      index < 0 ||
      index >= steps.length
    ) {
      return
    }
    set({ step: index, isAnimating: true })
    clearTimeout(unlockTimer)
    unlockTimer = setTimeout(
      () => set({ isAnimating: false }),
      stepDuration() * MS_PER_SECOND
    )
  },
  next: () => get().goTo(get().step + 1),
  prev: () => get().goTo(get().step - 1),
  setMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  setAudioOn: (isAudioOn) => set({ isAudioOn }),
}))

export { useExperience }
