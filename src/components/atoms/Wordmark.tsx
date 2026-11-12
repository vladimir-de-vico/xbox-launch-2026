interface WordmarkProps {
  className?: string
}

const Wordmark = ({ className = '' }: WordmarkProps) => (
  <span className={`font-x360 text-2xl ${className}`}>XBOX</span>
)

export { Wordmark }
