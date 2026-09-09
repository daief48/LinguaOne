import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Lock, Sparkles, Trophy } from 'lucide-react'
import { Screen } from '../components/layout/Screen'
import { SectionHeader } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { LessonCard } from '../components/ui/LessonCard'
import { ProgressBar } from '../components/ui/Progress'
import { LevelBadge } from '../components/ui/Badges'
import { coursePath, learnSections, levelJourney, user } from '../data/mock'
import { tint as getTint } from '../data/tints'

export default function Learn() {
  const [section, setSection] = useState('speaking')
  const active = learnSections.find((s) => s.id === section)
  const lessons = coursePath[section] || []
  const t = getTint(active?.tint || 'violet')

  const overall = 42

  return (
    <Screen padded={false}>
      {/* header */}
      <div className="px-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="title-xl">Your Learning Journey</h1>
            <p className="mt-1 text-[13.5px] text-ink-500">Structured lessons, unlocked as you go.</p>
          </div>
          <LevelBadge level={user.level} size="md" />
        </div>

        {/* level card */}
        <div className="relative mt-4 overflow-hidden rounded-4xl border border-ink-100 bg-white p-4 shadow-card">
          <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-violet-100/70 blur-2xl" />

          <div className="relative flex items-center justify-between">
            <div>
              <span className="eyebrow">Current level</span>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-[26px] font-extrabold leading-none text-ink-900">
                  {user.level}
                </span>
                <span className="font-display text-[15px] font-bold text-ink-500">{user.levelName}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-[24px] font-extrabold leading-none gradient-text">{overall}%</div>
              <div className="mt-1 text-[11px] font-semibold text-ink-400">to B2</div>
            </div>
          </div>

          <ProgressBar value={overall} tint="violet" height={9} className="relative mt-3.5" striped />

          {/* level journey */}
          <div className="relative mt-4 flex items-center gap-1.5">
            {levelJourney.map((l) => (
              <span
                key={l.level}
                className={`grid h-7 flex-1 place-items-center rounded-lg text-[11px] font-extrabold transition ${
                  l.state === 'current'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-glow'
                    : l.state === 'done'
                      ? 'bg-violet-50 text-violet-600'
                      : 'bg-ink-100 text-ink-300'
                }`}
              >
                {l.level}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* section chips */}
      <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
        {learnSections.map((s) => {
          const st = getTint(s.tint)
          const isActive = s.id === section
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`press focus-ring flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 transition-all duration-300 ${
                isActive
                  ? `border-transparent bg-gradient-to-r text-white ${st.grad} ${st.glow}`
                  : 'border-ink-100 bg-white text-ink-600 shadow-soft hover:border-ink-200'
              }`}
            >
              <Icon name={s.icon} size={15} strokeWidth={2.4} />
              <span className="text-[13px] font-bold">{s.label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                  isActive ? 'bg-white/25' : 'bg-ink-100 text-ink-400'
                }`}
              >
                {s.progress}%
              </span>
            </button>
          )
        })}
      </div>

      {/* section summary */}
      <div className="mt-4 px-4">
        <div className={`flex items-center gap-3 rounded-3xl border p-3.5 ${t.softBorder} ${t.soft}`}>
          <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white ${t.grad} ${t.glow}`}>
            <Icon name={active.icon} size={19} strokeWidth={2.3} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="title-md">{active.label} path</h2>
            <p className="text-[12px] text-ink-500">
              {lessons.filter((l) => l.status === 'done').length} of {active.lessons} lessons complete
            </p>
          </div>
          <div className="text-right">
            <div className={`font-display text-[18px] font-extrabold leading-none ${t.text}`}>
              {active.progress}%
            </div>
          </div>
        </div>
      </div>

      {/* course path */}
      <div className="mt-5 px-4">
        <SectionHeader title="Course path" subtitle="Complete a lesson to unlock the next" />
        <div key={section} className="space-y-2.5 animate-fade-in">
          {lessons.map((lesson, i) => (
            <LessonCard
              key={lesson.id}
              index={i + 1}
              title={lesson.title}
              minutes={lesson.minutes}
              xp={lesson.xp}
              status={lesson.status}
              progress={lesson.progress}
              tint={active.tint}
              isLast={i === lessons.length - 1}
              to={lesson.status !== 'locked' ? `/lesson/${lesson.id}` : undefined}
            />
          ))}
        </div>
      </div>

      {/* end of path */}
      <div className="mt-4 px-4">
        <div className="flex items-center gap-3 rounded-3xl border border-dashed border-ink-200 bg-white/70 p-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-500">
            <Trophy size={18} strokeWidth={2.4} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13.5px] font-extrabold text-ink-800">{active.label} milestone</p>
            <p className="text-[12px] text-ink-400">Finish the path to unlock the B2 level test.</p>
          </div>
          <Lock size={16} className="shrink-0 text-ink-300" strokeWidth={2.4} />
        </div>
      </div>

      {/* recap */}
      <div className="mt-5 px-4">
        <div className="surface p-4">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles size={15} className="text-violet-500" strokeWidth={2.5} />
            <h3 className="text-[13.5px] font-extrabold text-ink-900">All sections</h3>
          </div>
          <div className="space-y-3">
            {learnSections.map((s) => {
              const st = getTint(s.tint)
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSection(s.id)}
                  className="press flex w-full items-center gap-3 text-left"
                >
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${st.soft} ${st.text}`}>
                    <Icon name={s.icon} size={15} strokeWidth={2.4} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between">
                      <span className="text-[13px] font-bold text-ink-700">{s.label}</span>
                      <span className="text-[12px] font-extrabold text-ink-900">{s.progress}%</span>
                    </span>
                    <ProgressBar value={s.progress} tint={s.tint} height={5} className="mt-1.5" />
                  </span>
                </button>
              )
            })}
          </div>
          <Link
            to="/practice"
            className="press focus-ring mt-4 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl2 bg-ink-100 text-[13px] font-bold text-ink-700 hover:bg-ink-200"
          >
            <Check size={14} strokeWidth={2.8} />
            Practice what you learned
          </Link>
        </div>
      </div>
    </Screen>
  )
}
