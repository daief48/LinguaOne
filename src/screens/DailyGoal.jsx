import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Clock, Sparkles, TrendingUp } from 'lucide-react'
import { FlowHeader } from '../components/layout/FlowHeader'
import { Button } from '../components/ui/Button'
import { useApp } from '../context/appContext'
import { dailyGoalOptions } from '../data/mock'

const motivation = {
  5: '5 focused minutes still beats a skipped day.',
  10: '10 minutes a day builds a habit that sticks.',
  15: '15 minutes a day can make a big difference.',
  30: '30 minutes a day and you will feel it within a month.',
  60: 'An hour a day — that is exam-ready pace.',
}

export default function DailyGoal() {
  const navigate = useNavigate()
  const { dailyGoal, setDailyGoal } = useApp()

  return (
    <div className="flex flex-1 flex-col">
      <FlowHeader
        step={3}
        title="How much time can you practice each day?"
        subtitle="Pick something you can keep. Your streak depends on it."
        backTo="/goal"
      />

      <div className="mt-6 space-y-2.5 px-5 pb-4">
        {dailyGoalOptions.map((opt, i) => {
          const active = opt.minutes === dailyGoal
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setDailyGoal(opt.minutes)}
              className={`press focus-ring flex w-full items-center gap-3.5 rounded-3xl border p-3.5 text-left transition-all duration-300 animate-slide-up ${
                active
                  ? 'border-violet-300 bg-gradient-to-r from-violet-50 to-white shadow-card ring-1 ring-violet-200'
                  : 'border-ink-100 bg-white shadow-soft hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card'
              }`}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <span
                className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl font-display text-[15px] font-extrabold transition ${
                  active
                    ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow'
                    : 'bg-ink-100 text-ink-500'
                }`}
              >
                {opt.minutes}
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-display text-[15px] font-extrabold text-ink-900">
                    {opt.minutes} min
                  </span>
                  <span className="text-[12px] font-bold text-ink-400">· {opt.label}</span>
                  {opt.recommended && (
                    <span className="rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                      Recommended
                    </span>
                  )}
                </span>
                <span className="mt-0.5 block text-[12px] text-ink-400">{opt.desc}</span>
              </span>

              <span className="flex shrink-0 flex-col items-end gap-1.5">
                {active ? (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow">
                    <Check size={13} strokeWidth={3.2} />
                  </span>
                ) : (
                  <span className="h-6 w-6 rounded-full border-2 border-ink-200" />
                )}
                <span className="text-[10.5px] font-bold text-amber-500">{opt.xp}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="px-5">
        <div className="flex items-start gap-3 rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-violet-50/50 p-4">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl2 bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
            <TrendingUp size={17} strokeWidth={2.4} />
          </span>
          <div>
            <p className="font-display text-[14px] font-extrabold text-ink-900">
              {motivation[dailyGoal] || motivation[15]}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-500">
              <Clock size={12} strokeWidth={2.5} />
              Learners at this pace reach the next level in ~9 weeks.
            </p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 mt-auto bg-gradient-to-t from-white via-white/95 to-transparent px-5 pb-6 pt-5 safe-bottom">
        <Button onClick={() => navigate('/placement')} size="xl" iconRight={ArrowRight}>
          Continue
        </Button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[12px] font-medium text-ink-400">
          <Sparkles size={12} className="text-violet-400" strokeWidth={2.6} />
          Next: a 2-minute AI placement test
        </p>
      </div>
    </div>
  )
}
