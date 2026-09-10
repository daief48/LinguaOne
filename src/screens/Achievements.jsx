import { useState } from 'react'
import { Lock, Share2, Trophy } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Icon } from '../components/ui/Icon'
import { ProgressBar, CircularProgress } from '../components/ui/Progress'
import { BottomSheet } from '../components/ui/Overlay'
import { Button } from '../components/ui/Button'
import { useApp } from '../context/appContext'
import { achievements } from '../data/mock'
import { tint as getTint } from '../data/tints'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'earned', label: 'Unlocked' },
  { id: 'locked', label: 'Locked' },
]

export default function Achievements() {
  const { showToast } = useApp()
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)

  const earned = achievements.filter((a) => a.earned)
  const shown = achievements.filter((a) =>
    filter === 'all' ? true : filter === 'earned' ? a.earned : !a.earned,
  )
  const percent = Math.round((earned.length / achievements.length) * 100)

  return (
    <div className="flex-1 pb-8">
      <TopBar title="Achievements" subtitle={`${earned.length} of ${achievements.length} unlocked`} backTo="/profile" />

      {/* summary */}
      <div className="px-4 pt-3">
        <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500 p-4 text-white shadow-[0_20px_46px_-20px_rgba(249,115,22,0.9)]">
          <div className="pointer-events-none absolute inset-0 opacity-20 grid-dots" />
          <div className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/25 blur-2xl" />

          <div className="relative flex items-center gap-4">
            <CircularProgress
              value={percent}
              size={82}
              stroke={8}
              tint="amber"
              trackColor="rgba(255,255,255,0.28)"
            >
              <div className="text-center leading-none text-white">
                <div className="font-display text-[19px] font-extrabold">{percent}%</div>
              </div>
            </CircularProgress>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <Trophy size={16} strokeWidth={2.5} />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/80">
                  Your collection
                </span>
              </div>
              <p className="mt-1.5 font-display text-[17px] font-extrabold leading-tight">
                {earned.length} badges earned
              </p>
              <p className="mt-1 text-[12px] text-white/80">
                {achievements.length - earned.length} more to collect this season.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* filters */}
      <div className="mt-4 flex gap-2 px-4">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`press focus-ring flex-1 rounded-2xl py-2 text-[13px] font-bold transition ${
              filter === f.id
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-glow'
                : 'border border-ink-200 bg-white text-ink-500 hover:border-ink-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* grid */}
      <div key={filter} className="stagger mt-4 grid grid-cols-2 gap-3 px-4">
        {shown.map((a) => {
          const t = getTint(a.tint)
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => setSelected(a)}
              className={`tap-card relative flex flex-col items-center overflow-hidden rounded-3xl border p-4 text-center ${
                a.earned ? 'border-ink-100 bg-white shadow-soft' : 'border-dashed border-ink-200 bg-ink-50/60'
              }`}
            >
              {a.earned && (
                <span
                  className={`pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-gradient-to-br opacity-20 blur-xl ${t.grad}`}
                />
              )}
              <span
                className={`relative grid h-14 w-14 place-items-center rounded-2xl ${
                  a.earned ? `bg-gradient-to-br text-white ${t.grad} ${t.glow}` : 'bg-ink-100 text-ink-300'
                }`}
              >
                <Icon name={a.icon} size={24} strokeWidth={2.3} />
                {!a.earned && (
                  <span className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-white text-ink-400 shadow-soft">
                    <Lock size={11} strokeWidth={2.8} />
                  </span>
                )}
              </span>

              <span
                className={`relative mt-3 block font-display text-[13.5px] font-extrabold leading-tight ${
                  a.earned ? 'text-ink-900' : 'text-ink-500'
                }`}
              >
                {a.title}
              </span>
              <span className="relative mt-1 block text-[11.5px] leading-snug text-ink-400">{a.desc}</span>

              {a.earned ? (
                <span className="relative mt-2.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-extrabold text-emerald-600">
                  {a.date}
                </span>
              ) : (
                <span className="relative mt-2.5 w-full">
                  <ProgressBar value={a.id === 'band-7' ? a.progress : ((30 - a.progress) / 30) * 100} tint={a.tint} height={5} />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {shown.length === 0 && (
        <p className="mt-10 text-center text-[13.5px] text-ink-400">Nothing here yet.</p>
      )}

      {/* detail */}
      <BottomSheet
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title={selected?.title}
        subtitle={selected?.earned ? `Unlocked ${selected?.date}` : 'Still locked'}
        footer={
          selected?.earned ? (
            <Button
              onClick={() => {
                setSelected(null)
                showToast('Badge shared to your profile', { variant: 'success' })
              }}
              size="lg"
              icon={Share2}
            >
              Share badge
            </Button>
          ) : (
            <Button to="/conversation" onClick={() => setSelected(null)} size="lg">
              Practice now
            </Button>
          )
        }
      >
        {selected && (
          <div className="pb-2 text-center">
            <span
              className={`mx-auto grid h-20 w-20 place-items-center rounded-3xl ${
                selected.earned
                  ? `bg-gradient-to-br text-white ${getTint(selected.tint).grad} ${getTint(selected.tint).glow}`
                  : 'bg-ink-100 text-ink-300'
              }`}
            >
              <Icon name={selected.icon} size={34} strokeWidth={2.2} />
            </span>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-600">{selected.desc}</p>
            {!selected.earned && (
              <div className="mt-4 rounded-2xl border border-ink-100 bg-ink-50 p-3.5 text-left">
                <span className="eyebrow mb-1.5 block">Progress</span>
                <p className="text-[13px] font-semibold text-ink-800">
                  {selected.id === 'band-7'
                    ? `${selected.progress}% of the way to band 7.0`
                    : `${selected.progress} days to go`}
                </p>
              </div>
            )}
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
