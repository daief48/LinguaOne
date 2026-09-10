import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Flame, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { AITeacher } from '../components/ai/AITeacher'
import { Button } from '../components/ui/Button'
import { ProgressBar, CircularProgress } from '../components/ui/Progress'
import { onboardingSlides } from '../data/mock'
import { BRAND } from '../data/brand'

/* ----------------------------- Slide visuals ---------------------------- */

function ConversationVisual() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute left-3 top-6 animate-slide-up rounded-2xl rounded-bl-md border border-ink-100 bg-white px-3 py-2 shadow-card">
        <p className="text-[12px] font-semibold text-ink-700">Tell me about yourself.</p>
      </div>
      <div
        className="absolute right-3 top-[42%] animate-slide-up rounded-2xl rounded-br-md bg-gradient-to-br from-violet-600 to-indigo-600 px-3 py-2 shadow-glow"
        style={{ animationDelay: '180ms' }}
      >
        <p className="text-[12px] font-semibold text-white">I’m a web developer…</p>
      </div>
      <div
        className="absolute bottom-5 left-6 animate-slide-up rounded-2xl rounded-bl-md border border-ink-100 bg-white px-3 py-2 shadow-card"
        style={{ animationDelay: '340ms' }}
      >
        <p className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600">
          <Check size={13} strokeWidth={3} />
          Great answer!
        </p>
      </div>
      <AITeacher size={104} state="speaking" ring className="animate-float" />
    </div>
  )
}

function CorrectionVisual() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[250px] animate-scale-in overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-float">
        <div className="flex items-center gap-1.5 border-b border-ink-100 bg-gradient-to-r from-violet-50 to-cyan-50/50 px-3 py-2">
          <span className="grid h-6 w-6 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
            <Sparkles size={12} strokeWidth={2.6} />
          </span>
          <span className="text-[11.5px] font-extrabold text-ink-800">Instant feedback</span>
          <span className="ml-auto rounded-full bg-amber-50 px-1.5 py-0.5 text-[9.5px] font-extrabold text-amber-600">
            +10 XP
          </span>
        </div>
        <div className="space-y-2 p-3">
          <div className="rounded-xl bg-ink-50 p-2.5">
            <p className="text-[12px] font-semibold text-ink-500">
              I have three{' '}
              <mark className="rounded bg-rose-100 px-1 text-rose-600 line-through decoration-2">years experience</mark>
            </p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-2.5">
            <p className="text-[12px] font-semibold text-ink-800">
              I have three <mark className="rounded bg-emerald-100 px-1 text-emerald-700">years of experience</mark>
            </p>
          </div>
          <p className="px-0.5 text-[11px] font-medium text-ink-400">
            Use “of experience” after a number.
          </p>
        </div>
      </div>
    </div>
  )
}

