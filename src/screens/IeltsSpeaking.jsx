import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  FileText,
  Lightbulb,
  Loader2,
  Mic,
  RotateCcw,
  Sparkles,
  Square,
  TrendingUp,
} from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { BottomSheet } from '../components/ui/Overlay'
import { CircularProgress, ProgressBar } from '../components/ui/Progress'
import { AITeacher } from '../components/ai/AITeacher'
import { Waveform } from '../components/ai/Waveform'
import { useApp } from '../context/appContext'
import { useInterval, useCountUp, useSequence, formatTime } from '../hooks/useAnimations'
import { ieltsTest } from '../data/mock'
import { tint as getTint } from '../data/tints'

const PREP_SECONDS = 60
const SPEAK_SECONDS = 120

export default function IeltsSpeaking() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const { run, cancel } = useSequence()

  const [phase, setPhase] = useState('intro') // intro | prep | recording | analyzing | result
  const [prepLeft, setPrepLeft] = useState(PREP_SECONDS)
  const [speakLeft, setSpeakLeft] = useState(SPEAK_SECONDS)
  const [detailOpen, setDetailOpen] = useState(false)

  const r = ieltsTest.result
  const band = useCountUp(phase === 'result' ? r.band : 0, { duration: 1100, decimals: 1 })

  useEffect(() => () => cancel(), [cancel])

  useInterval(() => setPrepLeft((s) => Math.max(0, s - 1)), phase === 'prep' ? 1000 : null)
  useInterval(() => setSpeakLeft((s) => Math.max(0, s - 1)), phase === 'recording' ? 1000 : null)

  const finish = () => {
    setPhase('analyzing')
    run([[2400, () => setPhase('result')]])
  }

  // Timers hand off between phases outside of the state updaters.
  useEffect(() => {
    if (phase === 'prep' && prepLeft === 0) setPhase('recording')
  }, [phase, prepLeft])

  useEffect(() => {
    if (phase === 'recording' && speakLeft === 0) finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, speakLeft])

  const restart = () => {
    cancel()
    setPrepLeft(PREP_SECONDS)
    setSpeakLeft(SPEAK_SECONDS)
    setPhase('intro')
  }

  const spoken = SPEAK_SECONDS - speakLeft

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-indigo-50/50 via-white to-white pb-8">
      <TopBar
        title="IELTS Speaking — Part 2"
        subtitle={phase === 'result' ? 'Scored by AI examiner' : 'AI examiner mode'}
        backTo="/ielts"
        right={
          phase === 'recording' || phase === 'prep' ? (
            <span
              className={`inline-flex h-9 items-center gap-1.5 rounded-full px-3 font-mono text-[13px] font-extrabold tabular-nums ${
                phase === 'recording'
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-indigo-50 text-indigo-600'
              }`}
            >
              <Clock size={13} strokeWidth={2.8} />
              {formatTime(phase === 'recording' ? speakLeft : prepLeft)}
            </span>
          ) : null
        }
      />

      {phase !== 'result' && (
        <div className="px-4 pt-3">
          {/* cue card */}
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-indigo-700 via-violet-700 to-indigo-900 p-5 text-white shadow-[0_20px_46px_-20px_rgba(67,56,202,0.9)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] grid-dots" />
            <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-violet-400/30 blur-2xl" />

            <div className="relative flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] backdrop-blur">
                <FileText size={10} strokeWidth={2.8} />
                Cue card · {ieltsTest.part}
              </span>
            </div>

            <h1 className="relative mt-3.5 font-display text-[21px] font-extrabold leading-snug tracking-[-0.02em]">
              {ieltsTest.question}
            </h1>

            <p className="relative mt-3 text-[11.5px] font-bold uppercase tracking-wider text-white/60">
              You should say
            </p>
            <ul className="relative mt-2 space-y-1.5">
              {ieltsTest.cues.map((c) => (
                <li key={c} className="flex items-start gap-2 text-[13px] leading-relaxed text-white/90">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ------------------------- phases ------------------------- */}

      {phase === 'intro' && (
        <div className="mt-5 flex-1 px-4">
          <div className="surface p-4">
            <div className="flex items-start gap-3">
              <AITeacher size={46} state="idle" />
              <div className="min-w-0">
                <p className="text-[13.5px] font-extrabold text-ink-900">How this works</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
                  You get 1 minute to prepare, then speak for up to 2 minutes without stopping. I’ll score you on
                  the four official criteria.
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                { label: 'Preparation', value: '1:00', tint: 'indigo' },
                { label: 'Speaking', value: '2:00', tint: 'violet' },
              ].map((s) => {
                const t = getTint(s.tint)
                return (
                  <div key={s.label} className={`rounded-2xl p-3 ${t.soft}`}>
                    <div className={`font-display text-[18px] font-extrabold leading-none ${t.text}`}>{s.value}</div>
                    <div className="mt-1 text-[11px] font-semibold text-ink-500">{s.label}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <Button onClick={() => setPhase('prep')} size="xl" className="mt-4" icon={Clock}>
            Start Preparation
          </Button>
          <button
            type="button"
            onClick={() => setPhase('recording')}
            className="press focus-ring mt-3 w-full rounded-xl py-2 text-[13px] font-bold text-ink-500 hover:text-ink-800"
          >
            Skip preparation — start speaking
          </button>
        </div>
      )}

      {phase === 'prep' && (
        <div className="mt-5 flex-1 px-4">
          <div className="surface flex flex-col items-center p-6 text-center">
            <CircularProgress
              value={((PREP_SECONDS - prepLeft) / PREP_SECONDS) * 100}
              size={128}
              stroke={10}
              tint="indigo"
              animate={false}
            >
              <div className="text-center leading-none">
                <div className="font-mono text-[26px] font-extrabold tabular-nums text-ink-900">
                  {formatTime(prepLeft)}
                </div>
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">prepare</div>
              </div>
            </CircularProgress>

            <h2 className="mt-5 title-lg">Make quick notes</h2>
            <p className="mt-2 max-w-[260px] text-[13px] leading-relaxed text-ink-500">
              Think of one skill, one reason and one example. Cover every cue point.
            </p>

            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-amber-100 bg-amber-50/70 p-3 text-left">
              <Lightbulb size={15} className="mt-0.5 shrink-0 text-amber-600" strokeWidth={2.5} />
              <p className="text-[12.5px] leading-relaxed text-amber-800">
                Start with “The skill I’d most like to learn is…” — it buys you time and sounds structured.
              </p>
            </div>
          </div>

          <Button onClick={() => setPhase('recording')} size="xl" className="mt-4" icon={Mic}>
            I’m Ready — Start Speaking
          </Button>
        </div>
      )}

      {phase === 'recording' && (
        <div className="mt-5 flex-1 px-4">
          <div className="surface flex flex-col items-center p-5">
            <div className="flex w-full items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-extrabold text-rose-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                RECORDING
              </span>
              <span className="font-mono text-[13px] font-extrabold tabular-nums text-ink-500">
                {formatTime(spoken)} / 2:00
              </span>
            </div>

            <ProgressBar value={(spoken / SPEAK_SECONDS) * 100} tint="rose" height={6} className="mt-3" animate={false} />

            <div className="my-6 w-full">
              <Waveform bars={34} active tint="pink" height={54} width={4} />
            </div>

            <div className="relative grid place-items-center">
              <span className="absolute h-20 w-20 rounded-full bg-rose-400/40 animate-mic-pulse" />
              <span
                className="absolute h-20 w-20 rounded-full bg-violet-400/35 animate-mic-pulse"
                style={{ animationDelay: '600ms' }}
              />
              <button
                type="button"
                onClick={finish}
                aria-label="Stop recording"
                className="press focus-ring relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-rose-500 via-pink-500 to-violet-600 text-white shadow-[0_18px_40px_-14px_rgba(236,72,153,0.85)]"
              >
                <Square size={26} className="fill-white" strokeWidth={2.6} />
              </button>
            </div>

            <p className="mt-4 text-[13px] font-bold text-rose-600">Speak until the timer ends</p>
            <p className="mt-1 text-center text-[12px] text-ink-400">Tap the square to finish early</p>
          </div>
        </div>
      )}

      {phase === 'analyzing' && (
        <div className="mt-5 flex flex-1 flex-col items-center justify-center px-8 py-14 text-center">
          <AITeacher size={96} state="thinking" ring />
          <h2 className="mt-6 title-lg">AI analyzing…</h2>
          <p className="mt-2 max-w-[250px] text-[13.5px] leading-relaxed text-ink-500">
            Scoring fluency, lexical resource, grammatical range and pronunciation.
          </p>
          <div className="mt-6 w-full max-w-[240px] space-y-2.5">
            {r.criteria.map((c, i) => (
              <div key={c.key} className="flex items-center gap-2.5">
                <Loader2 size={13} className="shrink-0 animate-spin text-violet-500" strokeWidth={2.6} />
                <span className="text-[12.5px] font-semibold text-ink-500">{c.fullLabel}</span>
                <span
                  className="ml-auto h-1.5 flex-1 max-w-[52px] overflow-hidden rounded-full bg-ink-100"
                  style={{ animationDelay: `${i * 120}ms` }}
                >
                  <span className="block h-full w-full animate-shimmer rounded-full bg-gradient-to-r from-violet-300 via-violet-500 to-violet-300" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="flex-1 animate-page-in">
          {/* band hero */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-indigo-900 px-5 pb-10 pt-6 text-center text-white">
            <div className="pointer-events-none absolute inset-0 opacity-[0.18] grid-dots" />
            <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-cyan-400/25 blur-3xl" />

            <div className="relative flex justify-center">
              <AITeacher size={58} state="happy" ring />
            </div>
            <p className="relative mt-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/65">
              Estimated Band
            </p>
            <div className="relative mt-1 font-display text-[68px] font-extrabold leading-none tracking-[-0.04em] drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
              {band.toFixed(1)}
            </div>
            <div className="relative mt-3 flex items-center justify-center gap-2 text-[12px] font-semibold text-white/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                <Clock size={11} strokeWidth={2.8} />
                {r.speakingTime}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                {r.wordsSpoken} words
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                <TrendingUp size={11} strokeWidth={2.8} />
                +0.5
              </span>
            </div>
          </div>

          {/* criteria */}
          <div className="relative z-10 -mt-6 px-4">
            <div className="surface p-4">
              <h2 className="title-md mb-3.5">Band breakdown</h2>
              <div className="space-y-3.5">
                {r.criteria.map((c, i) => (
                  <div key={c.key} className="animate-slide-up" style={{ animationDelay: `${i * 90}ms` }}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span className="text-[13px] font-bold text-ink-800">{c.fullLabel}</span>
                      <span className="font-display text-[14px] font-extrabold text-ink-900">
                        {c.band.toFixed(1)}
                      </span>
                    </div>
                    <ProgressBar value={(c.band / 9) * 100} tint={c.tint} height={7} />
                    <p className="mt-1.5 text-[11.5px] leading-snug text-ink-400">{c.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* examiner feedback */}
          <div className="mt-4 px-4">
            <div className="relative overflow-hidden rounded-4xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/60 p-4 shadow-soft">
              <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-violet-200/50 blur-2xl" />
              <div className="relative flex gap-3">
                <AITeacher size={44} state="idle" halo={false} />
                <div className="min-w-0">
                  <p className="inline-flex items-center gap-1 text-[10.5px] font-extrabold uppercase tracking-[0.13em] text-violet-500">
                    <Sparkles size={11} strokeWidth={2.8} />
                    Examiner feedback
                  </p>
                  <p className="mt-1.5 text-[13.5px] font-semibold leading-relaxed text-ink-800">{r.feedback}</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-5 space-y-2.5 px-4 safe-bottom">
            <Button onClick={() => setDetailOpen(true)} size="xl" iconRight={ChevronRight}>
              View Detailed Feedback
            </Button>
            <div className="grid grid-cols-2 gap-2.5">
              <Button onClick={restart} variant="neutral" size="lg" icon={RotateCcw}>
                Try again
              </Button>
              <Button onClick={() => navigate('/ielts')} variant="neutral" size="lg" iconRight={ArrowRight}>
                IELTS home
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* detailed feedback */}
      <BottomSheet
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        title="Detailed feedback"
        subtitle={`Band ${r.band.toFixed(1)} · ${ieltsTest.part}`}
        footer={
          <Button
            onClick={() => {
              setDetailOpen(false)
              showToast('Added to your weekly plan', { variant: 'success' })
            }}
            size="lg"
          >
            Add to my plan
          </Button>
        }
      >
        <div className="space-y-4 pb-2">
          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-[13px] font-extrabold text-emerald-700">
              <Check size={14} strokeWidth={3} />
              What worked
            </h4>
            <div className="space-y-2">
              {r.strengths.map((s) => (
                <div key={s} className="flex items-start gap-2.5 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
                  <Check size={13} className="mt-0.5 shrink-0 text-emerald-600" strokeWidth={3.2} />
                  <p className="text-[12.5px] font-medium leading-relaxed text-emerald-900">{s}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 flex items-center gap-1.5 text-[13px] font-extrabold text-amber-700">
              <TrendingUp size={14} strokeWidth={3} />
              To reach band 7.0
            </h4>
            <div className="space-y-2">
              {r.improve.map((s, i) => (
                <div key={s} className="flex items-start gap-2.5 rounded-2xl border border-amber-100 bg-amber-50/60 p-3">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-200 text-[10px] font-extrabold text-amber-800">
                    {i + 1}
                  </span>
                  <p className="text-[12.5px] font-medium leading-relaxed text-amber-900">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
