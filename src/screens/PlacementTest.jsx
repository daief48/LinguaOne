import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Sparkles, Volume2, X } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/Progress'
import { VoiceRecorder } from '../components/ai/VoiceRecorder'
import { AITeacher } from '../components/ai/AITeacher'
import { AudioPlayer } from '../components/ai/AudioPlayer'
import { useSequence } from '../hooks/useAnimations'
import { placementQuestions } from '../data/mock'
import { tint as getTint } from '../data/tints'

const TOTAL = 20
const START_AT = 6 // the demo picks the test up mid-way

const categoryTint = {
  Grammar: 'blue',
  Vocabulary: 'green',
  Listening: 'cyan',
  Speaking: 'violet',
}

export default function PlacementTest() {
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({ 1: 'b' }) // matches the spec's example state
  const [micState, setMicState] = useState('idle')
  const { run, cancel } = useSequence()

  const q = placementQuestions[index]
  const isLast = index === placementQuestions.length - 1
  const displayNumber = index + START_AT
  const selected = answers[q.id]
  const t = getTint(categoryTint[q.category] || 'violet')

  const answered = q.speaking ? micState === 'done' : Boolean(selected)

  useEffect(() => () => cancel(), [cancel])

  const handleMic = () => {
    if (micState === 'idle') {
      setMicState('listening')
      run([
        [2600, () => setMicState('processing')],
        [1400, () => setMicState('done')],
      ])
    } else if (micState === 'listening') {
      setMicState('processing')
      run([[1200, () => setMicState('done')]])
    }
  }

  const next = () => {
    if (isLast) return navigate('/placement-result')
    setMicState('idle')
    setIndex((i) => i + 1)
    return undefined
  }

  const progress = useMemo(() => ((displayNumber - 1) / TOTAL) * 100, [displayNumber])

  return (
    <div className="flex flex-1 flex-col">
      {/* header */}
      <div className="sticky top-0 z-20 border-b border-ink-100 bg-white/90 px-5 pb-3.5 pt-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/daily-goal')}
            aria-label="Exit test"
            className="press focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink-100 text-ink-500 hover:bg-ink-200"
          >
            <X size={17} strokeWidth={2.5} />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate font-display text-[15px] font-extrabold text-ink-900">
              Let’s find your English level
            </h1>
            <p className="text-[11.5px] font-semibold text-ink-400">
              Question {displayNumber} of {TOTAL}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-violet-600">
            <Sparkles size={10} strokeWidth={2.8} />
            Adaptive
          </span>
        </div>
        <ProgressBar value={progress} tint="violet" height={6} className="mt-3" animate={false} />
      </div>

      {/* body */}
      <div key={q.id} className="flex-1 px-5 pb-4 pt-6 animate-page-in">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${t.soft} ${t.text}`}>
            {q.category}
          </span>
          <span className="text-[11.5px] font-semibold text-ink-300">
            {q.speaking ? 'Spoken response' : 'Choose one answer'}
          </span>
        </div>

        <h2 className="mt-4 font-display text-[21px] font-extrabold leading-snug tracking-[-0.02em] text-ink-900">
          {q.prompt}
        </h2>

        {q.audioLabel && (
          <div className="mt-4">
            <AudioPlayer duration={9} tint="cyan" title="Listen to the clip" subtitle={q.audioLabel} />
          </div>
        )}

        {q.speaking ? (
          <div className="mt-6">
            <div className="rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/50 p-5">
              <div className="flex items-center gap-2.5">
                <AITeacher size={38} state={micState === 'listening' ? 'listening' : 'idle'} halo={false} />
                <p className="text-[12.5px] font-semibold leading-snug text-ink-600">{q.hint}</p>
              </div>
              <VoiceRecorder
                state={micState}
                onPress={handleMic}
                size={78}
                className="mt-5"
                hint={
                  micState === 'done'
                    ? 'Answer recorded — 22 seconds'
                    : micState === 'idle'
                      ? 'Tap the microphone to answer'
                      : undefined
                }
              />
            </div>
            {micState === 'done' && (
              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-3 animate-slide-up">
                <Check size={15} className="shrink-0 text-emerald-600" strokeWidth={3} />
                <p className="text-[12.5px] font-semibold text-emerald-800">
                  Clear speech detected. Fluency and pronunciation scored.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-5 space-y-2.5">
            {q.options.map((opt, i) => {
              const active = selected === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt.id }))}
                  className={`press focus-ring flex w-full items-center gap-3 rounded-3xl border p-3.5 text-left transition-all duration-300 animate-slide-up ${
                    active
                      ? 'border-violet-300 bg-gradient-to-r from-violet-50 to-white shadow-card ring-1 ring-violet-200'
                      : 'border-ink-100 bg-white shadow-soft hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl2 font-display text-[13.5px] font-extrabold uppercase transition ${
                      active
                        ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow'
                        : 'bg-ink-100 text-ink-500'
                    }`}
                  >
                    {active ? <Check size={16} strokeWidth={3.2} /> : opt.id}
                  </span>
                  <span
                    className={`flex-1 text-[14px] font-semibold leading-snug ${
                      active ? 'text-ink-900' : 'text-ink-700'
                    }`}
                  >
                    {opt.text}
                  </span>
                  {q.category === 'Listening' && (
                    <Volume2 size={15} className="shrink-0 text-ink-300" strokeWidth={2.4} />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* footer */}
      <div className="mt-auto px-5 pb-6 pt-4">
        {isLast && (
          <p className="mb-3 flex items-center justify-center gap-1.5 text-center text-[12px] font-semibold text-violet-600">
            <Sparkles size={12} strokeWidth={2.8} />
            Enough signal — your AI teacher can estimate your level
          </p>
        )}
        <Button onClick={next} size="xl" iconRight={ArrowRight} disabled={!answered}>
          {isLast ? 'See My Result' : 'Next Question'}
        </Button>
      </div>
    </div>
  )
}
