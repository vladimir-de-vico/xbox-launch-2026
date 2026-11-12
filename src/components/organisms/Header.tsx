import { Brand } from '@/components/molecules/Brand.tsx'
import { MainCta } from '@/components/molecules/MainCta.tsx'
import { NavigationMenu } from '@/components/organisms/NavigationMenu.tsx'

const Header = () => (
  <header className="pointer-events-none fixed top-0 left-0 z-header flex w-full justify-between px-(--gutter) py-[30px] text-pure-white">
    <Brand />
    <div className="flex">
      <MainCta className="mr-2.5 max-sm:hidden" label="Acquista" />
      <NavigationMenu />
    </div>
  </header>
)

export { Header }
