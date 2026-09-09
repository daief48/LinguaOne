import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { tint as getTint } from '../../data/tints'
import { Icon } from './Icon'
import { ProgressBar, CircularProgress } from './Progress'

/** Horizontal skill row with a progress bar. */
export function SkillCard({ label, icon, tint = 'violet', progress = 0, meta, onClick, to, className = '' }) {
  const t = getTint(tint)
  const inner = (
    <>
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white ${t.grad} ${t.glow}`}
      >
        <Icon name={icon} size={19} strokeWidth={2.3} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="title-md truncate">{label}</span>
          <span className="font-display text-[13px] font-extrabold text-ink-900">{progress}%</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <ProgressBar value={progress} tint={tint} height={6} className="flex-1" />
          {meta && <span className="shrink-0 text-[11px] font-semibold text-ink-400">{meta}</span>}
        </div>
      </div>
      <ChevronRight size={17} className="shrink-0 text-ink-300" strokeWidth={2.4} />
    </>
  )
  const cls = `tap-card surface flex w-full items-center gap-3 p-3.5 ${className}`
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}

/** Compact square tile with a ring — used in grids. */
export function SkillTile({ label, icon, tint = 'violet', value, sublabel, onClick, className = '' }) {
  const t = getTint(tint)
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tap-card surface flex flex-col items-center gap-2 p-3.5 ${className}`}
    >
      <CircularProgress value={value} size={62} stroke={6} tint={tint} label={`${value}%`} />
      <div className="text-center">
        <div className="flex items-center justify-center gap-1.5">
          <Icon name={icon} size={13} className={t.text} strokeWidth={2.5} />
          <span className="text-[12.5px] font-bold text-ink-800">{label}</span>
        </div>
        {sublabel && <div className="mt-0.5 text-[11px] text-ink-400">{sublabel}</div>}
      </div>
    </button>
  )
}

/** Big colourful action tile — Quick Practice grid on Home. */
export function ActionTile({ label, icon, tint = 'violet', meta, to, onClick, className = '', style }) {
  const t = getTint(tint)
  const content = (
    <>
      <span
        className={`grid h-10 w-10 place-items-center rounded-xl2 bg-gradient-to-br text-white ${t.grad} ${t.glow}`}
      >
        <Icon name={icon} size={18} strokeWidth={2.3} />
      </span>
      <div className="mt-2.5 min-w-0">
        <div className="truncate text-[13.5px] font-bold text-ink-900">{label}</div>
        {meta && <div className="mt-0.5 text-[11.5px] font-medium text-ink-400">{meta}</div>}
      </div>
      <span
        className={`pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br opacity-[0.13] blur-lg ${t.grad}`}
      />
    </>
  )
  const cls = `tap-card surface relative flex flex-col p-3.5 ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} style={style}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} style={style}>
      {content}
    </button>
  )
}

export default SkillCard
