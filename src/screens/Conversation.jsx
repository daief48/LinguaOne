import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  Coffee,
  FileText,
  Gauge,
  GraduationCap,
  Home,
  Loader2,
  MessageCircle,
  Mic,
  Plane,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Square,
  Zap,
} from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { BottomSheet } from '../components/ui/Overlay'
import { XPBadge } from '../components/ui/Badges'
import { AIBubble, UserBubble, TypingBubble, BubbleAction, ChatDivider } from '../components/ai/ChatBubble'
import { CorrectionCard } from '../components/ai/CorrectionCard'
import { AITeacher } from '../components/ai/AITeacher'
import { Waveform } from '../components/ai/Waveform'
import { useApp } from '../context/appContext'
import { useSequence, useInterval, formatTime } from '../hooks/useAnimations'
import { conversationScenarios } from '../data/mock'

/* ---- mode meta ---- */
const MODE_META = {
  free:      { label: 'Free Talk',        Icon: MessageCircle, color: 'from-violet-600 to-indigo-600',   bg: 'bg-violet-50',   text: 'text-violet-700'  },
  interview: { label: 'Job Interview',     Icon: Briefcase,     color: 'from-blue-600 to-indigo-600',     bg: 'bg-blue-50',     text: 'text-blue-700'    },
  travel:    { label: 'Travel English',    Icon: Plane,         color: 'from-cyan-500 to-blue-500',       bg: 'bg-cyan-50',     text: 'text-cyan-700'    },
  shopping:  { label: 'Shopping',          Icon: ShoppingBag,   color: 'from-emerald-500 to-green-600',   bg: 'bg-emerald-50',  text: 'text-emerald-700' },
  casual:    { label: 'Casual Chat',       Icon: Coffee,        color: 'from-amber-500 to-orange-500',    bg: 'bg-amber-50',    text: 'text-amber-700'   },
  business:  { label: 'Business English',  Icon: Building2,     color: 'from-orange-500 to-rose-500',     bg: 'bg-orange-50',   text: 'text-orange-700'  },
  academic:  { label: 'Academic English',  Icon: GraduationCap, color: 'from-pink-600 to-violet-600',     bg: 'bg-pink-50',     text: 'text-pink-700'    },
}

