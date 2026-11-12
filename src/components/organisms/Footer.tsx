import { CurrentYear } from '@/components/atoms/CurrentYear.tsx'
import { AudioToggle } from '@/components/molecules/AudioToggle.tsx'
import { SocialLinks } from '@/components/molecules/SocialLinks.tsx'

const Footer = () => (
  <footer className="pointer-events-none fixed bottom-0 left-0 z-header flex w-full justify-between px-(--gutter) py-[25px] font-text text-xs max-sm:flex-col max-sm:items-start max-sm:justify-start">
    <p className="flex min-h-[34px] items-center text-pure-white/50">
      © Vladimir De Vico <CurrentYear /> - All rights reserved
    </p>
    <div className="pointer-events-auto flex items-center justify-end">
      <AudioToggle />
      <span className="mr-[5px] flex min-h-[34px] items-center text-pure-white/50">
        Segui Xbox
      </span>
      <SocialLinks />
    </div>
  </footer>
)

export { Footer }
