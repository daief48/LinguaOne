import { useId } from 'react'
import { tint as getTint } from '../../data/tints'
import { useMounted } from '../../hooks/useAnimations'

export function ProgressBar({
  value = 0,
  tint = 'violet',
  height = 8,
  className = '',
  trackClass = 'bg-ink-100',
  animate = true,
  striped = false,
}) {
  const ready = useMounted(120)
  const t = getTint(tint)
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div
      className={`w-full overflow-hidden rounded-full ${trackClass} ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full bg-gradient-to-r ${t.grad} ${
          striped ? 'bg-size-200 animate-gradient-pan' : ''
        } transition-[width] duration-[900ms] ease-out`}
        style={{ width: `${animate ? (ready ? pct : 0) : pct}%` }}
      />
    </div>
  )
}

export function CircularProgress({
  value = 0,
  size = 84,
  stroke = 8,
  tint = 'violet',
  label,
  sublabel,
  className = '',
  trackColor = '#EDEFF5',
  children,
  animate = true,
}) {
  const id = useId().replace(/:/g, '')
  const ready = useMounted(140)
  const t = getTint(tint)
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = Math.max(0, Math.min(100, value))
  const shown = animate ? (ready ? pct : 0) : pct

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`cp-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={t.stroke} />
            <stop offset="100%" stopColor={t.stroke2} />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#cp-${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (shown / 100) * c}
          style={{ transition: 'stroke-dashoffset 1000ms cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        {children || (
          <div className="text-center leading-none">
            <div className="font-display font-extrabold text-ink-900" style={{ fontSize: size * 0.26 }}>
              {label ?? `${Math.round(pct)}%`}
            </div>
            {sublabel && (
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-ink-400">
                {sublabel}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/** Step dots / segmented bar for multi-step flows. */
export function StepProgress({ total, current, className = '', tint = 'violet' }) {
  const t = getTint(tint)
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            i < current ? `flex-1 bg-gradient-to-r ${t.grad}` : i === current ? 'flex-[1.6] bg-ink-300' : 'flex-1 bg-ink-100'
          }`}
        />
      ))}
    </div>
  )
}

/** Compact labelled skill row: label, value, bar. */
export function SkillBar({ label, value, tint = 'violet', delta, icon, className = '' }) {
  const t = getTint(tint)
  const IconCmp = icon
  return (
    <div className={className}>
      <div className="mb-1.5 flex items-center gap-2">
        {IconCmp && (
          <span className={`grid h-6 w-6 place-items-center rounded-lg ${t.soft} ${t.text}`}>
            <IconCmp size={13} strokeWidth={2.5} />
          </span>
        )}
        <span className="text-[13px] font-semibold text-ink-700">{label}</span>
        <span className="ml-auto flex items-baseline gap-1.5">
          {typeof delta === 'number' && delta > 0 && (
            <span className="text-[11px] font-bold text-emerald-500">+{delta}</span>
          )}
          <span className="font-display text-[13px] font-extrabold text-ink-900">{value}%</span>
        </span>
      </div>
      <ProgressBar value={value} tint={tint} height={7} />
    </div>
  )
}

export default ProgressBar
