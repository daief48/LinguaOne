import { Link } from 'react-router-dom'
import { ChevronRight, Crown, Flame, LogOut, Pencil, Settings as SettingsIcon, Zap } from 'lucide-react'
import { Screen } from '../components/layout/Screen'
import { SectionHeader } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { LevelBadge, PremiumBadge } from '../components/ui/Badges'
import { ProgressBar } from '../components/ui/Progress'
import { StatusBar } from '../components/layout/StatusBar'
import { Flag } from '../components/ui/Flag'
import { useApp } from '../context/appContext'
import { achievements, dailyGoalOptions, languages, learningGoals, profileMenu, user } from '../data/mock'
import { tint as getTint } from '../data/tints'

export default function Profile() {
  const { xp, dailyGoal, goalId, languageId, isPremium, showToast } = useApp()
  const language = languages.find((l) => l.id === languageId) || languages[0]
  const goal = learningGoals.find((g) => g.id === goalId) || learningGoals[0]
  const goalOption = dailyGoalOptions.find((d) => d.minutes === dailyGoal)
  const earned = achievements.filter((a) => a.earned)

  return (
    <Screen padded={false}>
      {/* header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 px-4 pb-14 pt-4 text-white sm:pt-[58px]">
        <StatusBar dark className="absolute inset-x-0 top-0" />
        <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
        <div className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full bg-cyan-300/30 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <h1 className="font-display text-[17px] font-extrabold">Profile</h1>
          <Link
            to="/settings"
            aria-label="Open settings"
            className="press focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20"
          >
            <SettingsIcon size={18} strokeWidth={2.3} />
          </Link>
        </div>

        <div className="relative mt-5 flex items-center gap-4">
          <div className="relative">
            <div className="grid h-[74px] w-[74px] place-items-center rounded-[26px] bg-white/20 font-display text-[26px] font-extrabold backdrop-blur ring-2 ring-white/40">
              {user.initials}
            </div>
            <button
              type="button"
              onClick={() => showToast('Photo picker is disabled in this demo', { variant: 'default' })}
              aria-label="Change photo"
              className="press absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full bg-white text-violet-600 shadow-card"
            >
              <Pencil size={12} strokeWidth={2.8} />
            </button>
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate font-display text-[22px] font-extrabold leading-tight">{user.fullName}</h2>
              {isPremium && <PremiumBadge size="sm" />}
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <LevelBadge level={user.level} name={user.levelName} size="sm" solid={false} className="bg-white/20 text-white" />
            </div>
            <p className="mt-1.5 text-[11.5px] text-white/65">Member since {user.memberSince}</p>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="relative z-10 -mt-9 px-4">
        <div className="surface grid grid-cols-3 divide-x divide-ink-100 p-0">
          {[
            { label: 'Day streak', value: user.streak, icon: Flame, tint: 'text-orange-500' },
            { label: 'Total XP', value: xp.toLocaleString(), icon: Zap, tint: 'text-amber-500' },
            { label: 'Words', value: user.wordsLearned, icon: null, tint: '' },
          ].map((s) => (
            <div key={s.label} className="px-2 py-3.5 text-center">
              <div className="flex items-center justify-center gap-1">
                {s.icon && <s.icon size={14} className={s.tint} strokeWidth={2.8} />}
                <span className="font-display text-[19px] font-extrabold leading-none text-ink-900">{s.value}</span>
              </div>
              <div className="mt-1.5 text-[11px] font-semibold text-ink-400">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* learning setup */}
      <div className="reveal mt-5 px-4">
        <SectionHeader title="Learning" action="Edit" actionTo="/settings" />
        <div className="surface divide-y divide-ink-100 p-0">
          <div className="flex items-center gap-3 p-3.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl2 bg-ink-50">
              <Flag code={language.id} size={24} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-extrabold text-ink-900">{language.name}</p>
              <p className="text-[11.5px] text-ink-400">Learning language</p>
            </div>
            <LevelBadge level={user.level} size="sm" solid={false} />
          </div>

          <div className="flex items-center gap-3 p-3.5">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl2 bg-gradient-to-br text-white ${getTint(goal.tint).grad}`}>
              <Icon name={goal.icon} size={17} strokeWidth={2.3} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[13.5px] font-extrabold text-ink-900">{goal.label}</p>
              <p className="text-[11.5px] text-ink-400">Your main goal</p>
            </div>
          </div>

          <div className="p-3.5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl2 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                <Flame size={17} strokeWidth={2.4} className="fill-white/25" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[13.5px] font-extrabold text-ink-900">{dailyGoal} minutes a day</p>
                <p className="text-[11.5px] text-ink-400">{goalOption?.label || 'Custom'} pace</p>
              </div>
              <span className="text-[12px] font-extrabold text-ink-700">{user.streak} days</span>
            </div>
            <ProgressBar value={(user.streak / 30) * 100} tint="orange" height={6} className="mt-2.5" />
          </div>
        </div>
      </div>

      {/* achievements */}
      <div className="reveal mt-5 px-4">
        <SectionHeader
          title="Achievements"
          subtitle={`${earned.length} of ${achievements.length} unlocked`}
          action="All"
          onAction={() => showToast('Achievement gallery coming soon', { variant: 'default' })}
        />
        <div className="grid grid-cols-3 gap-2.5">
          {achievements.map((a, i) => {
            const t = getTint(a.tint)
            return (
              <div
                key={a.id}
                className={`relative flex flex-col items-center overflow-hidden rounded-3xl border p-3 text-center animate-slide-up ${
                  a.earned ? 'border-ink-100 bg-white shadow-soft' : 'border-dashed border-ink-200 bg-ink-50/60'
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-2xl ${
                    a.earned ? `bg-gradient-to-br text-white ${t.grad} ${t.glow}` : 'bg-ink-100 text-ink-300'
                  }`}
                >
                  <Icon name={a.icon} size={19} strokeWidth={2.3} />
                </span>
                <span className={`mt-2 block text-[11.5px] font-extrabold leading-tight ${a.earned ? 'text-ink-900' : 'text-ink-400'}`}>
                  {a.title}
                </span>
                <span className="mt-1 block text-[10px] font-semibold text-ink-300">
                  {a.earned ? a.date : `${a.progress}${a.id === 'band-7' ? '%' : ' left'}`}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* menu */}
      <div className="reveal mt-5 px-4">
        <SectionHeader title="Settings" />
        <div className="surface divide-y divide-ink-100 p-0">
          {profileMenu.map((m) => {
            const t = getTint(m.tint)
            return (
              <Link key={m.id} to={m.to} className="press flex items-center gap-3 p-3.5 hover:bg-ink-50/60">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl2 ${t.soft} ${t.text}`}>
                  <Icon name={m.icon} size={16} strokeWidth={2.4} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] font-bold text-ink-900">{m.label}</span>
                  <span className="block truncate text-[11.5px] text-ink-400">{m.desc}</span>
                </span>
                {m.id === 'subscription' && !isPremium && (
                  <span className="shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                    Upgrade
                  </span>
                )}
                <ChevronRight size={16} className="shrink-0 text-ink-300" strokeWidth={2.4} />
              </Link>
            )
          })}
        </div>
      </div>

      {/* premium banner */}
      {!isPremium && (
        <div className="reveal mt-5 px-4">
          <Link
            to="/premium"
            className="press relative flex items-center gap-3 overflow-hidden rounded-4xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 p-4 text-white shadow-[0_18px_40px_-18px_rgba(249,115,22,0.9)]"
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/25 blur-2xl" />
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Crown size={20} strokeWidth={2.4} />
            </span>
            <span className="relative min-w-0 flex-1">
              <span className="block font-display text-[15px] font-extrabold">Go Premium</span>
              <span className="mt-0.5 block text-[12px] text-white/85">Unlimited AI practice + IELTS mode</span>
            </span>
            <ChevronRight size={18} strokeWidth={2.6} className="relative shrink-0" />
          </Link>
        </div>
      )}

      {/* logout */}
      <div className="reveal mt-5 px-4">
        <button
          type="button"
          onClick={() => showToast('Sign out is disabled in this demo', { variant: 'default' })}
          className="press focus-ring flex w-full items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white py-3.5 text-[13.5px] font-bold text-rose-500 shadow-soft hover:border-rose-200"
        >
          <LogOut size={16} strokeWidth={2.5} />
          Log out
        </button>
        <p className="mt-4 text-center text-[11.5px] text-ink-300">LinguaOne · Version 1.0.0 (demo)</p>
      </div>
    </Screen>
  )
}
