'use client'

import { ToggleButton } from 'react-aria-components'
import { useExperience } from '@/store/experience.ts'

const word =
  'flex w-[23px] transition-transform duration-300 ease-out motion-reduce:duration-0'

const AudioToggle = () => {
  const isAudioOn = useExperience((s) => s.isAudioOn)
  const setAudioOn = useExperience((s) => s.setAudioOn)

  return (
    <ToggleButton
      aria-label="Audio"
      className="group pointer-events-auto flex h-11 min-w-11 cursor-pointer items-center justify-center rounded-md outline-none data-focus-visible:bg-dark-secondary"
      isSelected={isAudioOn}
      onChange={setAudioOn}
    >
      <span
        aria-hidden="true"
        className="mr-[15px] flex items-center font-[acumin-pro,sans-serif] text-[10px] text-pure-white/50 uppercase"
      >
        audio
        <span className="relative ml-1 inline-flex w-[23px] flex-col overflow-hidden">
          <span
            className={`${word} translate-y-[15px] group-data-selected:translate-y-0`}
          >
            on
          </span>
          <span
            className={`${word} absolute left-0 group-data-selected:-translate-y-[15px]`}
          >
            off
          </span>
        </span>
      </span>
    </ToggleButton>
  )
}

export { AudioToggle }
