import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { tint as getTint } from '../../data/tints'
import { Icon } from './Icon'

/** Base surface. Becomes a link/button automatically when given `to`/`onClick`. */
export function Card({ children, className = '', to, onClick, padded = true, interactive, ...rest }) {
  const cls = [
    'surface relative overflow-hidden',
    padded ? 'p-4' : '',
    to || onClick || interactive ? 'tap-card block w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls} {...rest}>
        {children}
      </button>
    )
  }
  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  )
}

/** Section title with an optional action on the right. */
export function SectionHeader({ title, subtitle, action, actionTo, onAction, icon: IconCmp, className = '' }) {
  return (
    <div className={`mb-3 flex items-end justify-between gap-3 ${className}`}>
      <div className="min-w-0">
        <h2 className="title-md flex items-center gap-2">
          {IconCmp && <IconCmp size={17} className="text-violet-500" strokeWidth={2.3} />}
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-[12.5px] text-ink-400">{subtitle}</p>}
      </div>
      {action &&
        (actionTo ? (
          <Link
            to={actionTo}
            className="press focus-ring flex shrink-0 items-center gap-0.5 rounded-lg text-[12.5px] font-bold text-violet-600 hover:text-violet-700"
          >
            {action}
            <ChevronRight size={14} strokeWidth={2.6} />
          </Link>
        ) : (
          <button
            type="button"
            onClick={onAction}
            className="press focus-ring flex shrink-0 items-center gap-0.5 rounded-lg text-[12.5px] font-bold text-violet-600 hover:text-violet-700"
          >
            {action}
            <ChevronRight size={14} strokeWidth={2.6} />
          </button>
        ))}
    </div>
  )
}

/** Gradient-filled rounded icon tile used across cards. */
export function IconTile({ icon, name, tint = 'violet', size = 44, radius = 'rounded-2xl', className = '' }) {
  const t = getTint(tint)
  const IconCmp = icon
  return (
    <div
      className={`grid shrink-0 place-items-center bg-gradient-to-br text-white ${t.grad} ${radius} ${t.glow} ${className}`}
      style={{ width: size, height: size }}
    >
      {IconCmp ? (
        <IconCmp size={size * 0.45} strokeWidth={2.2} />
      ) : (
        <Icon name={name} size={size * 0.45} strokeWidth={2.2} />
      )}
    </div>
  )
}

/** Small soft-tinted icon tile (lighter alternative to IconTile). */
export function SoftIconTile({ name, icon, tint = 'violet', size = 38, className = '' }) {
  const t = getTint(tint)
  const IconCmp = icon
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-xl2 ${t.soft} ${t.text} ${className}`}
      style={{ width: size, height: size }}
    >
      {IconCmp ? (
        <IconCmp size={size * 0.46} strokeWidth={2.3} />
      ) : (
        <Icon name={name} size={size * 0.46} strokeWidth={2.3} />
      )}
    </div>
  )
}

export function StatTile({ label, value, name, icon, tint = 'violet', className = '' }) {
  const t = getTint(tint)
  return (
    <div className={`surface flex flex-col gap-2 p-3.5 ${className}`}>
      <div className={`grid h-8 w-8 place-items-center rounded-xl ${t.soft} ${t.text}`}>
        <Icon name={name} icon={icon} size={16} strokeWidth={2.4} />
      </div>
      <div>
        <div className="font-display text-[19px] font-extrabold leading-none text-ink-900">{value}</div>
        <div className="mt-1 text-[11.5px] font-medium text-ink-400">{label}</div>
      </div>
    </div>
  )
}

export function Chip({ children, tint = 'violet', className = '', soft = true, icon: IconCmp }) {
  const t = getTint(tint)
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-bold ${
        soft ? `${t.soft} ${t.text}` : `bg-gradient-to-r text-white ${t.grad}`
      } ${className}`}
    >
      {IconCmp && <IconCmp size={12} strokeWidth={2.6} />}
      {children}
    </span>
  )
}

export function Divider({ className = '' }) {
  return <div className={`h-px w-full bg-ink-100 ${className}`} />
}

/** Skeleton block for simulated loading states. */
export function Skeleton({ className = '' }) {
  return <div className={`skeleton ${className}`} />
}

export default Card
