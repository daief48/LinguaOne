import { Crown, Flame, Lock, Sparkles, Zap } from 'lucide-react'
import { tint as getTint } from '../../data/tints'

const levelTints = {
  A1: 'green',
  A2: 'mint',
  B1: 'violet',
  B2: 'indigo',
  C1: 'pink',
  C2: 'amber',
}

/** CEFR level chip — B1, C2, … */
export function LevelBadge({ level = 'B1', name, size = 'md', className = '', solid = true }) {
  const t = getTint(levelTints[level] || 'violet')
  const sizes = {
    sm: 'h-6 px-2 text-[11px] gap-1',
    md: 'h-7 px-2.5 text-[12px] gap-1.5',
    lg: 'h-9 px-3.5 text-[14px] gap-2',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full font-display font-extrabold ${sizes[size]} ${
        solid ? `bg-gradient-to-r text-white ${t.grad}` : `${t.soft} ${t.text}`
      } ${className}`}
    >
      {level}
      {name && <span className="font-bold opacity-90">{name}</span>}
    </span>
  )
}

export function PremiumBadge({ className = '', label = 'PREMIUM', size = 'md' }) {
  const sizes = {
    sm: 'h-5 px-1.5 text-[9.5px] gap-0.5',
    md: 'h-6 px-2 text-[10.5px] gap-1',
  }
  return (
    <span
      className={`inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 font-display font-extrabold uppercase tracking-wider text-white shadow-[0_4px_12px_-4px_rgba(249,115,22,0.8)] ${sizes[size]} ${className}`}
    >
      <Crown size={size === 'sm' ? 9 : 11} strokeWidth={2.6} />
      {label}
    </span>
  )
}

export function XPBadge({ amount, className = '', size = 'md' }) {
  const sizes = { sm: 'h-5 px-1.5 text-[10px]', md: 'h-6 px-2 text-[11.5px]' }
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-full bg-amber-50 font-display font-extrabold text-amber-600 ${sizes[size]} ${className}`}
    >
      <Zap size={size === 'sm' ? 10 : 12} strokeWidth={2.8} className="fill-amber-400 text-amber-500" />+{amount} XP
    </span>
  )
}

export function StreakBadge({ days, className = '' }) {
  return (
    <span
      className={`inline-flex h-7 items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 px-2.5 font-display text-[12px] font-extrabold text-white shadow-[0_6px_16px_-6px_rgba(249,115,22,0.8)] ${className}`}
    >
      <Flame size={12} strokeWidth={2.6} className="fill-white/30" />
      {days}
    </span>
  )
}

export function AIBadge({ label = 'AI', className = '' }) {
  return (
    <span
      className={`inline-flex h-[22px] items-center gap-1 rounded-full bg-violet-50 px-2 text-[10.5px] font-extrabold uppercase tracking-wider text-violet-600 ${className}`}
    >
      <Sparkles size={11} strokeWidth={2.6} />
      {label}
    </span>
  )
}

export function LockBadge({ className = '' }) {
  return (
    <span className={`grid h-7 w-7 place-items-center rounded-full bg-ink-100 text-ink-400 ${className}`}>
      <Lock size={13} strokeWidth={2.5} />
    </span>
  )
}

export default LevelBadge
