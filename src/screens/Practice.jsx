import { useNavigate } from 'react-router-dom'
import { ChevronRight, Clock, Crown, Mic, Sparkles } from 'lucide-react'
import { Screen } from '../components/layout/Screen'
import { SectionHeader } from '../components/ui/Card'
import { Icon } from '../components/ui/Icon'
import { PremiumBadge } from '../components/ui/Badges'
import { AITeacher } from '../components/ai/AITeacher'
import { useApp } from '../context/appContext'
import { practiceDrills, practiceModes } from '../data/mock'
import { tint as getTint } from '../data/tints'

export default function Practice() {
  const navigate = useNavigate()
  const { isPremium, showToast } = useApp()

  const open = (mode) => {
    if (mode.premium && !isPremium) {
      showToast('Premium unlocks this practice mode', { variant: 'ai' })
      navigate('/premium')
      return
    }
    navigate(mode.to)
  }

  return (
    <Screen padded={false}>
      {/* header */}
      <div className="px-4 pt-3">
        <h1 className="title-xl">Choose your practice</h1>
        <p className="mt-1 text-[13.5px] text-ink-500">Real situations, spoken out loud, scored instantly.</p>

        {/* featured */}
        <button
          type="button"
          onClick={() => navigate('/conversation')}
          className="press relative mt-4 flex w-full items-center gap-3 overflow-hidden rounded-4xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-4 text-left text-white shadow-[0_20px_46px_-20px_rgba(79,70,229,0.9)]"
        >
          <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
          <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-cyan-300/35 blur-2xl" />

          <AITeacher size={54} state="speaking" halo={false} className="relative" />
          <div className="relative min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur">
              <Sparkles size={9} strokeWidth={2.8} />
              Recommended now
            </span>
            <h2 className="mt-1.5 font-display text-[17px] font-extrabold leading-tight">
              Free talk with Aria
            </h2>
            <p className="mt-0.5 text-[12px] text-white/80">Pick up where you left off — 5 min</p>
          </div>
          <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur">
            <Mic size={20} strokeWidth={2.4} />
          </span>
        </button>
      </div>

      {/* modes */}
      <div className="mt-6 px-4">
        <SectionHeader title="Conversation scenarios" subtitle="Speak your way through real situations" />
        <div className="space-y-2.5">
          {practiceModes.map((m, i) => {
            const t = getTint(m.tint)
            const locked = m.premium && !isPremium
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => open(m)}
                className="tap-card surface flex w-full items-center gap-3 p-3.5 animate-slide-up"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white ${t.grad} ${
                    locked ? 'opacity-60' : t.glow
                  }`}
                >
                  <Icon name={m.icon} size={20} strokeWidth={2.3} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate font-display text-[14.5px] font-extrabold text-ink-900">
                      {m.title}
                    </span>
                    {m.badge && (
                      <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider ${t.soft} ${t.text}`}>
                        {m.badge}
                      </span>
                    )}
                    {locked && <PremiumBadge size="sm" label="PRO" className="shrink-0" />}
                  </span>
                  <span className="mt-0.5 block truncate text-[12px] text-ink-400">{m.desc}</span>
                  <span className="mt-1 flex items-center gap-1 text-[11px] font-bold text-ink-400">
                    <Clock size={10} strokeWidth={2.8} />
                    {m.minutes} min
                  </span>
                </span>

                <ChevronRight size={17} className="shrink-0 text-ink-300" strokeWidth={2.4} />
              </button>
            )
          })}
        </div>
      </div>

      {/* drills */}
      <div className="mt-6 px-4">
        <SectionHeader title="Skill drills" subtitle="Short, focused practice" />
        <div className="grid grid-cols-2 gap-3">
          {practiceDrills.map((d, i) => {
            const t = getTint(d.tint)
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => navigate(d.to)}
                className="tap-card surface relative flex flex-col p-3.5 animate-slide-up"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <span
                  className={`pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-gradient-to-br opacity-[0.13] blur-lg ${t.grad}`}
                />
                <span className={`grid h-10 w-10 place-items-center rounded-xl2 bg-gradient-to-br text-white ${t.grad} ${t.glow}`}>
                  <Icon name={d.icon} size={18} strokeWidth={2.3} />
                </span>
                <span className="mt-2.5 block text-[13.5px] font-bold text-ink-900">{d.title}</span>
                <span className="mt-0.5 block text-[11.5px] text-ink-400">{d.desc}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* premium nudge */}
      {!isPremium && (
        <div className="mt-6 px-4">
          <button
            type="button"
            onClick={() => navigate('/premium')}
            className="press relative flex w-full items-center gap-3 overflow-hidden rounded-4xl border border-amber-100 bg-gradient-to-br from-amber-50 via-white to-orange-50/70 p-4 text-left shadow-soft"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 text-white shadow-[0_10px_26px_-10px_rgba(249,115,22,0.9)]">
              <Crown size={19} strokeWidth={2.4} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[14.5px] font-extrabold text-ink-900">
                3 practice modes locked
              </span>
              <span className="mt-0.5 block text-[12px] text-ink-500">
                Job Interview, Business and Academic English
              </span>
            </span>
            <ChevronRight size={17} className="shrink-0 text-ink-300" strokeWidth={2.4} />
          </button>
        </div>
      )}
    </Screen>
  )
}
