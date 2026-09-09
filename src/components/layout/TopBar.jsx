import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

/**
 * Sticky screen header with a back affordance.
 * variant: 'light' (default) | 'dark' (sits on a gradient hero)
 */
export function TopBar({
  title,
  subtitle,
  onBack,
  backTo,
  right,
  variant = 'light',
  border = true,
  className = '',
  center = false,
}) {
  const navigate = useNavigate()
  const dark = variant === 'dark'

  const handleBack = () => {
    if (onBack) return onBack()
    if (backTo) return navigate(backTo)
    return navigate(-1)
  }

  return (
    <header
      className={`sticky top-0 z-30 flex items-center gap-3 px-4 py-3 ${
        dark
          ? 'bg-transparent'
          : `bg-white/85 backdrop-blur-xl ${border ? 'border-b border-ink-100' : ''}`
      } ${className}`}
    >
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className={`press focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full transition ${
          dark
            ? 'border border-white/25 bg-white/15 text-white backdrop-blur hover:bg-white/25'
            : 'border border-ink-200 bg-white text-ink-600 shadow-soft hover:text-ink-900'
        }`}
      >
        <ChevronLeft size={19} strokeWidth={2.5} />
      </button>

      <div className={`min-w-0 flex-1 ${center ? 'text-center' : ''}`}>
        {title && (
          <h1
            className={`truncate font-display text-[16px] font-extrabold leading-tight ${
              dark ? 'text-white' : 'text-ink-900'
            }`}
          >
            {title}
          </h1>
        )}
        {subtitle && (
          <p className={`truncate text-[12px] font-medium ${dark ? 'text-white/70' : 'text-ink-400'}`}>
            {subtitle}
          </p>
        )}
      </div>

      {right ? <div className="flex shrink-0 items-center gap-2">{right}</div> : <span className="w-10 shrink-0" />}
    </header>
  )
}

export default TopBar
