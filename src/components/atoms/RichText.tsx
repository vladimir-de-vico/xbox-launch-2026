interface RichTextProps {
  text: string
}

/** Renders `*word*` segments as emphasis. */
const RichText = ({ text }: RichTextProps) =>
  text.split('*').map((part, i) => (i % 2 ? <em key={part}>{part}</em> : part))

export { RichText }
