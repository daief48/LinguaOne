import { useState } from 'react'
import { ArrowRight, Check, Lightbulb, RotateCcw, Sparkles, Target, TrendingDown, X } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { XPBadge } from '../components/ui/Badges'
import { BottomSheet } from '../components/ui/Overlay'
import { CorrectionCard } from '../components/ai/CorrectionCard'
import { AITeacher } from '../components/ai/AITeacher'
import { useApp } from '../context/appContext'
import { grammarCorrection as gc } from '../data/mock'

const practiceQuestion = {
  prompt: 'Choose the correct sentence.',
  options: [
    { id: 'a', text: 'She has four years experience in design.' },
    { id: 'b', text: 'She has four years of experience in design.' },
  ],
  correct: 'b',
}

export default function GrammarCorrection() {
  const { showToast, addXp } = useApp()
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [picked, setPicked] = useState(null)

  const isCorrect = picked === practiceQuestion.correct

  const choose = (id) => {
    setPicked(id)
    if (id === practiceQuestion.correct) {
      addXp(5)
      showToast('Correct! +5 XP', { variant: 'xp' })
    }
  }

  const resetPractice = () => {
    setPicked(null)
    setPracticeOpen(true)
  }

  return (
    <div className="flex-1 pb-8">
      <TopBar title="Grammar Correction" subtitle={gc.category} backTo="/conversation" />

      {/* hero */}
      <div className="px-4 pt-3">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-4 text-white shadow-[0_20px_46px_-20px_rgba(79,70,229,0.9)]">
          <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
          <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-cyan-300/35 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <AITeacher size={50} state="idle" halo={false} />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/75">
                Instant feedback
              </p>
              <h1 className="mt-1 font-display text-[18px] font-extrabold leading-tight">
                One small fix, one big upgrade
              </h1>
            </div>
            <XPBadge amount={gc.xp} className="shrink-0 bg-white/20 text-white" />
          </div>
        </div>
      </div>

      {/* correction */}
      <div className="mt-4 px-4">
        <CorrectionCard
          original={gc.original}
          corrected={gc.corrected}
          explanation={gc.explanation}
          xp={gc.xp}
          onListen={() => showToast('Playing the corrected sentence', { variant: 'ai' })}
        />
      </div>

      {/* grammar tip */}
      <div className="mt-4 px-4">
        <div className="surface p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
              <Lightbulb size={16} strokeWidth={2.5} />
            </span>
            <h2 className="title-md">{gc.tipTitle}</h2>
          </div>
          <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-600">{gc.tip}</p>

          <div className="mt-3.5 rounded-2xl bg-ink-50 p-3">
            <p className="text-center font-mono text-[13px] font-bold text-ink-700">
              number + years + <span className="rounded bg-emerald-100 px-1 text-emerald-700">of</span> + noun
            </p>
          </div>
        </div>
      </div>

      {/* repeat pattern */}
      <div className="mt-4 px-4">
        <div className="flex items-center gap-3 rounded-3xl border border-pink-100 bg-pink-50/60 p-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-pink-600 shadow-soft">
            <Target size={18} strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-extrabold text-ink-900">
              You’ve made this mistake {gc.seenBefore} times
            </p>
            <p className="mt-0.5 text-[12px] text-ink-500">
              It’s in your top {gc.category.toLowerCase()} patterns this month.
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-extrabold text-emerald-600 shadow-soft">
            <TrendingDown size={11} strokeWidth={3} />
            −2
          </span>
        </div>
      </div>

      {/* more examples */}
      <div className="mt-5 px-4">
        <h2 className="title-md mb-3">More examples</h2>
        <div className="space-y-2.5">
          {gc.more.map((m, i) => (
            <div
              key={m.right}
              className="surface space-y-2 p-3.5 animate-slide-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <p className="flex items-start gap-2 text-[13px] text-ink-400 line-through decoration-rose-300 decoration-2">
                <X size={14} className="mt-0.5 shrink-0 text-rose-400" strokeWidth={3} />
                {m.wrong}
              </p>
              <p className="flex items-start gap-2 text-[13px] font-semibold text-ink-800">
                <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" strokeWidth={3} />
                {m.right}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-6 space-y-2.5 px-4 safe-bottom">
        <Button onClick={resetPractice} size="xl" icon={RotateCcw}>
          Practice Again
        </Button>
        <Button to="/conversation" variant="neutral" size="lg" iconRight={ArrowRight}>
          Back to Conversation
        </Button>
      </div>

      {/* practice sheet */}
      <BottomSheet
        open={practiceOpen}
        onClose={() => setPracticeOpen(false)}
        title="Quick practice"
        subtitle="Same pattern, new sentence."
      >
        <p className="mb-3 text-[14px] font-bold text-ink-800">{practiceQuestion.prompt}</p>
        <div className="space-y-2.5">
          {practiceQuestion.options.map((o) => {
            const chosen = picked === o.id
            const right = o.id === practiceQuestion.correct
            const showState = picked !== null
            return (
              <button
                key={o.id}
                type="button"
                disabled={showState}
                onClick={() => choose(o.id)}
                className={`press focus-ring flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                  showState && right
                    ? 'border-emerald-200 bg-emerald-50'
                    : showState && chosen
                      ? 'border-rose-200 bg-rose-50'
                      : 'border-ink-100 bg-white hover:border-ink-300'
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl text-[12.5px] font-extrabold uppercase ${
                    showState && right
                      ? 'bg-emerald-500 text-white'
                      : showState && chosen
                        ? 'bg-rose-500 text-white'
                        : 'bg-ink-100 text-ink-500'
                  }`}
                >
                  {showState && right ? (
                    <Check size={15} strokeWidth={3.2} />
                  ) : showState && chosen ? (
                    <X size={15} strokeWidth={3.2} />
                  ) : (
                    o.id
                  )}
                </span>
                <span className="text-[13.5px] font-semibold text-ink-800">{o.text}</span>
              </button>
            )
          })}
        </div>

        {picked && (
          <div
            className={`mt-3.5 flex items-start gap-2.5 rounded-2xl border p-3 animate-slide-up ${
              isCorrect ? 'border-emerald-100 bg-emerald-50/70' : 'border-amber-100 bg-amber-50/70'
            }`}
          >
            <Sparkles
              size={15}
              className={`mt-0.5 shrink-0 ${isCorrect ? 'text-emerald-600' : 'text-amber-600'}`}
              strokeWidth={2.6}
            />
            <p className={`text-[12.5px] font-semibold leading-relaxed ${isCorrect ? 'text-emerald-800' : 'text-amber-800'}`}>
              {isCorrect
                ? 'Exactly right — “of” goes between the number of years and the noun.'
                : 'Almost. Remember: “four years of experience”, not “four years experience”.'}
            </p>
          </div>
        )}

        <div className="mt-4 space-y-2 pb-2">
          <Button
            onClick={() => (picked ? setPicked(null) : setPracticeOpen(false))}
            size="lg"
            variant={picked ? 'primary' : 'neutral'}
          >
            {picked ? 'Try another' : 'Close'}
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}
