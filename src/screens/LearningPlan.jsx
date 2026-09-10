import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Calendar, Check, Clock, Lock, Play, Sparkles, Target } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Skeleton } from '../components/ui/Card'
import { AITeacher } from '../components/ai/AITeacher'
import { useApp } from '../context/appContext'
import { learningPlan, learningGoals } from '../data/mock'
import { tint as getTint } from '../data/tints'

/** Each planned day opens the screen that teaches that skill. */
const DAY_ROUTES = {
  Speaking: '/conversation',
  Vocabulary: '/vocabulary',
  Listening: '/listening',
  Grammar: '/grammar',
  Pronunciation: '/pronunciation',
  Review: '/progress',
}

function BuildingState() {
  return (
    <div className="px-5 pb-8 pt-4">
      <div className="flex flex-col items-center py-10 text-center">
        <AITeacher size={86} state="thinking" ring />
        <h2 className="mt-6 title-lg">Building your plan…</h2>
        <p className="mt-2 max-w-[250px] text-[13.5px] leading-relaxed text-ink-500">
          Matching your level, goal and daily time into a 7-day journey.
        </p>
      </div>
      <div className="space-y-2.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-3xl border border-ink-100 bg-white p-3.5">
            <Skeleton className="h-11 w-11 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-1/2 rounded-md" />
              <Skeleton className="h-2.5 w-1/3 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LearningPlan() {
  const navigate = useNavigate()
  const [building, setBuilding] = useState(true)
  const { dailyGoal, goalId, showToast } = useApp()
  const goal = learningGoals.find((g) => g.id === goalId)

  useEffect(() => {
    const t = window.setTimeout(() => setBuilding(false), 1500)
    return () => window.clearTimeout(t)
  }, [])

  if (building) {
    return (
      <div className="flex-1">
        <TopBar title="Personalized plan" backTo="/placement-result" />
        <BuildingState />
      </div>
    )
  }

  return (
    <div className="flex-1 pb-8">
      <TopBar title="Your plan" backTo="/placement-result" />

      <div className="px-4 pt-2 animate-page-in">
        {/* intro */}
        <div className="flex items-start gap-3">
          <AITeacher size={52} state="happy" />
          <div className="min-w-0 pt-1">
            <h1 className="title-xl">Your personalized plan</h1>
            <p className="mt-1 flex items-center gap-1.5 text-[13px] font-semibold text-violet-600">
              <Sparkles size={13} strokeWidth={2.6} />
              Created by your AI teacher
            </p>
          </div>
        </div>

        {/* summary */}
        <div className="relative mt-4 overflow-hidden rounded-4xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-4 text-white shadow-[0_20px_46px_-20px_rgba(79,70,229,0.9)]">
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-cyan-300/30 blur-2xl" />
          <div className="relative flex items-center justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wider backdrop-blur">
                <Calendar size={11} strokeWidth={2.8} />
                Week {learningPlan.week}
              </span>
              <h2 className="mt-2.5 font-display text-[18px] font-extrabold leading-tight">
                {learningPlan.title}
              </h2>
            </div>
          </div>

          <div className="relative mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Days', value: learningPlan.days.length, size: 'text-[17px]' },
              { label: 'Min / day', value: dailyGoal, size: 'text-[17px]' },
              { label: 'Goal', value: goal?.label || 'General Fluency', size: 'text-[13px]' },
            ].map((s) => (
              <div key={s.label} className="min-w-0 rounded-2xl bg-white/15 px-3 py-2.5 backdrop-blur">
                <div className={`truncate font-display font-extrabold leading-tight ${s.size}`}>{s.value}</div>
                <div className="mt-1 text-[10.5px] font-semibold text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* outcomes */}
        <div className="mt-4 surface p-4">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
              <Target size={16} strokeWidth={2.5} />
            </span>
            <h3 className="text-[13.5px] font-extrabold text-ink-900">By the end of this week</h3>
          </div>
          <ul className="mt-3 space-y-2">
            {learningPlan.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2.5">
                <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <Check size={11} strokeWidth={3.4} />
                </span>
                <span className="text-[13px] font-medium leading-relaxed text-ink-600">{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* days */}
        <h3 className="title-md mb-3 mt-6">Week {learningPlan.week} schedule</h3>

        <div className="space-y-2.5">
          {learningPlan.days.map((d, i) => {
            const t = getTint(d.tint)
            const current = d.status === 'current'
            const locked = d.status === 'locked'
            return (
              <button
                key={d.day}
                type="button"
                onClick={() =>
                  locked
                    ? showToast(`Day ${d.day} unlocks after day ${d.day - 1}`, { variant: 'default' })
                    : navigate(DAY_ROUTES[d.skill] || '/conversation')
                }
                className={`press focus-ring relative flex w-full items-center gap-3 rounded-3xl border p-3.5 text-left transition duration-300 animate-slide-up ${
                  current
                    ? 'border-violet-200 bg-gradient-to-r from-violet-50/90 to-white shadow-card'
                    : 'border-ink-100 bg-white shadow-soft hover:border-ink-200'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative">
                  <span
                    className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white ${t.grad} ${
                      locked ? 'opacity-45' : t.glow
                    }`}
                  >
                    <Icon name={d.icon} size={20} strokeWidth={2.3} />
                  </span>
                  <span className="absolute -left-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-white text-[10px] font-extrabold text-ink-500 shadow-soft ring-1 ring-ink-100">
                    {d.day}
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`truncate font-display text-[14.5px] font-extrabold ${locked ? 'text-ink-500' : 'text-ink-900'}`}>
                      {d.title}
                    </h4>
                    {current && (
                      <span className="shrink-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                        Today
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[12px] text-ink-400">{d.desc}</p>
                  <div className="mt-1.5 flex items-center gap-2.5 text-[11px] font-bold text-ink-400">
                    <span className={`rounded-full px-1.5 py-0.5 ${t.soft} ${t.text}`}>{d.skill}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} strokeWidth={2.6} />
                      {d.minutes} min
                    </span>
                  </div>
                </div>

                <span className="shrink-0">
                  {current ? (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow">
                      <Play size={15} className="ml-0.5 fill-white" strokeWidth={2} />
                    </span>
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ink-100 text-ink-300">
                      <Lock size={14} strokeWidth={2.5} />
                    </span>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-6 safe-bottom">
          <Button to="/home" size="xl" iconRight={ArrowRight}>
            Start Day 1
          </Button>
          <p className="mt-3 text-center text-[12px] text-ink-400">
            Your plan adapts every week based on how you do.
          </p>
        </div>
      </div>
    </div>
  )
}
