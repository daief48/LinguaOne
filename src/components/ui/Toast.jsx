import { CheckCircle2, Info, Sparkles, Zap } from 'lucide-react'
import { useApp } from '../../context/appContext'

const variants = {
  default: { icon: Info, tile: 'bg-ink-100 text-ink-600' },
  success: { icon: CheckCircle2, tile: 'bg-emerald-50 text-emerald-600' },
  xp: { icon: Zap, tile: 'bg-amber-50 text-amber-600' },
  ai: { icon: Sparkles, tile: 'bg-violet-50 text-violet-600' },
}

export function Toast({ message, variant = 'default', onClick }) {
  const v = variants[variant] || variants.default
  const IconCmp = v.icon
  return (
    <div
      onClick={onClick}
      className="pointer-events-auto flex w-full max-w-[330px] items-center gap-2.5 rounded-2xl border border-ink-100 bg-white/95 px-3 py-2.5 shadow-float backdrop-blur-xl animate-toast-in"
    >
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${v.tile}`}>
        <IconCmp size={16} strokeWidth={2.5} />
      </span>
      <p className="text-[13px] font-semibold leading-snug text-ink-800">{message}</p>
    </div>
  )
}

/** Stacked toast host — rendered once inside the phone frame. */
export function ToastHost() {
  const { toasts, dismissToast } = useApp()
  if (!toasts.length) return null
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[60] flex flex-col items-center gap-2 px-4 pt-3 safe-top">
      {toasts.map((t) => (
        <Toast key={t.id} message={t.message} variant={t.variant} onClick={() => dismissToast(t.id)} />
      ))}
    </div>
  )
}

export default Toast
