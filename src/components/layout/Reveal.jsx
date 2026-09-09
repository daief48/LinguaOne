/**
 * Marks a block to fade + lift the first time it scrolls into view.
 *
 * The observer itself lives in <AppShell> and watches every `.reveal` inside
 * the scroll container, so this component is just markup — one observer for
 * the whole screen rather than one per section.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal
