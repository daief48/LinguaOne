import { Link } from 'react-router-dom'
import { Check, Clock, Lock, Play, Zap } from 'lucide-react'
import { tint as getTint } from '../../data/tints'
import { ProgressBar } from './Progress'

/**
 * A node on the course path.
 * status: 'done' | 'current' | 'locked'
 */
export function LessonCard({
  title,
  minutes,
  xp,
  status = 'locked',
  progress,
  index,
  isLast = false,
  tint = 'violet',
  to,
  onClick,
  className = '',
}) {
  const t = getTint(tint)
  const done = status === 'done'
  const current = status === 'current'
  const locked = status === 'locked'

  const node = done ? (
    <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-white ${t.grad}`}>
      <Check size={18} strokeWidth={3} />
    </span>
  ) : current ? (
    <span className="relative grid h-10 w-10 place-items-center">
      <span className="absolute inset-0 animate-ring-ping rounded-full bg-violet-400/50" />
      <span
        className={`relative grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br text-white ${t.grad} ${t.glow}`}
      >
        <Play size={16} className="ml-0.5 fill-white" strokeWidth={2} />
      </span>
    </span>
  ) : (
    <span className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-ink-50 text-ink-300">
      <Lock size={15} strokeWidth={2.5} />
    </span>
  )

  const body = (
    <div
      className={`flex-1 rounded-3xl border p-3.5 transition duration-300 ${
        current
          ? 'border-violet-200 bg-gradient-to-br from-violet-50/80 to-white shadow-card'
          : locked
            ? 'border-ink-100 bg-ink-50/60'
            : 'border-ink-100 bg-white shadow-soft hover:-translate-y-0.5 hover:shadow-card'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          {index != null && (
            <span className="eyebrow mb-1 block text-ink-300">Lesson {String(index).padStart(2, '0')}</span>
          )}
          <h3 className={`title-md truncate ${locked ? 'text-ink-400' : ''}`}>{title}</h3>
        </div>
        {current && (
          <span
            className={`shrink-0 rounded-full bg-gradient-to-r px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white ${t.grad}`}
          >
            Now
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3 text-[11.5px] font-semibold text-ink-400">
        <span className="inline-flex items-center gap-1">
          <Clock size={12} strokeWidth={2.5} />
          {minutes} min
        </span>
        {xp && (
          <span className="inline-flex items-center gap-1">
            <Zap size={12} strokeWidth={2.6} className="text-amber-400" />
            {xp} XP
          </span>
        )}
        {done && <span className="ml-auto font-bold text-emerald-500">Completed</span>}
      </div>

      {current && typeof progress === 'number' && (
        <div className="mt-2.5 flex items-center gap-2">
          <ProgressBar value={progress} tint={tint} height={6} className="flex-1" />
          <span className="text-[11px] font-extrabold text-ink-700">{progress}%</span>
        </div>
      )}
    </div>
  )

  const row = (
    <div className={`relative flex gap-3 ${className}`}>
      <div className="relative flex flex-col items-center">
        {node}
        {!isLast && (
          <span
            className={`mt-1 w-0.5 flex-1 rounded-full ${
              done ? `bg-gradient-to-b ${t.grad} opacity-60` : 'bg-ink-100'
            }`}
          />
        )}
      </div>
      {body}
    </div>
  )

  if (locked) return <div className="cursor-not-allowed opacity-90">{row}</div>
  if (to)
    return (
      <Link to={to} className="press block">
        {row}
      </Link>
    )
  return (
    <button type="button" onClick={onClick} className="press block w-full text-left">
      {row}
    </button>
  )
}

export default LessonCard
