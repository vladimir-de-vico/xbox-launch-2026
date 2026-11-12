'use client'

import {
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
  type Selection,
} from 'react-aria-components'
import { BurgerButton } from '@/components/molecules/BurgerButton.tsx'
import { steps } from '@/data/steps.ts'
import { useExperience } from '@/store/experience.ts'

const NavigationMenu = () => {
  const step = useExperience((s) => s.step)
  const isMenuOpen = useExperience((s) => s.isMenuOpen)
  const setMenuOpen = useExperience((s) => s.setMenuOpen)
  const goTo = useExperience((s) => s.goTo)

  const onSelectionChange = (keys: Selection) => {
    if (keys !== 'all' && keys.size > 0) {
      goTo(Number([...keys][0]))
    }
  }

  return (
    <MenuTrigger isOpen={isMenuOpen} onOpenChange={setMenuOpen}>
      <BurgerButton />
      <Popover
        className="z-nav w-[228px] rounded-[18px] bg-dark-secondary p-2.5 font-text text-sm outline-none transition-opacity duration-400 ease-out data-entering:opacity-0 data-exiting:opacity-0 data-exiting:duration-200 motion-reduce:duration-0"
        offset={30}
        placement="bottom end"
      >
        <Menu
          aria-label="Sezioni"
          className="flex flex-col gap-1 outline-none"
          disallowEmptySelection={true}
          onSelectionChange={onSelectionChange}
          selectedKeys={[String(step)]}
          selectionMode="single"
        >
          {steps.map(({ id, menuLabel }) => (
            <MenuItem
              className="flex cursor-pointer items-center rounded-[9px] px-2.5 py-[5px] text-pure-white outline-none data-focused:bg-dark-primary data-selected:text-green data-focused:text-green"
              id={String(id)}
              key={id}
              textValue={menuLabel}
            >
              <span aria-hidden="true" className="mr-5 text-green text-xs">
                {id + 1}
              </span>
              {menuLabel}
            </MenuItem>
          ))}
        </Menu>
      </Popover>
    </MenuTrigger>
  )
}

export { NavigationMenu }
