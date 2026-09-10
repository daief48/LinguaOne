import { useNavigate } from 'react-router-dom'
import { ArrowRight, Calendar, Check, ChevronRight, GraduationCap, Lightbulb, Lock, Play, Target } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { CircularProgress, ProgressBar } from '../components/ui/Progress'
import { AITeacher } from '../components/ai/AITeacher'
import { StatusBar } from '../components/layout/StatusBar'
import { useApp } from '../context/appContext'
import { useCountUp } from '../hooks/useAnimations'
import { ielts } from '../data/mock'
import { tint as getTint } from '../data/tints'

const bandPct = (band) => (band / 9) * 100

export default function Ielts() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const band = useCountUp(ielts.estimatedBand, { duration: 1000, decimals: 1 })

  return (
    <div className="flex-1 pb-8">
      {/* hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-indigo-900 pb-16 text-white sm:pt-[42px]">
        <StatusBar dark className="absolute inset-x-0 top-0" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] grid-dots" />
        <div className="pointer-events-none absolute -right-12 -top-10 h-44 w-44 rounded-full bg-violet-400/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />

        <TopBar variant="dark" border={false} backTo="/practice" />

        <div className="relative px-5">
          <div className="flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <GraduationCap size={21} strokeWidth={2.3} />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-[24px] font-extrabold leading-tight tracking-[-0.025em]">
                IELTS Preparation
              </h1>
              <p className="mt-1 text-[13px] text-white/75">AI examiner, real band criteria, instant scoring.</p>
            </div>
          </div>

          {/* band summary */}
          <div className="mt-5 flex items-center gap-4 rounded-4xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
            <CircularProgress
              value={bandPct(ielts.estimatedBand)}
              size={92}
              stroke={9}
              tint="cyan"
              trackColor="rgba(255,255,255,0.2)"
            >
              <div className="text-center leading-none">
                <div className="font-display text-[24px] font-extrabold">{band.toFixed(1)}</div>
                <div className="mt-1 text-[9.5px] font-bold uppercase tracking-wider text-white/70">band</div>
              </div>
            </CircularProgress>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/60">
                Estimated band
              </p>
              <p className="mt-1 text-[13px] font-semibold leading-snug text-white/90">
                On track for band {ielts.targetBand.toFixed(1)} with 2 more weeks of speaking practice.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold">
                  <Target size={11} strokeWidth={2.8} />
                  Target {ielts.targetBand.toFixed(1)}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold">
                  <Calendar size={11} strokeWidth={2.8} />
                  {ielts.daysLeft} days left
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* skill bands */}
      <div className="relative z-10 -mt-11 px-4">
        <div className="surface p-4">
          <div className="mb-3.5 flex items-center justify-between">
            <h2 className="title-md">Band by skill</h2>
            <span className="text-[11.5px] font-semibold text-ink-400">Test date {ielts.testDate}</span>
          </div>

          <div className="space-y-3.5">
            {ielts.skills.map((s) => (
              <div key={s.key}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[13px] font-bold text-ink-700">{s.label}</span>
                  <span className="font-display text-[13.5px] font-extrabold text-ink-900">
                    {s.band.toFixed(1)}
                  </span>
                </div>
                <ProgressBar value={bandPct(s.band)} tint={s.tint} height={7} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI examiner */}
      <div className="reveal mt-4 px-4">
        <div className="relative overflow-hidden rounded-4xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/60 p-4 shadow-soft">
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-violet-200/50 blur-2xl" />
          <div className="relative flex items-start gap-3">
            <AITeacher size={50} state="idle" />
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-violet-600 shadow-soft">
                AI Examiner mode
              </span>
              <h3 className="mt-2 title-md">Aria becomes your examiner</h3>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
                Timed questions, no hints, and a band score against the four official criteria.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* parts */}
      <div className="reveal mt-5 px-4">
        <h2 className="title-md mb-3">Speaking sections</h2>
        <div className="space-y-2.5">
          {ielts.parts.map((p, i) => {
            const t = getTint(p.tint)
            const locked = p.status === 'locked'
            const done = p.status === 'done'
            const current = p.status === 'current'
            return (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  locked
                    ? showToast('Finish Part 2 to unlock this section', { variant: 'default' })
                    : navigate('/ielts/speaking')
                }
                className={`press focus-ring relative flex w-full items-center gap-3 rounded-3xl border p-3.5 text-left transition duration-300 animate-slide-up ${
                  current
                    ? 'border-indigo-200 bg-gradient-to-r from-indigo-50/80 to-white shadow-card'
                    : 'border-ink-100 bg-white shadow-soft hover:border-ink-200'
                }`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                    locked ? 'bg-ink-100 text-ink-300' : `bg-gradient-to-br text-white ${t.grad} ${t.glow}`
                  }`}
                >
                  {locked ? (
                    <Lock size={17} strokeWidth={2.5} />
                  ) : done ? (
                    <Check size={19} strokeWidth={3} />
                  ) : (
                    <Play size={16} className="ml-0.5 fill-white" strokeWidth={2} />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-display text-[14.5px] font-extrabold ${locked ? 'text-ink-500' : 'text-ink-900'}`}>
                      {p.title}
                    </h3>
                    {done && (
                      <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9.5px] font-extrabold text-emerald-600">
                        DONE
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-ink-400">{p.desc}</p>
                  <p className="mt-1 text-[11px] font-bold text-ink-400">
                    {p.minutes} · {p.questions} questions
                  </p>
                </div>

                <ChevronRight size={17} className="shrink-0 text-ink-300" strokeWidth={2.4} />
              </button>
            )
          })}
        </div>
      </div>

      {/* tips */}
      <div className="reveal mt-5 px-4">
        <div className="surface p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-50 text-amber-600">
              <Lightbulb size={16} strokeWidth={2.5} />
            </span>
            <h2 className="title-md">Examiner tips</h2>
          </div>
          <ul className="mt-3 space-y-2.5">
            {ielts.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                <span className="text-[13px] leading-relaxed text-ink-600">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 px-4 safe-bottom">
        <Button to="/ielts/speaking" size="xl" iconRight={ArrowRight}>
          Start IELTS Speaking
        </Button>
        <p className="mt-3 text-center text-[12px] text-ink-400">
          Part 2 · 1 minute to prepare, 2 minutes to speak
        </p>
      </div>
    </div>
  )
}
