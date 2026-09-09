import { ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { CircularProgress } from '../components/ui/Progress'
import { AITeacher } from '../components/ai/AITeacher'
import { StatusBar } from '../components/layout/StatusBar'
import { AIInsightCard } from '../components/ai/AIInsightCard'
import { placementResult, levelJourney } from '../data/mock'
import { tint as getTint } from '../data/tints'

export default function PlacementResult() {
  const r = placementResult

  return (
    <div className="flex-1 pb-8">
      {/* hero */}
      <div className="relative overflow-hidden mesh-hero px-5 pb-12 pt-8 text-center text-white sm:pt-[46px]">
        <StatusBar dark className="absolute inset-x-0 top-0" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.16] grid-dots" />
        <div className="pointer-events-none absolute -left-12 top-4 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-44 w-44 rounded-full bg-cyan-300/25 blur-3xl" />

        <div className="relative flex justify-center">
          <AITeacher size={68} state="happy" ring />
        </div>

        <p className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.14em] backdrop-blur">
          <Sparkles size={11} strokeWidth={2.8} />
          Test complete
        </p>

        <div className="relative mt-4 animate-scale-in">
          <div className="font-display text-[76px] font-extrabold leading-none tracking-[-0.05em] drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
            {r.level}
          </div>
          <div className="mt-1 font-display text-[20px] font-extrabold tracking-tight text-white/95">
            {r.levelName}
          </div>
        </div>

        <p className="relative mx-auto mt-3 max-w-[280px] text-[13.5px] leading-relaxed text-white/80">
          {r.blurb}
        </p>

        {/* level journey */}
        <div className="relative mt-6 flex items-center justify-center gap-1.5">
          {levelJourney.map((l) => (
            <span
              key={l.level}
              className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold transition ${
                l.state === 'current'
                  ? 'bg-white text-violet-700 shadow-lg'
                  : l.state === 'done'
                    ? 'bg-white/25 text-white'
                    : 'bg-white/10 text-white/45'
              }`}
            >
              {l.level}
            </span>
          ))}
        </div>
      </div>

      {/* skills */}
      <div className="relative z-10 -mt-6 px-4">
        <div className="surface p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="title-md">Your skill breakdown</h2>
            <span className="flex items-center gap-1 text-[11.5px] font-bold text-emerald-500">
              <TrendingUp size={12} strokeWidth={2.8} />
              Baseline set
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {r.skills.slice(0, 3).map((s, i) => (
              <div key={s.key} className="flex flex-col items-center animate-slide-up" style={{ animationDelay: `${i * 90}ms` }}>
                <CircularProgress value={s.score} size={72} stroke={7} tint={s.tint} />
                <span className="mt-2 text-[12px] font-bold text-ink-700">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-ink-100 pt-4">
            {r.skills.slice(3).map((s, i) => (
              <div
                key={s.key}
                className="flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${(i + 3) * 90}ms` }}
              >
                <CircularProgress value={s.score} size={54} stroke={6} tint={s.tint} />
                <div>
                  <div className="text-[12.5px] font-bold text-ink-700">{s.label}</div>
                  <div className={`text-[11px] font-bold ${getTint(s.tint).text}`}>
                    {s.score >= 65 ? 'On track' : 'Needs focus'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI recommendation */}
      <div className="mt-4 px-4">
        <AIInsightCard eyebrow="Your AI teacher says" state="happy">
          {r.recommendation}
        </AIInsightCard>
      </div>

      {/* focus areas */}
      <div className="mt-4 px-4">
        <div className="surface p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-pink-50 text-pink-600">
              <Target size={16} strokeWidth={2.5} />
            </span>
            <div>
              <h3 className="text-[13.5px] font-extrabold text-ink-900">Where we’ll start</h3>
              <p className="text-[11.5px] text-ink-400">{r.percentile}</p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {r.focus.map((f) => (
              <span
                key={f}
                className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-[12px] font-bold text-white shadow-glow"
              >
                {f}
              </span>
            ))}
            <span className="rounded-full bg-ink-100 px-3 py-1.5 text-[12px] font-bold text-ink-500">
              + daily vocabulary
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 px-4 safe-bottom">
        <Button to="/plan" size="xl" iconRight={ArrowRight}>
          Build My Learning Plan
        </Button>
      </div>
    </div>
  )
}
