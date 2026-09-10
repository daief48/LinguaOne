import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Check, ChevronRight, Clock, Lock, Play, Sparkles, Volume2, Zap } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { ProgressBar } from '../components/ui/Progress'
import { AITeacher } from '../components/ai/AITeacher'
import { StatusBar } from '../components/layout/StatusBar'
import { useApp } from '../context/appContext'
import { coursePath, lessonDetail } from '../data/mock'
import { tint as getTint } from '../data/tints'

const findLesson = (id) => {
  for (const list of Object.values(coursePath)) {
    const hit = list.find((l) => l.id === id)
    if (hit) return hit
  }
  return null
}

/** Each part of a lesson opens the screen that actually teaches it. */
const SECTION_ROUTES = {
  learn: (id) => `/lesson/${id}/study`,
  listen: () => '/listening',
  speak: () => '/conversation',
  practice: () => '/grammar',
}

export default function LessonDetail() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { showToast } = useApp()

  const lesson = useMemo(() => {
    const base = findLesson(lessonId)
    if (!base || base.id === lessonDetail.id) return lessonDetail
    return {
      ...lessonDetail,
      id: base.id,
      title: base.title,
      minutes: base.minutes,
      xp: base.xp,
      progress: base.progress ?? 0,
    }
  }, [lessonId])

  const openSection = (section, locked) => {
    if (locked) {
      showToast('Finish the previous part first', { variant: 'default' })
      return
    }
    const to = SECTION_ROUTES[section.id]
    navigate(to ? to(lesson.id) : '/conversation')
  }

  return (
    <div className="flex-1 pb-8">
      {/* hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 pb-16 text-white sm:pt-[42px]">
        <StatusBar dark className="absolute inset-x-0 top-0" />
        <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl" />

        <TopBar variant="dark" border={false} fallback="/learn" />

        <div className="relative px-5 pt-1">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] backdrop-blur">
                <Sparkles size={10} strokeWidth={2.8} />
                {lesson.skills[0]} lesson
              </span>
              <h1 className="mt-3 font-display text-[25px] font-extrabold leading-tight tracking-[-0.025em]">
                {lesson.title}
              </h1>
              <p className="mt-2 max-w-[270px] text-[13px] leading-relaxed text-white/80">{lesson.subtitle}</p>
            </div>
            <AITeacher size={54} state="idle" halo={false} className="mt-1" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11.5px] font-bold backdrop-blur">
              <Clock size={11} strokeWidth={2.6} />
              {lesson.minutes} minutes
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11.5px] font-bold backdrop-blur">
              <Zap size={11} strokeWidth={2.8} />
              {lesson.xp} XP
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11.5px] font-bold backdrop-blur">
              {lesson.level}
            </span>
          </div>
        </div>
      </div>

      {/* progress card */}
      <div className="relative z-10 -mt-11 px-4">
        <div className="surface p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <div>
              <span className="eyebrow">Your progress</span>
              <p className="mt-0.5 text-[13px] font-bold text-ink-800">
                {lesson.sections.filter((s) => s.status === 'done').length} of {lesson.sections.length} parts done
              </p>
            </div>
            <span className="font-display text-[20px] font-extrabold gradient-text">{lesson.progress}%</span>
          </div>
          <ProgressBar value={lesson.progress} tint="violet" height={8} />

          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {lesson.skills.map((s) => (
              <span key={s} className="rounded-full bg-violet-50 px-2.5 py-1 text-[11.5px] font-bold text-violet-600">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* sections */}
      <div className="reveal mt-5 px-4">
        <h2 className="title-md mb-3">What you’ll do</h2>
        <div className="space-y-2.5">
          {lesson.sections.map((s, i) => {
            const t = getTint(s.tint)
            const done = s.status === 'done'
            const current = s.status === 'current'
            const locked = s.status === 'locked'
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => openSection(s, locked)}
                className={`press focus-ring flex w-full items-center gap-3 rounded-3xl border p-3.5 text-left transition duration-300 animate-slide-up ${
                  current
                    ? 'border-violet-200 bg-gradient-to-r from-violet-50/80 to-white shadow-card'
                    : 'border-ink-100 bg-white shadow-soft hover:border-ink-200'
                }`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                    locked
                      ? 'bg-ink-100 text-ink-300'
                      : `bg-gradient-to-br text-white ${t.grad} ${t.glow}`
                  }`}
                >
                  {locked ? <Lock size={17} strokeWidth={2.5} /> : <Icon name={s.icon} size={18} strokeWidth={2.3} />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className={`font-display text-[14.5px] font-extrabold ${locked ? 'text-ink-500' : 'text-ink-900'}`}>
                      {s.label}
                    </span>
                    {done && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-extrabold text-emerald-600">
                        <Check size={9} strokeWidth={3.5} />
                        Done
                      </span>
                    )}
                    {current && (
                      <span className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                        Next
                      </span>
                    )}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-ink-400">{s.desc}</span>
                </span>

                <span className="flex shrink-0 items-center gap-1.5 text-[11.5px] font-bold text-ink-400">
                  {s.minutes}m
                  <ChevronRight size={15} className="text-ink-300" strokeWidth={2.4} />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* vocabulary */}
      <div className="reveal mt-6 px-4">
        <h2 className="title-md mb-3">Key vocabulary</h2>
        <div className="surface divide-y divide-ink-100 p-0">
          {lesson.vocabulary.map((v) => (
            <div key={v.word} className="flex items-center gap-3 p-3.5">
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[14.5px] font-extrabold text-ink-900">{v.word}</span>
                  <span className="font-mono text-[11px] text-ink-400">{v.phonetic}</span>
                </div>
                <p className="mt-0.5 text-[12.5px] leading-snug text-ink-500">{v.meaning}</p>
              </div>
              <button
                type="button"
                onClick={() => showToast(`Playing “${v.word}”`, { variant: 'ai' })}
                aria-label={`Listen to ${v.word}`}
                className="press focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-50 text-violet-600 hover:bg-violet-100"
              >
                <Volume2 size={15} strokeWidth={2.4} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto px-4 pb-6 pt-4">
        <Button to={`/lesson/${lesson.id}/study`} size="xl" icon={Play}>
          Start Lesson
        </Button>
      </div>
    </div>
  )
}
