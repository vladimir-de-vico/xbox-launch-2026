import { Button } from 'react-aria-components'
import { Logo } from '@/components/atoms/Logo.tsx'

interface MainCtaProps {
  label: string
  className?: string
  isFocusable?: boolean
}

const transition =
  'transition-all duration-800 ease-cubic group-data-focus-visible:duration-400 motion-reduce:duration-0'

/** Demo CTA: intentionally has no action. */
const MainCta = ({
  label,
  className = '',
  isFocusable = true,
}: MainCtaProps) => (
  <Button
    className={`group pointer-events-auto relative z-1 flex h-11 min-w-[174px] cursor-pointer select-none items-center justify-center overflow-hidden rounded-[22px] bg-dark-secondary outline-none ${className}`}
    excludeFromTabOrder={!isFocusable}
  >
    <span
      className={`absolute left-0 z-2 flex size-full items-center justify-start overflow-hidden rounded-[22px] bg-green group-data-focus-visible:translate-x-[calc(100%-44px)] group-data-hovered:translate-x-[calc(100%-44px)] ${transition}`}
    >
      <span
        className={`z-2 rounded-[22px] bg-green p-0.5 group-data-focus-visible:scale-[1.02] group-data-hovered:scale-[1.02] group-data-focus-visible:bg-pure-black group-data-hovered:bg-pure-black ${transition}`}
      >
        <Logo
          className={`block size-10 -rotate-360 text-pure-black group-data-focus-visible:rotate-0 group-data-hovered:rotate-0 group-data-focus-visible:text-green group-data-hovered:text-green ${transition}`}
        />
      </span>
      <span
        className={`z-1 ml-3.5 text-pure-black group-data-focus-visible:-translate-x-[360px] group-data-hovered:-translate-x-[360px] ${transition}`}
      >
        {label}
      </span>
    </span>
    <span
      aria-hidden="true"
      className={`ml-3.5 translate-x-[360px] text-green group-data-focus-visible:-translate-x-3.5 group-data-hovered:-translate-x-3.5 ${transition}`}
    >
      {label}
    </span>
  </Button>
)

export { MainCta }