function ProgressVisual() {
  const bars = [52, 68, 40, 78, 58, 88, 72]
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[255px] animate-scale-in space-y-2.5">
        <div className="flex gap-2.5">
          <div className="flex-1 rounded-2xl border border-ink-100 bg-white p-3 shadow-card">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-400">
              <Flame size={12} className="text-orange-500" strokeWidth={2.6} />
              Streak
            </div>
            <div className="mt-1 font-display text-[22px] font-extrabold leading-none text-ink-900">7</div>
          </div>
          <div className="flex-1 rounded-2xl border border-ink-100 bg-white p-3 shadow-card">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-ink-400">
              <Zap size={12} className="text-amber-500" strokeWidth={2.6} />
              XP
            </div>
            <div className="mt-1 font-display text-[22px] font-extrabold leading-none text-ink-900">2,480</div>
          </div>
          <div className="grid place-items-center rounded-2xl border border-ink-100 bg-white p-2 shadow-card">
            <CircularProgress value={72} size={46} stroke={5} tint="violet" label="72%" />
          </div>
        </div>

        <div className="rounded-2xl border border-ink-100 bg-white p-3.5 shadow-card">
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[12px] font-bold text-ink-800">This week</span>
            <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
              <TrendingUp size={12} strokeWidth={2.8} />
              +18%
            </span>
          </div>
          <div className="flex h-14 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className={`flex-1 origin-bottom animate-bar-rise rounded-t-md ${
                  i === 6 ? 'bg-gradient-to-t from-violet-600 to-cyan-400' : 'bg-ink-100'
                }`}
                style={{ height: `${h}%`, animationDelay: `${i * 70}ms` }}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-ink-100 bg-white p-3.5 shadow-card">
          {[
            { l: 'Speaking', v: 62, t: 'violet' },
            { l: 'Listening', v: 71, t: 'cyan' },
          ].map((s) => (
            <div key={s.l}>
              <div className="mb-1 flex justify-between text-[11.5px] font-bold text-ink-600">
                <span>{s.l}</span>
                <span className="text-ink-900">{s.v}%</span>
              </div>
              <ProgressBar value={s.v} tint={s.t} height={6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const visuals = {
  conversation: ConversationVisual,
  correction: CorrectionVisual,
  progress: ProgressVisual,
}

/* -------------------------------- Screen -------------------------------- */

export default function Onboarding() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const touchX = useRef(null)
  const slide = onboardingSlides[index]
  const Visual = visuals[slide.visual]
  const isLast = index === onboardingSlides.length - 1

  const next = () => (isLast ? navigate('/language') : setIndex((i) => i + 1))

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    if (touchX.current === null) return
    const dx = e.changedTouches[0].clientX - touchX.current
    if (dx < -45 && !isLast) setIndex((i) => i + 1)
    if (dx > 45 && index > 0) setIndex((i) => i - 1)
    touchX.current = null
  }

  return (
    <div
      className="flex flex-1 flex-col"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-glow">
            <Sparkles size={16} strokeWidth={2.5} />
          </span>
          <span className="font-display text-[14.5px] font-extrabold text-ink-900">{BRAND.name}</span>
        </div>
        <button
          type="button"
          onClick={() => navigate('/language')}
          className="press focus-ring rounded-lg px-2 py-1 text-[13px] font-bold text-ink-400 hover:text-ink-700"
        >
          Skip
        </button>
      </div>

      {/* visual stage */}
      <div className="mt-4 px-5">
        <div className="relative h-[290px] overflow-hidden rounded-[32px] border border-ink-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50 shadow-soft">
          <div className="absolute inset-0 opacity-60 grid-dots" />
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-200/40 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-violet-200/40 blur-2xl" />
          <div key={slide.id} className="relative h-full animate-fade-in">
            <Visual />
          </div>
        </div>
      </div>

      {/* copy */}
      <div
        key={`copy-${slide.id}`}
        className="flex flex-1 flex-col justify-center px-7 py-8 text-center animate-slide-up"
      >
        <h1 className="title-xl text-balance">{slide.title}</h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[14.5px] leading-relaxed text-ink-500">{slide.desc}</p>
      </div>

      {/* dots + CTA */}
      <div className="px-5 pb-6 pt-5 safe-bottom">
        <div className="mb-5 flex items-center justify-center gap-2">
          {onboardingSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-7 bg-gradient-to-r from-violet-600 to-cyan-500'
                  : 'w-2 bg-ink-200 hover:bg-ink-300'
              }`}
            />
          ))}
        </div>

        <Button onClick={next} size="xl" iconRight={ArrowRight}>
          {isLast ? 'Get Started' : 'Continue'}
        </Button>

        <button
          type="button"
          onClick={() => navigate('/login')}
          className="press focus-ring mt-3.5 w-full rounded-xl py-2 text-[13.5px] font-semibold text-ink-500 hover:text-ink-800"
        >
          Already have an account? <span className="font-bold text-violet-600">Log in</span>
        </button>
      </div>
    </div>
  )
}
