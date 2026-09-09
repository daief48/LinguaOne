import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const sizes = {
  sm: 'h-9 px-3.5 text-[13px] rounded-xl gap-1.5',
  md: 'h-11 px-4 text-[14px] rounded-xl2 gap-2',
  lg: 'h-[52px] px-5 text-[15px] rounded-2xl gap-2',
  xl: 'h-[56px] px-6 text-[16px] rounded-2xl gap-2.5',
}

const variants = {
  primary:
    'text-white bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-size-200 shadow-glow hover:brightness-[1.06]',
  accent:
    'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_10px_28px_-10px_rgba(14,165,233,0.7)] hover:brightness-[1.06]',
  gold: 'text-white bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 shadow-[0_10px_28px_-10px_rgba(249,115,22,0.7)] hover:brightness-[1.05]',
  dark: 'text-white bg-ink-900 hover:bg-ink-800 shadow-card',
  soft: 'text-violet-700 bg-violet-50 border border-violet-100 hover:bg-violet-100/70',
  neutral: 'text-ink-700 bg-white border border-ink-200 hover:border-ink-300 hover:bg-ink-50 shadow-soft',
  ghost: 'text-ink-600 hover:bg-ink-100/70',
  glass: 'text-white glass-dark hover:bg-white/20',
}

/** Gradient CTAs get a slow light sweep; flat ones don't. */
const SHINY = new Set(['primary', 'accent', 'gold'])

export function Button({
  children,
  variant = 'primary',
  size = 'lg',
  as,
  to,
  href,
  className = '',
  icon: LeftIcon,
  iconRight: RightIcon,
  loading = false,
  disabled = false,
  full = true,
  shine = true,
  ...rest
}) {
  const cls = [
    'press focus-ring relative inline-flex items-center justify-center font-display font-bold',
    'transition-[filter,background-color,border-color,box-shadow,transform] duration-200 select-none',
    sizes[size],
    variants[variant],
    shine && SHINY.has(variant) && !disabled && !loading ? 'shine-sweep' : '',
    full ? 'w-full' : '',
    disabled || loading ? 'pointer-events-none opacity-55' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const inner = (
    <>
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        LeftIcon && <LeftIcon size={size === 'sm' ? 15 : 18} strokeWidth={2.2} />
      )}
      <span className="truncate">{children}</span>
      {RightIcon && !loading && <RightIcon size={size === 'sm' ? 15 : 18} strokeWidth={2.2} />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  }
  const Tag = as || 'button'
  return (
    <Tag type={Tag === 'button' ? 'button' : undefined} className={cls} disabled={disabled} {...rest}>
      {inner}
    </Tag>
  )
}

export function IconButton({
  icon: IconCmp,
  label,
  onClick,
  to,
  variant = 'neutral',
  size = 40,
  className = '',
  ...rest
}) {
  const styles = {
    neutral: 'bg-white border border-ink-200 text-ink-600 hover:text-ink-900 hover:border-ink-300 shadow-soft',
    soft: 'bg-ink-100 text-ink-600 hover:bg-ink-200/70',
    glass: 'glass-dark text-white hover:bg-white/20',
    gradient: 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow',
  }
  const cls = [
    'press focus-ring grid place-items-center rounded-full transition duration-200 shrink-0',
    styles[variant],
    className,
  ].join(' ')
  const style = { width: size, height: size }

  if (to) {
    return (
      <Link to={to} aria-label={label} className={cls} style={style} {...rest}>
        <IconCmp size={size < 36 ? 16 : 19} strokeWidth={2.2} />
      </Link>
    )
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={cls} style={style} {...rest}>
      <IconCmp size={size < 36 ? 16 : 19} strokeWidth={2.2} />
    </button>
  )
}

export default Button
