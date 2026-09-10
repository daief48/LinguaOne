import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { FlowHeader } from '../components/layout/FlowHeader'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { AITeacher } from '../components/ai/AITeacher'
import { useApp } from '../context/appContext'
import { learningGoals } from '../data/mock'
import { tint as getTint } from '../data/tints'

export default function LearningGoal() {
  const navigate = useNavigate()
  const { goalId, setGoalId } = useApp()
  const selected = learningGoals.find((g) => g.id === goalId)

  return (
    <div className="flex flex-1 flex-col">
      <FlowHeader
        step={2}
        title="What is your main goal?"
        subtitle="Your AI teacher builds a different plan for each goal."
        backTo="/language"
      />

      <div className="mt-6 grid grid-cols-2 gap-3 px-5 pb-4">
        {learningGoals.map((goal, i) => {
          const active = goal.id === goalId
          const t = getTint(goal.tint)
          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => setGoalId(goal.id)}
              className={`press focus-ring relative overflow-hidden rounded-3xl border p-3.5 text-left transition-all duration-300 animate-slide-up ${
                active
                  ? 'border-violet-300 bg-white shadow-card ring-1 ring-violet-200'
                  : 'border-ink-100 bg-white shadow-soft hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card'
              }`}
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <span
                className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br ${t.grad} opacity-[0.14] blur-xl transition-opacity duration-300 ${
                  active ? 'opacity-30' : ''
                }`}
              />
              <span className="relative flex items-start justify-between">
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl2 bg-gradient-to-br text-white ${t.grad} ${t.glow}`}
                >
                  <Icon name={goal.icon} size={18} strokeWidth={2.3} />
                </span>
                {active && (
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-glow">
                    <Check size={13} strokeWidth={3.2} />
                  </span>
                )}
              </span>
              <span className="relative mt-3 block font-display text-[14.5px] font-extrabold leading-tight text-ink-900">
                {goal.label}
              </span>
              <span className="relative mt-1 block text-[11.5px] leading-snug text-ink-400">{goal.desc}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-auto px-5 pb-6 pt-4">
        {selected && (
          <div className="mb-3 flex items-center gap-2.5 rounded-2xl border border-violet-100 bg-violet-50/70 p-2.5">
            <AITeacher size={30} halo={false} />
            <p className="text-[12.5px] font-semibold leading-snug text-ink-700">
              Great choice — I’ll focus your plan on{' '}
              <span className="font-extrabold text-violet-700">{selected.label.toLowerCase()}</span>.
            </p>
          </div>
        )}
        <Button onClick={() => navigate('/daily-goal')} size="xl" iconRight={ArrowRight}>
          Continue
        </Button>
      </div>
    </div>
  )
}
