import { useEffect, useState } from 'react'
import { ArrowRight, Check, Mic, RotateCcw, Sparkles, Volume2 } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { CircularProgress, ProgressBar } from '../components/ui/Progress'
import { AITeacher } from '../components/ai/AITeacher'
import { Waveform } from '../components/ai/Waveform'
import { VoiceRecorder } from '../components/ai/VoiceRecorder'
import { useApp } from '../context/appContext'
import { useCountUp, useSequence } from '../hooks/useAnimations'
import { pronunciationSet } from '../data/mock'
import { tint as getTint, scoreTint } from '../data/tints'

function ScoreResult({ word, onRetry, onNext }) {
  const score = useCountUp(word.score, { duration: 1100 })
  const t = getTint(scoreTint(word.score))

  return (
    <div className="animate-slide-up">
      <div className="surface overflow-hidden p-0">
        <div className={`flex items-center gap-4 bg-gradient-to-br ${t.gradSoft} p-4`}>
          <CircularProgress value={word.score} size={92} stroke={9} tint={scoreTint(word.score)} label={`${score}%`} />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Check size={15} className="text-emerald-600" strokeWidth={3} />
              <h3 className="font-display text-[17px] font-extrabold text-ink-900">{word.verdict}</h3>
            </div>
            <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
              {word.areas.find((a) => a.score < 75)?.note || 'Very close to a native speaker.'}
            </p>
          </div>
        </div>

        <div className="space-y-3.5 p-4">
          {word.areas.map((a, i) => (
            <div key={a.key} className="animate-slide-up" style={{ animationDelay: `${i * 90}ms` }}>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[13px] font-bold text-ink-800">{a.label}</span>
                <span className="font-display text-[13px] font-extrabold text-ink-900">{a.score}%</span>
              </div>
              <ProgressBar value={a.score} tint={a.tint} height={7} />
              <p className="mt-1.5 text-[11.5px] leading-snug text-ink-400">{a.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-2.5">
        <Button onClick={onRetry} size="xl" icon={RotateCcw}>
          Try Again
        </Button>
        <Button onClick={onNext} variant="neutral" size="lg" iconRight={ArrowRight}>
          Next word
        </Button>
      </div>
    </div>
  )
}

export default function Pronunciation() {
  const { showToast } = useApp()
  const { run, cancel } = useSequence()
  const [index, setIndex] = useState(0)
  const [state, setState] = useState('idle') // idle | listening | processing | done

  const word = pronunciationSet[index]

  useEffect(() => () => cancel(), [cancel])

  const record = () => {
    if (state === 'done') return
    if (state === 'listening') {
      cancel()
      setState('processing')
      run([[1100, () => setState('done')]])
      return
    }
    if (state !== 'idle') return
    setState('listening')
    run([
      [2200, () => setState('processing')],
      [1300, () => setState('done')],
    ])
  }

  const retry = () => {
    cancel()
    setState('idle')
  }

  /** Switch the target word — used by "Next word" and the "Up next" chips. */
  const goToWord = (nextIndex) => {
    cancel()
    setState('idle')
    setIndex(nextIndex)
  }

  return (
    <div className="flex-1 pb-8">
      <TopBar
        title="Pronunciation Coach"
        subtitle={`Word ${index + 1} of ${pronunciationSet.length}`}
        backTo="/home"
      />

      <div className="px-4 pt-3">
        {/* word card */}
        <div
          key={word.word}
          className="relative overflow-hidden rounded-4xl border border-pink-100 bg-gradient-to-br from-pink-50 via-white to-violet-50/60 p-5 text-center shadow-soft animate-scale-in"
        >
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-pink-200/40 blur-2xl" />

          <span className="relative inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-pink-600 shadow-soft">
            <Sparkles size={10} strokeWidth={2.8} />
            Target word
          </span>

          <h1 className="relative mt-3 font-display text-[36px] font-extrabold leading-none tracking-[-0.035em] text-ink-900">
            {word.word}
          </h1>
          <p className="relative mt-2 font-mono text-[15px] font-medium text-ink-500">{word.phonetic}</p>

          {/* syllables */}
          <div className="relative mt-4 flex flex-wrap items-center justify-center gap-1.5">
            {word.syllables.map((s, i) => (
              <span
                key={i}
                className={`rounded-xl px-2.5 py-1.5 font-display text-[13px] font-extrabold transition ${
                  i === word.stressIndex
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_8px_20px_-8px_rgba(236,72,153,0.9)]'
                    : 'bg-white text-ink-500 shadow-soft'
                }`}
              >
                {s}
              </span>
            ))}
          </div>
          <p className="relative mt-2.5 text-[11.5px] font-semibold text-ink-400">
            Stress the {['first', 'second', 'third', 'fourth', 'fifth'][word.stressIndex]} syllable
          </p>

          <p className="relative mt-3 text-[13px] leading-relaxed text-ink-500">{word.meaning}</p>
        </div>

        {/* AI model pronunciation */}
        <div className="mt-4 surface p-4">
          <div className="flex items-center gap-2.5">
            <AITeacher size={38} state="speaking" halo={false} />
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-extrabold text-ink-900">Hear it first</p>
              <p className="text-[11.5px] text-ink-400">Aria · British English</p>
            </div>
            <button
              type="button"
              onClick={() => showToast(`Playing “${word.word}”`, { variant: 'ai' })}
              aria-label="Play pronunciation"
              className="press focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow"
            >
              <Volume2 size={17} strokeWidth={2.4} />
            </button>
          </div>
          <div className="mt-3 rounded-2xl bg-ink-50 p-3">
            <Waveform bars={30} active={false} tint="violet" height={32} seed={index + 2} />
          </div>
        </div>

        {/* recorder / result */}
        <div className="mt-4">
          {state === 'done' ? (
            <ScoreResult
              word={word}
              onRetry={retry}
              onNext={() => goToWord((index + 1) % pronunciationSet.length)}
            />
          ) : (
            <div className="surface p-5">
              <VoiceRecorder
                state={state}
                onPress={record}
                size={92}
                hold
                label={
                  state === 'listening'
                    ? 'Recording…'
                    : state === 'processing'
                      ? 'Analyzing your speech…'
                      : 'Hold to Speak'
                }
                hint={
                  state === 'idle'
                    ? 'Say the word clearly once'
                    : state === 'listening'
                      ? 'Tap again when you are done'
                      : 'Checking stress, vowels and rhythm'
                }
              />
            </div>
          )}
        </div>

        {/* next words */}
        <div className="reveal mt-5">
          <h2 className="title-md mb-3">Up next</h2>
          <div className="flex flex-wrap gap-2">
            {pronunciationSet.map((w, i) =>
              i === index ? null : (
                <button
                  key={w.word}
                  type="button"
                  onClick={() => goToWord(i)}
                  className="press focus-ring flex items-center gap-2 rounded-2xl border border-ink-100 bg-white px-3 py-2.5 shadow-soft hover:border-pink-200"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-pink-50 text-pink-600">
                    <Mic size={13} strokeWidth={2.5} />
                  </span>
                  <span className="text-[13px] font-bold text-ink-800">{w.word}</span>
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
