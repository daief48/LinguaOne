import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { AITeacher } from './AITeacher'

/**
 * "Your AI teacher noticed…" — the card that makes the product feel
 * like a coach rather than a chatbot.
 */
export function AIInsightCard({
  eyebrow = 'AI Recommendation',
  children,
  action,
  to,
  onAction,
  variant = 'light',
  state = 'idle',
  className = '',
}) {
  const dark = variant === 'dark'

  return (
    <div
      className={`relative overflow-hidden rounded-4xl p-4 ${
        dark
          ? 'mesh-hero text-white shadow-[0_20px_50px_-20px_rgba(109,40,217,0.85)]'
          : 'border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/60 shadow-soft'
      } ${className}`}
    >
      {!dark && (
        <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-violet-200/50 blur-2xl" />
      )}

      <div className="relative flex gap-3">
        <AITeacher size={46} state={state} halo={!dark} />
        <div className="min-w-0 flex-1">
          <div
            className={`mb-1 inline-flex items-center gap-1 text-[10.5px] font-extrabold uppercase tracking-[0.13em] ${
              dark ? 'text-white/75' : 'text-violet-500'
            }`}
          >
            <Sparkles size={11} strokeWidth={2.8} />
            {eyebrow}
          </div>
          <p
            className={`text-[13.5px] font-semibold leading-relaxed ${dark ? 'text-white/95' : 'text-ink-800'}`}
          >
            {children}
          </p>

          {action &&
            (to ? (
              <Link
                to={to}
                className={`press focus-ring mt-3 inline-flex h-10 items-center gap-1.5 rounded-xl2 px-4 text-[13px] font-bold transition ${
                  dark
                    ? 'bg-white text-violet-700 hover:bg-white/90'
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-glow hover:brightness-105'
                }`}
              >
                {action}
                <ArrowRight size={15} strokeWidth={2.6} />
              </Link>
            ) : (
              <button
                type="button"
                onClick={onAction}
                className={`press focus-ring mt-3 inline-flex h-10 items-center gap-1.5 rounded-xl2 px-4 text-[13px] font-bold transition ${
                  dark
                    ? 'bg-white text-violet-700 hover:bg-white/90'
                    : 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-glow hover:brightness-105'
                }`}
              >
                {action}
                <ArrowRight size={15} strokeWidth={2.6} />
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AIInsightCard
