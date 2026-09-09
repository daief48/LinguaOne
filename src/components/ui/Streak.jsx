import { Flame } from 'lucide-react'
import { CircularProgress, ProgressBar } from './Progress'

const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/** Week dots — filled days count toward the current streak. */
export function StreakWeek({ done = 7, todayIndex = 6, className = '', dark = false }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {DAY_LETTERS.map((d, i) => {
        const complete = i < done
        const isToday = i === todayIndex
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-extrabold transition ${
                complete
                  ? 'bg-gradient-to-br from-orange-400 to-amber-400 text-white shadow-[0_4px_10px_-4px_rgba(249,115,22,0.9)]'
                  : dark
                    ? 'bg-white/15 text-white/50'
                    : 'bg-ink-100 text-ink-300'
              } ${isToday ? (dark ? 'ring-2 ring-white/60' : 'ring-2 ring-orange-200') : ''}`}
            >
              {complete ? <Flame size={11} strokeWidth={2.8} className="fill-white/40" /> : d}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/** Streak + daily goal, the pair that anchors the Home dashboard. */
export function StreakCard({ streak = 7, minutes = 12, goal = 15, className = '', onClick }) {
  const pct = Math.min(100, Math.round((minutes / goal) * 100))
  const remaining = Math.max(0, goal - minutes)

  return (
    <div
      className={`relative overflow-hidden rounded-4xl bg-gradient-to-br from-orange-500 via-rose-500 to-violet-600 p-4 text-white shadow-[0_18px_44px_-18px_rgba(249,115,22,0.8)] ${className}`}
    >
      <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-violet-400/30 blur-2xl" />

      <div className="relative flex items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl2 bg-white/20 backdrop-blur">
              <Flame size={19} strokeWidth={2.4} className="fill-amber-200/70 text-white" />
            </span>
            <div>
              <div className="font-display text-[22px] font-extrabold leading-none">{streak} Day Streak</div>
              <div className="mt-1 text-[12px] font-medium text-white/80">Keep it alive — practice today</div>
            </div>
          </div>
          <StreakWeek done={streak} className="mt-3.5" dark />
        </div>

        <button
          type="button"
          onClick={onClick}
          className="press focus-ring shrink-0 rounded-full"
          aria-label="Daily goal progress"
        >
          <CircularProgress
            value={pct}
            size={78}
            stroke={7}
            tint="amber"
            trackColor="rgba(255,255,255,0.25)"
          >
            <div className="text-center leading-none text-white">
              <div className="font-display text-[15px] font-extrabold">
                {minutes}
                <span className="text-white/70">/{goal}</span>
              </div>
              <div className="mt-1 text-[9.5px] font-bold uppercase tracking-wider text-white/70">min</div>
            </div>
          </CircularProgress>
        </button>
      </div>

      <div className="relative mt-3.5 flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-2 backdrop-blur">
        <span className="text-[12px] font-semibold text-white/90">
          {remaining > 0 ? `${remaining} min left to hit today’s goal` : 'Daily goal complete — nice work!'}
        </span>
      </div>
    </div>
  )
}

/** Slim daily-goal row for screens that already have a hero. */
export function DailyGoalRow({ minutes = 12, goal = 15, className = '' }) {
  const pct = Math.min(100, Math.round((minutes / goal) * 100))
  return (
    <div className={`surface p-3.5 ${className}`}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[13px] font-bold text-ink-800">Daily goal</span>
        <span className="font-display text-[13px] font-extrabold text-ink-900">
          {minutes} <span className="text-ink-300">/ {goal} min</span>
        </span>
      </div>
      <ProgressBar value={pct} tint="orange" height={8} />
    </div>
  )
}

export default StreakCard
