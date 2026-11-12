import { Button } from 'react-aria-components'

const dot =
  'block size-1 rounded-full bg-green transition-all ease-cubic motion-reduce:duration-0'

const BurgerButton = () => (
  <Button
    aria-label="Menu"
    className="group pointer-events-auto flex size-11 cursor-pointer select-none items-center justify-center rounded-full border border-green/40 bg-dark-secondary outline-none data-focus-visible:outline-1 data-focus-visible:outline-green data-pressed:bg-dark-primary aria-expanded:bg-dark-primary"
  >
    <span className="flex items-center justify-center">
      <span
        className={`${dot} rotate-45 duration-100 group-aria-expanded:h-0.5 group-aria-expanded:w-5 group-aria-expanded:translate-x-2 group-aria-expanded:rounded-none group-aria-expanded:delay-100 group-aria-expanded:duration-400`}
      />
      <span
        className={`${dot} mx-1 duration-200 group-aria-expanded:-mx-1 group-aria-expanded:opacity-0`}
      />
      <span
        className={`${dot} -rotate-45 duration-100 group-aria-expanded:h-0.5 group-aria-expanded:w-5 group-aria-expanded:-translate-x-2 group-aria-expanded:rounded-none group-aria-expanded:delay-100 group-aria-expanded:duration-400`}
      />
    </span>
  </Button>
)

export { BurgerButton }
