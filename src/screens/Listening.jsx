import { useState } from 'react'
import { ArrowRight, Check, Eye, EyeOff, Headphones, Info, Sparkles, X } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { AudioPlayer } from '../components/ai/AudioPlayer'
import { AITeacher } from '../components/ai/AITeacher'
import { useApp } from '../context/appContext'
import { formatTime } from '../hooks/useAnimations'
import { listeningExercise as ex } from '../data/mock'

export default function Listening() {
  const { showToast, addXp } = useApp()
  const [picked, setPicked] = useState(null)
  const [time, setTime] = useState(0)
  const [showTranscript, setShowTranscript] = useState(false)

  const answered = picked !== null
  const isCorrect = picked === ex.correct

  const choose = (id) => {
    if (answered) return
    setPicked(id)
    if (id === ex.correct) {
      addXp(15)
      showToast('Correct! +15 XP', { variant: 'xp' })
    } else {
      showToast('Not quite — check the transcript', { variant: 'default' })
    }
  }

  const activeLine = [...ex.transcript].reverse().find((l) => time >= l.t)

  return (
    <div className="flex-1 pb-8">
      <TopBar title="Listening Practice" subtitle={ex.accent} backTo="/home" />

      <div className="px-4 pt-3">
        {/* clip card */}
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-4 text-white shadow-[0_20px_46px_-20px_rgba(6,182,212,0.9)]">
          <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
          <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-cyan-200/35 blur-2xl" />

          <div className="relative flex items-start gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Headphones size={20} strokeWidth={2.3} />
            </span>
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur">
                <Sparkles size={9} strokeWidth={2.8} />
                AI-generated conversation
              </span>
              <h1 className="mt-2 font-display text-[18px] font-extrabold leading-tight">{ex.title}</h1>
              <p className="mt-1 text-[12px] font-medium text-white/75">
                {ex.accent} · {ex.speed} speed · {formatTime(ex.duration)}
              </p>
            </div>
          </div>

          {/* live caption */}
          <div className="relative mt-3.5 min-h-[52px] rounded-2xl bg-white/15 p-3 backdrop-blur">
            {activeLine ? (
              <p className="text-[13px] font-semibold leading-relaxed animate-fade-in">
                <span className="mr-1.5 rounded-full bg-white/25 px-1.5 py-0.5 text-[10.5px] font-extrabold">
                  {activeLine.speaker}
                </span>
                {showTranscript ? activeLine.text : '••• listening •••'}
              </p>
            ) : (
              <p className="text-[13px] font-medium text-white/70">Press play to start the conversation.</p>
            )}
          </div>
        </div>

        {/* player */}
        <div className="mt-4">
          <AudioPlayer
            duration={ex.duration}
            title="Conversation clip"
            subtitle="Tap the waveform to jump"
            tint="cyan"
            onTime={setTime}
          />
        </div>

        {/* transcript toggle */}
        <button
          type="button"
          onClick={() => setShowTranscript((v) => !v)}
          className="press focus-ring mt-3 flex w-full items-center justify-center gap-2 rounded-xl2 border border-ink-200 bg-white py-2.5 text-[13px] font-bold text-ink-600 shadow-soft hover:border-ink-300"
        >
          {showTranscript ? <EyeOff size={15} strokeWidth={2.4} /> : <Eye size={15} strokeWidth={2.4} />}
          {showTranscript ? 'Hide transcript' : 'Show transcript'}
        </button>

        {showTranscript && (
          <div className="mt-3 space-y-2.5 rounded-3xl border border-ink-100 bg-white p-4 shadow-soft animate-slide-up">
            {ex.transcript.map((l) => {
              const active = activeLine?.t === l.t
              return (
                <div key={l.t} className={`flex gap-2.5 rounded-xl p-1.5 transition ${active ? 'bg-cyan-50' : ''}`}>
                  <span className="mt-0.5 shrink-0 font-mono text-[10.5px] font-bold text-ink-300">
                    {formatTime(l.t)}
                  </span>
                  <p className="text-[13px] leading-relaxed text-ink-700">
                    <span className="font-extrabold text-ink-900">{l.speaker}: </span>
                    {l.text}
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {/* question */}
        <div className="mt-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-50 text-violet-600">
              <Info size={14} strokeWidth={2.6} />
            </span>
            <h2 className="title-md">{ex.question}</h2>
          </div>

          <div className="space-y-2.5">
            {ex.options.map((o, i) => {
              const chosen = picked === o.id
              const right = o.id === ex.correct
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => choose(o.id)}
                  disabled={answered}
                  className={`press focus-ring flex w-full items-center gap-3 rounded-3xl border p-3.5 text-left transition-all duration-300 animate-slide-up ${
                    answered && right
                      ? 'border-emerald-200 bg-emerald-50 shadow-card'
                      : answered && chosen
                        ? 'border-rose-200 bg-rose-50'
                        : answered
                          ? 'border-ink-100 bg-white opacity-60'
                          : 'border-ink-100 bg-white shadow-soft hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card'
                  }`}
                  style={{ animationDelay: `${i * 55}ms` }}
                >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl2 font-display text-[13px] font-extrabold uppercase ${
                      answered && right
                        ? 'bg-emerald-500 text-white'
                        : answered && chosen
                          ? 'bg-rose-500 text-white'
                          : 'bg-ink-100 text-ink-500'
                    }`}
                  >
                    {answered && right ? (
                      <Check size={16} strokeWidth={3.2} />
                    ) : answered && chosen ? (
                      <X size={16} strokeWidth={3.2} />
                    ) : (
                      o.id
                    )}
                  </span>
                  <span className="text-[14px] font-semibold text-ink-800">{o.text}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* explanation */}
        {answered && (
          <div className="mt-4 animate-slide-up">
            <div
              className={`flex items-start gap-3 rounded-3xl border p-4 ${
                isCorrect ? 'border-emerald-100 bg-emerald-50/70' : 'border-amber-100 bg-amber-50/70'
              }`}
            >
              <AITeacher size={38} state={isCorrect ? 'happy' : 'idle'} halo={false} />
              <div className="min-w-0">
                <p className={`text-[13px] font-extrabold ${isCorrect ? 'text-emerald-800' : 'text-amber-800'}`}>
                  {isCorrect ? 'Correct — she is a designer.' : 'Close, but not quite.'}
                </p>
                <p
                  className={`mt-1 text-[12.5px] leading-relaxed ${
                    isCorrect ? 'text-emerald-800/85' : 'text-amber-800/85'
                  }`}
                >
                  {ex.explanation}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              <Button to="/vocabulary" size="xl" iconRight={ArrowRight}>
                Next exercise
              </Button>
              <Button
                onClick={() => {
                  setPicked(null)
                  setShowTranscript(false)
                }}
                variant="neutral"
                size="lg"
              >
                Try again
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
