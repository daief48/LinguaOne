import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, Flame, Info, Sparkles, TrendingDown, TrendingUp, Zap } from 'lucide-react'
import { Screen } from '../components/layout/Screen'
import { SectionHeader, StatTile } from '../components/ui/Card'
import { LevelBadge } from '../components/ui/Badges'
import { CircularProgress, ProgressBar, SkillBar } from '../components/ui/Progress'
import { iconMap } from '../components/ui/Icon'
import { AIInsightCard } from '../components/ai/AIInsightCard'
import { BottomSheet } from '../components/ui/Overlay'
import { useApp } from '../context/appContext'
import { useCountUp, useMounted } from '../hooks/useAnimations'
import {
  commonMistakes,
  levelJourney,
  progressInsight,
  progressStats,
  skillProgress,
  user,
  weeklyActivity,
} from '../data/mock'

const CHART_H = 92 // px of drawable bar area

function WeeklyChart() {
  const ready = useMounted(150)
  const max = Math.max(...weeklyActivity.map((d) => d.minutes), 25)
  const total = weeklyActivity.reduce((sum, d) => sum + d.minutes, 0)
  const avg = Math.round(total / weeklyActivity.length)

  return (
    <div className="surface p-4">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="title-md">Weekly activity</h3>
          <p className="mt-0.5 text-[12px] text-ink-400">
            {total} minutes · {avg} min/day average
          </p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-extrabold text-emerald-600">
          <TrendingUp size={11} strokeWidth={3} />
          +18%
        </span>
      </div>

      {/* Bar heights are in px — percentage heights don't resolve inside a
          flex item that has no definite height. */}
      <div className="relative flex h-[112px] items-end gap-2 pt-5">
        <div
          className="pointer-events-none absolute inset-x-0 border-t border-dashed border-violet-300"
          style={{ bottom: `${(15 / max) * CHART_H}px` }}
        >
          <span className="absolute -top-2 left-0 rounded bg-white pr-1 text-[9px] font-extrabold text-violet-500">
            goal
          </span>
        </div>

        {weeklyActivity.map((d, i) => {
          const h = (d.minutes / max) * CHART_H
          const hit = d.minutes >= d.goal
          return (
            <div key={d.day} className="relative flex flex-1 items-end">
              {d.today && (
                <span
                  className="absolute left-1/2 z-10 -translate-x-1/2 rounded-md bg-ink-900 px-1.5 py-0.5 text-[9.5px] font-extrabold text-white"
                  style={{ bottom: `${h + 6}px` }}
                >
                  {d.minutes}m
                </span>
              )}
              <div
                className={`w-full rounded-t-lg transition-[height] duration-700 ease-out ${
                  d.today
                    ? 'bg-gradient-to-t from-violet-600 to-cyan-400'
                    : hit
                      ? 'bg-gradient-to-t from-violet-400 to-violet-300'
                      : 'bg-ink-200'
                }`}
                style={{ height: ready ? `${h}px` : '0px', transitionDelay: `${i * 60}ms` }}
              />
            </div>
          )
        })}
      </div>

      <div className="mt-2 flex gap-2">
        {weeklyActivity.map((d) => (
          <span
            key={d.day}
            className={`flex-1 text-center text-[10.5px] font-bold ${
              d.today ? 'text-violet-600' : 'text-ink-400'
            }`}
          >
            {d.day}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Progress() {
  const { xp } = useApp()
  const [mistake, setMistake] = useState(null)
  const xpCount = useCountUp(xp, { duration: 1200 })
  const levelPct = Math.min(100, Math.round((xp / user.xpToNextLevel) * 100))

  return (
    <Screen padded={false}>
      {/* header */}
      <div className="px-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="title-xl">Your Progress</h1>
            <p className="mt-1 text-[13.5px] text-ink-500">Everything you have built so far.</p>
          </div>
          <LevelBadge level={user.level} name={user.levelName} size="md" />
        </div>

        {/* level hero */}
        <div className="relative mt-4 overflow-hidden rounded-4xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-4 text-white shadow-[0_20px_46px_-20px_rgba(79,70,229,0.9)]">
          <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-cyan-300/30 blur-2xl" />

          <div className="relative flex items-center gap-4">
            <CircularProgress
              value={levelPct}
              size={86}
              stroke={8}
              tint="cyan"
              trackColor="rgba(255,255,255,0.22)"
            >
              <div className="text-center leading-none">
                <div className="font-display text-[22px] font-extrabold">{user.level}</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-wider text-white/70">level</div>
              </div>
            </CircularProgress>

            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <Zap size={16} className="text-amber-300" strokeWidth={2.8} />
                <span className="font-display text-[26px] font-extrabold leading-none tabular-nums">
                  {xpCount.toLocaleString()}
                </span>
                <span className="text-[12px] font-bold text-white/70">XP</span>
              </div>
              <p className="mt-1.5 text-[12px] font-medium text-white/75">
                {user.xpToNextLevel - xp} XP to reach B2
              </p>
              <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-white transition-[width] duration-1000 ease-out"
                  style={{ width: `${levelPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* level path */}
          <div className="relative mt-4 flex items-center gap-1">
            {levelJourney.map((l) => (
              <span
                key={l.level}
                className={`flex-1 rounded-lg py-1 text-center text-[10.5px] font-extrabold ${
                  l.state === 'current'
                    ? 'bg-white text-violet-700'
                    : l.state === 'done'
                      ? 'bg-white/25 text-white'
                      : 'bg-white/10 text-white/50'
                }`}
              >
                {l.level}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="reveal mt-4 px-4">
        <div className="grid grid-cols-3 gap-2.5">
          {progressStats.map((s, i) => (
            <div key={s.key} className="animate-slide-up" style={{ animationDelay: `${i * 50}ms` }}>
              <StatTile label={s.label} value={s.value} name={s.icon} tint={s.tint} />
            </div>
          ))}
        </div>
      </div>

      {/* weekly chart */}
      <div className="reveal mt-5 px-4">
        <WeeklyChart />
      </div>

      {/* skills */}
      <div className="reveal mt-5 px-4">
        <SectionHeader title="Skill breakdown" subtitle="Change vs. last week" />
        <div className="surface space-y-3.5 p-4">
          {skillProgress.map((s) => (
            <SkillBar
              key={s.key}
              label={s.label}
              value={s.value}
              delta={s.delta}
              tint={s.tint}
              icon={iconMap[s.icon]}
            />
          ))}
        </div>
      </div>

      {/* AI insight */}
      <div className="reveal mt-5 px-4">
        <AIInsightCard eyebrow="AI Insight" action="Practice speaking" to="/conversation" state="thinking">
          {progressInsight}
        </AIInsightCard>
      </div>

      {/* common mistakes */}
      <div className="reveal mt-5 px-4">
        <SectionHeader title="Common Mistakes" subtitle="What your AI teacher keeps correcting" />
        <div className="space-y-2.5">
          {commonMistakes.map((m, i) => (
            <button
              key={m.rank}
              type="button"
              onClick={() => setMistake(m)}
              className="tap-card surface flex w-full items-center gap-3 p-3.5 animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl2 bg-ink-100 font-display text-[14px] font-extrabold text-ink-500">
                {m.rank}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-extrabold text-ink-900">{m.title}</span>
                <span className="mt-0.5 block truncate text-[12px] text-ink-400">{m.desc}</span>
              </span>
              <span className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-[12.5px] font-extrabold text-ink-700">{m.count}×</span>
                <span
                  className={`flex items-center gap-0.5 text-[10.5px] font-extrabold ${
                    m.trend < 0 ? 'text-emerald-500' : 'text-rose-500'
                  }`}
                >
                  {m.trend < 0 ? <TrendingDown size={10} strokeWidth={3} /> : <TrendingUp size={10} strokeWidth={3} />}
                  {Math.abs(m.trend)}
                </span>
              </span>
              <ChevronRight size={16} className="shrink-0 text-ink-300" strokeWidth={2.4} />
            </button>
          ))}
        </div>
      </div>

      {/* streak recap */}
      <div className="reveal mt-5 px-4">
        <div className="flex items-center gap-3 rounded-4xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-amber-50/60 p-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_10px_26px_-10px_rgba(249,115,22,0.9)]">
            <Flame size={22} strokeWidth={2.4} className="fill-white/30" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-[15px] font-extrabold text-ink-900">
              {user.streak} day streak — your best yet
            </p>
            <p className="mt-0.5 text-[12px] text-ink-500">23 more days unlocks the 30-day badge.</p>
            <ProgressBar value={(user.streak / 30) * 100} tint="orange" height={6} className="mt-2" />
          </div>
        </div>
      </div>

      <div className="reveal mt-5 px-4">
        <Link
          to="/premium"
          className="press focus-ring flex items-center justify-center gap-1.5 rounded-2xl border border-ink-200 bg-white py-3 text-[13px] font-bold text-ink-600 shadow-soft hover:border-ink-300"
        >
          <Sparkles size={14} className="text-violet-500" strokeWidth={2.6} />
          Unlock full analytics with Premium
          <ArrowRight size={14} strokeWidth={2.6} />
        </Link>
      </div>

      {/* mistake detail */}
      <BottomSheet
        open={Boolean(mistake)}
        onClose={() => setMistake(null)}
        title={mistake?.title}
        subtitle={mistake ? `${mistake.count} corrections in the last 30 days` : ''}
        footer={
          <Link
            to="/grammar"
            onClick={() => setMistake(null)}
            className="press focus-ring flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 font-display text-[15px] font-bold text-white shadow-glow"
          >
            Practice this pattern
            <ArrowRight size={17} strokeWidth={2.6} />
          </Link>
        }
      >
        {mistake && (
          <div className="space-y-3 pb-2">
            <p className="text-[13.5px] leading-relaxed text-ink-600">{mistake.desc}</p>
            <div className="rounded-2xl border border-ink-100 bg-ink-50 p-3.5">
              <span className="eyebrow mb-1.5 block">Typical example</span>
              <p className="text-[13px] font-semibold leading-relaxed text-ink-800">{mistake.example}</p>
            </div>
            <div className="flex items-start gap-2.5 rounded-2xl border border-cyan-100 bg-cyan-50/70 p-3">
              <Info size={15} className="mt-0.5 shrink-0 text-cyan-600" strokeWidth={2.5} />
              <p className="text-[12.5px] leading-relaxed text-cyan-900">
                You are already {Math.abs(mistake.trend)} corrections better than last month. Keep drilling this
                pattern for two more sessions.
              </p>
            </div>
          </div>
        )}
      </BottomSheet>
    </Screen>
  )
}
