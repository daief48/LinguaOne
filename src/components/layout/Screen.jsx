/**
 * Page body wrapper — consistent padding, entrance animation and
 * enough bottom room to clear the floating navigation.
 */
export function Screen({ children, className = '', padded = true, navPad = true, animate = true }) {
  return (
    <div
      className={`flex-1 ${padded ? 'px-4' : ''} ${navPad ? 'pb-28' : 'pb-8'} ${
        animate ? 'animate-page-in' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

/** Vertical rhythm helper. */
export function Stack({ children, gap = 4, className = '' }) {
  const gaps = { 2: 'space-y-2', 3: 'space-y-3', 4: 'space-y-4', 5: 'space-y-5', 6: 'space-y-6' }
  return <div className={`${gaps[gap] || 'space-y-4'} ${className}`}>{children}</div>
}

/** Full-height flow screen (onboarding steps): content + pinned footer. */
export function FlowScreen({ children, footer, className = '', padded = true }) {
  return (
    <div className={`flex min-h-full flex-col ${className}`}>
      <div className={`flex-1 ${padded ? 'px-5' : ''} animate-page-in`}>{children}</div>
      {footer && (
        <div className="sticky bottom-0 mt-6 bg-gradient-to-t from-white via-white/95 to-transparent px-5 pb-5 pt-4 safe-bottom">
          {footer}
        </div>
      )}
    </div>
  )
}

export default Screen
