import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Clock,
  Crown,
  Mic,
  Play,
  Sparkles,
} from 'lucide-react'
import { Screen } from '../components/layout/Screen'
import { Reveal } from '../components/layout/Reveal'
import { SectionHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Flag } from '../components/ui/Flag'
import { LevelBadge } from '../components/ui/Badges'
import { StreakCard } from '../components/ui/Streak'
import { ProgressBar, SkillBar } from '../components/ui/Progress'
import { ActionTile } from '../components/ui/SkillCard'
import { iconMap } from '../components/ui/Icon'
import { VocabularyMiniCard } from '../components/ui/VocabularyCard'
import { BottomSheet } from '../components/ui/Overlay'
import { AITeacher } from '../components/ai/AITeacher'
import { AIInsightCard } from '../components/ai/AIInsightCard'
import { Waveform } from '../components/ai/Waveform'
import { useApp } from '../context/appContext'
import { useInterval, formatTime } from '../hooks/useAnimations'
import {
  continueLesson,
  languages,
  quickPractice,
  skillProgress,
  user,
  vocabulary,
} from '../data/mock'

const greeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function Home() {
  const { languageId, setLanguageId, dailyGoal, minutesToday, savedWords, toggleSavedWord, showToast, isPremium } =
    useApp()
  const [sheetOpen, setSheetOpen] = useState(false)
  const [freeSeconds, setFreeSeconds] = useState(272) // 4:32 of free AI practice left

  const language = useMemo(() => languages.find((l) => l.id === languageId) || languages[0], [languageId])

  useInterval(() => setFreeSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)

  return (
    <Screen padded={false}>
      {/* ---------------- header ---------------- */}
      <div className="px-4 pt-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-[23px] font-extrabold leading-tight tracking-[-0.025em] text-ink-900">
              {greeting()}, {user.name} <span className="inline-block">👋</span>
            </h1>
            <p className="mt-1 text-[13.5px] text-ink-500">Ready to improve your English today?</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => showToast('You practiced 5 days in a row — keep going!', { variant: 'ai' })}
              className="press focus-ring relative grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-soft hover:text-ink-900"
            >
              <Bell size={17} strokeWidth={2.3} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 ring-2 ring-white" />
            </button>
            <Link
              to="/profile"
              aria-label="Open profile"
              className="press focus-ring grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 font-display text-[13px] font-extrabold text-white shadow-glow"
            >
              {user.initials}
            </Link>
          </div>
        </div>

        {/* language + level */}
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="press focus-ring mt-4 flex w-full items-center gap-2.5 rounded-2xl border border-ink-100 bg-white p-2.5 shadow-soft hover:border-ink-200"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-ink-50">
            <Flag code={language.id} size={22} />
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-[13.5px] font-extrabold text-ink-900">{language.name}</span>
            <span className="block text-[11.5px] font-medium text-ink-400">Learning language</span>
          </span>
          <LevelBadge level={user.level} name={user.levelName} size="sm" solid={false} />
          <ChevronDown size={16} className="shrink-0 text-ink-300" strokeWidth={2.5} />
        </button>
      </div>

      {/* ---------------- streak + goal ---------------- */}
      <Reveal className="mt-4 px-4">
        <StreakCard
          streak={user.streak}
          minutes={minutesToday}
          goal={dailyGoal}
          onClick={() => showToast(`${dailyGoal - minutesToday} minutes left today`, { variant: "default" })}
        />
      </Reveal>

      {/* ---------------- continue learning hero ---------------- */}
      <Reveal className="mt-4 px-4" delay={60}>
        <div className="relative overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-card">
          <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 px-4 pb-14 pt-4 text-white">
            <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
            <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-cyan-300/35 blur-2xl" />

            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] backdrop-blur">
                  <Play size={10} className="fill-white" strokeWidth={2} />
                  Continue Learning
                </span>
                <h2 className="mt-2.5 font-display text-[19px] font-extrabold leading-tight">
                  {continueLesson.section}: {continueLesson.title}
                </h2>
                <div className="mt-2 flex items-center gap-3 text-[12px] font-semibold text-white/80">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} strokeWidth={2.6} />
                    {continueLesson.minutes} min
                  </span>
                  <span>{continueLesson.step}</span>
                </div>
              </div>
              <AITeacher size={48} state="idle" halo={false} className="mt-1" />
            </div>
          </div>

          {/* overlap footer */}
          <div className="relative -mt-10 px-4 pb-4">
            <div className="rounded-3xl border border-ink-100 bg-white p-3.5 shadow-soft">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-[12px] font-bold text-ink-500">Lesson progress</span>
                <span className="font-display text-[13px] font-extrabold text-ink-900">
                  {continueLesson.progress}%
                </span>
              </div>
              <ProgressBar value={continueLesson.progress} tint="violet" height={8} />
              <Button
                to={`/lesson/${continueLesson.id}`}
                size="md"
                className="mt-3.5"
                iconRight={ArrowRight}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ---------------- daily AI practice ---------------- */}
      <Reveal className="mt-4 px-4">
        <div className="relative overflow-hidden rounded-4xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/70 p-4 shadow-soft">
          <div className="pointer-events-none absolute -right-10 -bottom-12 h-32 w-32 rounded-full bg-cyan-200/40 blur-2xl" />

          <div className="relative flex items-start gap-3">
            <AITeacher size={50} state="speaking" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="title-md">Daily AI Practice</h3>
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 font-mono text-[11px] font-bold tabular-nums text-violet-600 shadow-soft">
                  <Clock size={10} strokeWidth={2.8} />
                  {formatTime(freeSeconds)}
                </span>
              </div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-500">
                Practice speaking with your AI teacher.
                {!isPremium && <span className="font-semibold text-ink-600"> Free time remaining today.</span>}
              </p>
            </div>
          </div>

          <div className="relative mt-3.5 flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-2.5 backdrop-blur">
            <Waveform bars={22} active tint="violet" height={26} className="flex-1" />
            <span className="shrink-0 text-[11px] font-bold text-ink-400">Ready</span>
          </div>

          <Button to="/conversation" size="lg" className="relative mt-3.5" icon={Mic}>
            Start Conversation
          </Button>
        </div>
      </Reveal>

      {/* ---------------- quick practice ---------------- */}
      <Reveal className="mt-6 px-4">
        <SectionHeader title="Quick Practice" subtitle="Short drills, big gains" action="See all" actionTo="/practice" />
        <div className="stagger grid grid-cols-2 gap-3">
          {quickPractice.map((p) => (
            <ActionTile key={p.id} label={p.label} icon={p.icon} tint={p.tint} meta={p.meta} to={p.to} />
          ))}
        </div>
      </Reveal>

      {/* ---------------- AI recommendation ---------------- */}
      <Reveal className="mt-6 px-4">
        <AIInsightCard
          eyebrow="AI Recommendation"
          action="Practice Pronunciation"
          to="/pronunciation"
          state="thinking"
        >
          Your AI teacher noticed that pronunciation needs more practice.
        </AIInsightCard>
      </Reveal>

      {/* ---------------- today's vocabulary ---------------- */}
      <Reveal className="mt-6">
        <div className="px-4">
          <SectionHeader
            title="Today’s Vocabulary"
            subtitle={`${vocabulary.length} new words picked for you`}
            action="Open"
            actionTo="/vocabulary"
          />
        </div>
        <div className="no-scrollbar flex gap-3 overflow-x-auto px-4 pb-2">
          {vocabulary.slice(0, 3).map((v) => (
            <VocabularyMiniCard
              key={v.id}
              item={v}
              saved={savedWords.has(v.id)}
              onSave={() => toggleSavedWord(v.id, v.word)}
              onListen={() => showToast(`Playing “${v.word}”`, { variant: 'ai' })}
            />
          ))}
          <Link
            to="/vocabulary"
            className="press flex w-[110px] shrink-0 flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-ink-200 bg-white/70 text-ink-400 hover:border-violet-300 hover:text-violet-600"
          >
            <ArrowRight size={18} strokeWidth={2.5} />
            <span className="text-[12px] font-bold">See all</span>
          </Link>
        </div>
      </Reveal>

      {/* ---------------- learning progress ---------------- */}
      <Reveal className="mt-5 px-4">
        <SectionHeader title="Learning Progress" subtitle="This week" action="Details" actionTo="/progress" />
        <div className="surface space-y-3.5 p-4">
          {skillProgress.slice(0, 4).map((s) => (
            <SkillBar
              key={s.key}
              label={s.label}
              value={s.value}
              delta={s.delta}
              tint={s.tint}
              icon={iconMap[s.icon]}
            />
          ))}
          <Link
            to="/progress"
            className="press focus-ring flex items-center justify-center gap-1 pt-1 text-[12.5px] font-bold text-violet-600"
          >
            View full progress
            <ArrowRight size={14} strokeWidth={2.6} />
          </Link>
        </div>
      </Reveal>

      {/* ---------------- premium strip ---------------- */}
      {!isPremium && (
        <Reveal className="mt-5 px-4">
          <Link
            to="/premium"
            className="press group relative flex items-center gap-3 overflow-hidden rounded-4xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 p-4 text-white shadow-[0_18px_40px_-18px_rgba(249,115,22,0.9)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Crown size={20} strokeWidth={2.4} />
            </span>
            <span className="relative min-w-0 flex-1">
              <span className="block font-display text-[15px] font-extrabold">Unlock unlimited practice</span>
              <span className="mt-0.5 block text-[12px] font-medium text-white/85">
                Premium from $2.49 / month
              </span>
            </span>
            <ArrowRight size={18} strokeWidth={2.6} className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      )}

      {/* ---------------- language sheet ---------------- */}
      <BottomSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Learning language"
        subtitle="Your AI teacher switches instantly."
      >
        <div className="space-y-2 pb-2">
          {languages.map((l) => {
            const active = l.id === languageId
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => {
                  setLanguageId(l.id)
                  setSheetOpen(false)
                  showToast(`Now learning ${l.name}`, { variant: 'success' })
                }}
                className={`press focus-ring flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${
                  active ? 'border-violet-200 bg-violet-50/70' : 'border-ink-100 bg-white hover:border-ink-200'
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink-50">
                  <Flag code={l.id} size={24} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[14px] font-extrabold text-ink-900">{l.name}</span>
                  <span className="block truncate text-[11.5px] text-ink-400">{l.desc}</span>
                </span>
                {active && (
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white">
                    <Check size={13} strokeWidth={3.2} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </BottomSheet>

      {/* footer note */}
      <p className="mt-6 flex items-center justify-center gap-1.5 px-4 text-center text-[11.5px] font-medium text-ink-300">
        <Sparkles size={11} strokeWidth={2.6} />
        Learn. Speak. Improve. Every Day.
      </p>
    </Screen>
  )
}
