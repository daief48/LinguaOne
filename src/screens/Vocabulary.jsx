import { useRef, useState } from 'react'
import { ArrowRight, Check, RotateCcw, Sparkles, X } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { VocabularyCard } from '../components/ui/VocabularyCard'
import { AITeacher } from '../components/ai/AITeacher'
import { ProgressBar } from '../components/ui/Progress'
import { useApp } from '../context/appContext'
import { vocabulary } from '../data/mock'

export default function Vocabulary() {
  const { savedWords, toggleSavedWord, showToast, addXp } = useApp()
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [known, setKnown] = useState(0)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(null)

  const done = index >= vocabulary.length
  const item = vocabulary[index]
  const progress = (index / vocabulary.length) * 100

  const advance = (dir) => {
    if (dir === 'right') {
      setKnown((k) => k + 1)
      addXp(5)
    }
    setDrag(0)
    setIndex((i) => i + 1)
  }

  const onPointerDown = (e) => {
    startX.current = e.clientX
    setDragging(true)
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (startX.current === null) return
    setDrag(e.clientX - startX.current)
  }
  const onPointerUp = () => {
    if (startX.current === null) return
    if (drag > 90) advance('right')
    else if (drag < -90) advance('left')
    else setDrag(0)
    startX.current = null
    setDragging(false)
  }

  const restart = () => {
    setIndex(0)
    setKnown(0)
    setDrag(0)
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <TopBar
        title="Daily Vocabulary"
        subtitle={done ? 'Session complete' : `Word ${index + 1} of ${vocabulary.length}`}
        backTo="/home"
        right={
          <span className="inline-flex h-8 items-center gap-1 rounded-full bg-emerald-50 px-2.5 text-[11.5px] font-extrabold text-emerald-600">
            <Check size={12} strokeWidth={3} />
            {known}
          </span>
        }
      />

      <div className="px-4 pt-3">
        {/* header */}
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_10px_26px_-10px_rgba(16,185,129,0.65)]">
            <Sparkles size={19} strokeWidth={2.3} />
          </span>
          <div className="min-w-0 flex-1">
            <h1 className="title-lg">{vocabulary.length} new words today</h1>
            <p className="text-[12.5px] text-ink-400">Chosen from your recent conversations.</p>
          </div>
        </div>

        <ProgressBar value={progress} tint="green" height={7} className="mt-3.5" animate={false} />
      </div>

      {/* deck */}
      <div className="relative mt-5 flex flex-1 flex-col px-4">
        {done ? (
          <div className="rounded-4xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-cyan-50/60 p-6 text-center animate-scale-in">
            <AITeacher size={72} state="happy" className="mx-auto" ring />
            <h2 className="mt-4 title-lg">Session complete!</h2>
            <p className="mx-auto mt-2 max-w-[250px] text-[13.5px] leading-relaxed text-ink-500">
              You reviewed {vocabulary.length} words and marked {known} as known.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { label: 'Reviewed', value: vocabulary.length },
                { label: 'Known', value: known },
                { label: 'XP', value: `+${known * 5}` },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-ink-100 bg-white p-3">
                  <div className="font-display text-[19px] font-extrabold leading-none text-ink-900">{s.value}</div>
                  <div className="mt-1 text-[10.5px] font-semibold text-ink-400">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2.5">
              <Button to="/conversation" size="xl" iconRight={ArrowRight}>
                Use them in conversation
              </Button>
              <Button onClick={restart} variant="neutral" size="lg" icon={RotateCcw}>
                Review again
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative min-h-[430px] flex-1">
            {/* stacked cards behind */}
            {vocabulary.slice(index + 1, index + 3).map((v, i) => (
              <div
                key={v.id}
                className="absolute inset-0 rounded-[30px] border border-ink-100 bg-white shadow-soft transition-all duration-300"
                style={{
                  transform: `translateY(${(i + 1) * 14}px) scale(${1 - (i + 1) * 0.045})`,
                  opacity: 1 - (i + 1) * 0.3,
                  zIndex: 1,
                }}
              />
            ))}

            {/* active card */}
            <div
              className="absolute inset-0 touch-none"
              style={{
                zIndex: 5,
                transform: `translateX(${drag}px) rotate(${drag * 0.045}deg)`,
                transition: dragging ? 'none' : 'transform 320ms cubic-bezier(0.22,1,0.36,1)',
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* swipe hints */}
              <div
                className="pointer-events-none absolute left-4 top-4 z-10 rounded-xl border-2 border-emerald-500 px-2.5 py-1 font-display text-[13px] font-extrabold text-emerald-600 transition-opacity"
                style={{ opacity: Math.max(0, Math.min(1, drag / 90)) }}
              >
                I KNOW IT
              </div>
              <div
                className="pointer-events-none absolute right-4 top-4 z-10 rounded-xl border-2 border-rose-500 px-2.5 py-1 font-display text-[13px] font-extrabold text-rose-600 transition-opacity"
                style={{ opacity: Math.max(0, Math.min(1, -drag / 90)) }}
              >
                PRACTICE
              </div>

              <VocabularyCard
                item={item}
                saved={savedWords.has(item.id)}
                onSave={() => toggleSavedWord(item.id, item.word)}
                onListen={() => showToast(`Playing “${item.word}”`, { variant: 'ai' })}
                onSpeak={() => showToast('Listening… say the word', { variant: 'ai' })}
              />
            </div>
          </div>
        )}
      </div>

      {/* deck controls */}
      {!done && (
        <div className="mt-5 px-4">
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => advance('left')}
              aria-label="Practice this word again"
              className="press focus-ring grid h-14 w-14 place-items-center rounded-full border border-ink-200 bg-white text-rose-500 shadow-card hover:border-rose-200"
            >
              <X size={22} strokeWidth={2.8} />
            </button>
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              aria-label="Previous word"
              className="press focus-ring grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-soft disabled:opacity-40"
            >
              <RotateCcw size={17} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={() => advance('right')}
              aria-label="I know this word"
              className="press focus-ring grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_14px_30px_-12px_rgba(16,185,129,0.9)]"
            >
              <Check size={24} strokeWidth={3} />
            </button>
          </div>
          <p className="mt-3 text-center text-[12px] font-medium text-ink-400">
            Swipe right if you know it · left to practice again
          </p>
        </div>
      )}
    </div>
  )
}
