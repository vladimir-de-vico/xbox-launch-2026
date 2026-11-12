import { Link } from 'react-aria-components'
import { Logo } from '@/components/atoms/Logo.tsx'
import { Wordmark } from '@/components/atoms/Wordmark.tsx'

const Brand = () => (
  <Link
    aria-label="Xbox, home"
    className="pointer-events-auto flex items-center rounded-[22px] pr-[30px] outline-none transition-colors duration-100 ease-cubic data-focus-visible:bg-dark-secondary data-hovered:bg-dark-secondary"
    href="/"
  >
    <span className="flex items-center justify-center rounded-full bg-pure-black p-0.5">
      <Logo className="text-green" />
    </span>
    <Wordmark className="ml-[15px]" />
  </Link>
)

export { Brand }
