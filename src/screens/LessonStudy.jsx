import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowRight, Check, Lightbulb, Repeat, Volume2 } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/Progress'
import { AITeacher } from '../components/ai/AITeacher'
import { useApp } from '../context/appContext'
import { lessonStudy } from '../data/mock'

export default function LessonStudy() {
  const { lessonId } = useParams()
  const { showToast } = useApp()
  const [seen, setSeen] = useState(() => new Set())
  const [flipped, setFlipped] = useState(() => new Set())

  const progress = Math.round((seen.size / lessonStudy.phrases.length) * 100)
  const allSeen = seen.size === lessonStudy.phrases.length

  const play = (p) => {
    setSeen((s) => new Set(s).add(p.id))
    showToast(`Playing “${p.phrase}”`, { variant: 'ai' })
  }

  const toggleAlt = (id) => {
    setFlipped((s) => {
      const next = new Set(s)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <TopBar title="Learn" subtitle={lessonStudy.title} backTo={`/lesson/${lessonId || 'intro-yourself'}`} />

      <div className="flex-1 px-4 pt-3">
        {/* intro */}
        <div className="flex items-start gap-3 rounded-4xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/60 p-4">
          <AITeacher size={46} state="speaking" />
          <p className="text-[13px] leading-relaxed text-ink-600">{lessonStudy.intro}</p>
        </div>

        {/* progress */}
        <div className="mt-4 flex items-center gap-3">
          <ProgressBar value={progress} tint="violet" height={7} className="flex-1" animate={false} />
          <span className="shrink-0 text-[12px] font-extrabold text-ink-700">
            {seen.size}/{lessonStudy.phrases.length}
          </span>
        </div>

        {/* phrases */}
        <div className="stagger mt-4 space-y-3">
          {lessonStudy.phrases.map((p, i) => {
            const isSeen = seen.has(p.id)
            const showAlt = flipped.has(p.id)
            return (
              <div
                key={p.id}
                className={`relative overflow-hidden rounded-3xl border p-4 transition duration-300 ${
                  isSeen ? 'border-violet-200 bg-white shadow-card' : 'border-ink-100 bg-white shadow-soft'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-ink-100 font-display text-[12px] font-extrabold text-ink-500">
                    {i + 1}
                  </span>
                  {isSeen && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600">
                      <Check size={10} strokeWidth={3.4} />
                      Heard
                    </span>
                  )}
                </div>

                <p className="mt-2.5 font-display text-[17px] font-extrabold leading-snug text-ink-900">
                  {showAlt ? p.alt : p.phrase}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-500">{p.note}</p>

                <div className="mt-3.5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => play(p)}
                    className="press focus-ring flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl2 bg-gradient-to-r from-violet-600 to-indigo-600 text-[13px] font-bold text-white shadow-glow"
                  >
                    <Volume2 size={15} strokeWidth={2.4} />
                    Listen
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAlt(p.id)}
                    className={`press focus-ring flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl2 border text-[13px] font-bold transition ${
                      showAlt
                        ? 'border-violet-200 bg-violet-50 text-violet-700'
                        : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300'
                    }`}
                  >
                    <Repeat size={15} strokeWidth={2.4} />
                    {showAlt ? 'Original' : 'Another way'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* tip */}
        <div className="mt-4 flex gap-2.5 rounded-3xl border border-amber-100 bg-amber-50/70 p-4">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600">
            <Lightbulb size={16} strokeWidth={2.5} />
          </span>
          <div>
            <p className="text-[12.5px] font-extrabold text-amber-800">Aria’s tip</p>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-amber-800/85">{lessonStudy.tip}</p>
          </div>
        </div>
      </div>

      <div className="mt-auto px-4 pb-6 pt-4">
        <Button to="/listening" size="xl" iconRight={ArrowRight} disabled={!allSeen}>
          {allSeen ? 'Continue to Listen' : `Listen to all ${lessonStudy.phrases.length} phrases`}
        </Button>
      </div>
    </div>
  )
}