export default function Conversation() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const rawMode = searchParams.get('mode') || 'free'
  const mode = conversationScenarios[rawMode] ? rawMode : 'free'

  const scenario   = conversationScenarios[mode]
  const topic      = scenario.topic
  const script     = scenario.script
  const meta       = MODE_META[mode]
  const ModeIcon   = meta.Icon

  const { showToast, addXp } = useApp()
  const { run, cancel } = useSequence()
  const endRef = useRef(null)

  const [turn, setTurn] = useState(0)
  const [phase, setPhase] = useState('ready') // ready | listening | processing | feedback | done
  const [items, setItems] = useState([{ kind: 'ai', text: script[0].ai }])
  const [seconds, setSeconds] = useState(0)
  const [transcriptOpen, setTranscriptOpen] = useState(false)
  const [slow, setSlow] = useState(false)
  const [earned, setEarned] = useState(0)

  // Reset when mode changes
  useEffect(() => {
    setTurn(0)
    setPhase('ready')
    setItems([{ kind: 'ai', text: script[0].ai }])
    setSeconds(0)
    setEarned(0)
    setSlow(false)
  }, [mode]) // eslint-disable-line react-hooks/exhaustive-deps

  useInterval(() => setSeconds((s) => s + 1), phase === 'done' ? null : 1000)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [items, phase])

  useEffect(() => () => cancel(), [cancel])

  const speak = () => {
    if (phase === 'listening') {
      cancel()
      setPhase('processing')
      run([[900, () => reveal()]])
      return
    }
    if (phase !== 'ready') return
    setPhase('listening')
    run([
      [2600, () => setPhase('processing')],
      [1300, () => reveal()],
    ])
  }

  const reveal = () => {
    const step = script[turn]
    setItems((list) => [
      ...list,
      { kind: 'user', text: step.userSaid },
      step.correction
        ? { kind: 'correction', ...step.correction, original: step.userSaid }
        : { kind: 'praise', text: step.praise },
    ])
    if (step.correction?.xp) {
      setEarned((v) => v + step.correction.xp)
      addXp(step.correction.xp)
    }
    setPhase('feedback')
  }

  const next = () => {
    const nextTurn = turn + 1
    if (nextTurn >= script.length) {
      setPhase('done')
      return
    }
    setItems((list) => [...list, { kind: 'typing' }])
    setPhase('processing')
    run([
      [1100, () => {
        setItems((list) => [
          ...list.filter((i) => i.kind !== 'typing'),
          { kind: 'ai', text: script[nextTurn].ai },
        ])
        setTurn(nextTurn)
        setPhase('ready')
      }],
    ])
  }

  const aiState =
    phase === 'listening' ? 'listening' : phase === 'processing' ? 'thinking' : phase === 'done' ? 'happy' : 'speaking'

  return (
    <div className="flex flex-1 flex-col bg-gradient-to-b from-violet-50/60 via-white to-white">
      {/* header */}
      <TopBar
        title="AI Conversation"
        subtitle={topic.title}
        backTo="/practice"
        right={
          <span className="inline-flex h-9 items-center gap-1.5 rounded-full border border-ink-200 bg-white px-2.5 font-mono text-[12px] font-bold tabular-nums text-ink-600 shadow-soft">
            {formatTime(seconds)}
          </span>
        }
      />

      {/* scenario mode badge strip */}
      <div className={`flex items-center gap-2.5 border-b border-ink-100 px-4 py-2 ${meta.bg}`}>
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-white ${meta.color}`}>
          <ModeIcon size={11} strokeWidth={2.8} />
          {meta.label}
        </span>
        <span className={`text-[11.5px] font-semibold ${meta.text}`}>
          {topic.level} · {topic.minutes} min
        </span>
      </div>

      {/* topic strip */}
      <div className="border-b border-ink-100 bg-white/70 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <AITeacher size={34} state={aiState} halo={false} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12.5px] font-extrabold text-ink-900">Aria · Your AI Teacher</p>
            <p className="truncate text-[11px] font-medium text-ink-400">Goal: {topic.goal}</p>
          </div>
          {earned > 0 && <XPBadge amount={earned} size="sm" />}
        </div>
      </div>

      {/* conversation */}
      <div className="flex-1 space-y-3.5 px-4 py-5">
        <ChatDivider>Conversation started</ChatDivider>

        {items.map((item, i) => {
          if (item.kind === 'ai') {
            return (
              <AIBubble
                key={i}
                state={i === items.length - 1 && phase === 'ready' ? 'speaking' : 'idle'}
                actions={
                  <>
                    <BubbleAction icon={RotateCcw} onClick={() => showToast('Replaying audio', { variant: 'ai' })}>
                      Replay
                    </BubbleAction>
                    <BubbleAction
                      icon={Gauge}
                      active={slow}
                      onClick={() => {
                        setSlow((s) => !s)
                        showToast(slow ? 'Normal speed' : 'Slow speed on', { variant: 'default' })
                      }}
                    >
                      Slow
                    </BubbleAction>
                    <BubbleAction icon={FileText} onClick={() => setTranscriptOpen(true)}>
                      Transcript
                    </BubbleAction>
                  </>
                }
              >
                {item.text}
              </AIBubble>
            )
          }
          if (item.kind === 'user') {
            return (
              <UserBubble key={i} meta="You · transcribed">
                {item.text}
              </UserBubble>
            )
          }
          if (item.kind === 'correction') {
            return (
              <CorrectionCard
                key={i}
                original={item.original}
                corrected={item.corrected}
                tip={item.tip}
                xp={item.xp}
                compact
                onListen={() => showToast('Playing the corrected sentence', { variant: 'ai' })}
                className="ml-9"
              />
            )
          }
          if (item.kind === 'praise') {
            return (
              <div
                key={i}
                className="ml-9 flex items-start gap-2.5 rounded-3xl border border-emerald-100 bg-emerald-50/70 p-3.5 animate-slide-up"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
                  <Check size={15} strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[12.5px] font-extrabold text-emerald-800">No corrections needed</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-emerald-800/80">{item.text}</p>
                </div>
              </div>
            )
          }
          return <TypingBubble key={i} />
        })}

        {phase === 'listening' && (
          <div className="flex flex-col items-end gap-2 animate-fade-in">
            <div className="flex max-w-[82%] items-center gap-2.5 rounded-3xl rounded-br-lg border border-violet-200 bg-white px-3.5 py-3 shadow-soft">
              <Waveform bars={16} active tint="pink" height={22} width={2.5} />
              <span className="text-[12.5px] font-bold text-violet-600">Listening…</span>
            </div>
          </div>
        )}

        {phase === 'done' && (
          <div className="rounded-4xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/60 p-4 text-center animate-scale-in">
            <AITeacher size={58} state="happy" className="mx-auto" />
            <h3 className="mt-3 title-lg">Nice conversation!</h3>
            <p className="mx-auto mt-1.5 max-w-[260px] text-[13px] leading-relaxed text-ink-500">
              You spoke for {formatTime(seconds)} and completed the {meta.label} session.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { label: 'XP earned', value: `+${earned}` },
                { label: 'Corrections', value: String(script.filter(s => s.correction).length) },
                { label: 'Fluency', value: 'Good' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-ink-100 bg-white p-2.5">
                  <div className="font-display text-[16px] font-extrabold leading-none text-ink-900">{s.value}</div>
                  <div className="mt-1 text-[10.5px] font-semibold text-ink-400">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2">
              <Button to="/grammar" size="lg" icon={Sparkles}>
                Review Grammar Tips
              </Button>
              <Button onClick={() => navigate('/practice')} variant="neutral" size="lg" icon={Home}>
                Back to Practice
              </Button>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* control panel */}
      {phase !== 'done' && (
        <div className="sticky bottom-0 border-t border-ink-100 bg-white/90 px-4 pb-5 pt-3.5 backdrop-blur-xl safe-bottom">
          {phase === 'feedback' ? (
            <div className="animate-slide-up">
              <div className="mb-3 flex items-center justify-center gap-1.5 text-[12px] font-semibold text-ink-400">
                <Zap size={12} className="text-amber-500" strokeWidth={2.8} />
                Keep going — the next question builds on your answer
              </div>
              <Button onClick={next} size="lg" iconRight={ArrowRight}>
                Continue Conversation
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => showToast('Replaying the question', { variant: 'ai' })}
                aria-label="Replay question"
                className="press focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-soft hover:text-ink-900"
              >
                <RotateCcw size={17} strokeWidth={2.4} />
              </button>

              <div className="relative flex flex-1 justify-center">
                {phase === 'listening' && (
                  <>
                    <span className="absolute h-16 w-16 rounded-full bg-pink-400/45 animate-mic-pulse" />
                    <span
                      className="absolute h-16 w-16 rounded-full bg-violet-400/40 animate-mic-pulse"
                      style={{ animationDelay: '600ms' }}
                    />
                  </>
                )}
                <button
                  type="button"
                  onClick={speak}
                  disabled={phase === 'processing'}
                  aria-label={phase === 'listening' ? 'Stop recording' : 'Start speaking'}
                  className={`press focus-ring relative grid h-16 w-16 place-items-center rounded-full text-white transition-all duration-300 ${
                    phase === 'listening'
                      ? 'bg-gradient-to-br from-rose-500 via-pink-500 to-violet-600 shadow-[0_16px_34px_-12px_rgba(236,72,153,0.85)]'
                      : phase === 'processing'
                        ? 'bg-gradient-to-br from-indigo-500 to-violet-600 opacity-80'
                        : 'bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 shadow-glow'
                  }`}
                >
                  {phase === 'processing' ? (
                    <Loader2 size={22} className="animate-spin" strokeWidth={2.5} />
                  ) : phase === 'listening' ? (
                    <Square size={18} className="fill-white" strokeWidth={2.6} />
                  ) : (
                    <Mic size={24} strokeWidth={2.3} />
                  )}
                  <span className="pointer-events-none absolute inset-1 rounded-full border border-white/25" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setTranscriptOpen(true)}
                aria-label="Show transcript"
                className="press focus-ring grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-soft hover:text-ink-900"
              >
                <FileText size={17} strokeWidth={2.4} />
              </button>
            </div>
          )}

          {phase !== 'feedback' && (
            <p
              className={`mt-2.5 text-center text-[12.5px] font-bold ${
                phase === 'listening'
                  ? 'text-pink-600'
                  : phase === 'processing'
                    ? 'text-indigo-600'
                    : 'text-ink-400'
              }`}
            >
              {phase === 'listening' ? 'Listening…' : phase === 'processing' ? 'Processing…' : 'Tap to speak'}
            </p>
          )}
        </div>
      )}

      {/* transcript */}
      <BottomSheet
        open={transcriptOpen}
        onClose={() => setTranscriptOpen(false)}
        title="Transcript"
        subtitle="Everything from this session"
      >
        <div className="space-y-3 pb-2">
          {items
            .filter((i) => i.kind === 'ai' || i.kind === 'user')
            .map((i, idx) => (
              <div key={idx} className="flex gap-2.5">
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    i.kind === 'ai' ? 'bg-violet-50 text-violet-600' : 'bg-ink-100 text-ink-500'
                  }`}
                >
                  {i.kind === 'ai' ? 'Aria' : 'You'}
                </span>
                <p className="text-[13px] leading-relaxed text-ink-700">{i.text}</p>
              </div>
            ))}
          {items.length <= 1 && <p className="text-[13px] text-ink-400">Speak to build the transcript.</p>}
        </div>
      </BottomSheet>
    </div>
  )
}
