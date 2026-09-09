import { useState } from 'react'
import { ChevronRight, Crown, LogOut, Trash2 } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Icon } from '../components/ui/Icon'
import { Modal } from '../components/ui/Overlay'
import { Button } from '../components/ui/Button'
import { useApp } from '../context/appContext'
import { settingsGroups } from '../data/mock'
import { tint as getTint } from '../data/tints'

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`press focus-ring relative h-[28px] w-[48px] shrink-0 rounded-full transition-colors duration-300 ${
        checked ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : 'bg-ink-200'
      }`}
    >
      <span
        className={`absolute top-[3px] grid h-[22px] w-[22px] place-items-center rounded-full bg-white shadow-soft transition-all duration-300 ${
          checked ? 'left-[23px]' : 'left-[3px]'
        }`}
      />
    </button>
  )
}

export default function Settings() {
  const { isPremium, showToast } = useApp()
  const [toggles, setToggles] = useState(() => {
    const initial = {}
    settingsGroups.forEach((g) =>
      g.items.forEach((i) => {
        if (i.type === 'toggle') initial[`${g.id}.${i.id}`] = i.value
      }),
    )
    return initial
  })
  const [confirmDelete, setConfirmDelete] = useState(false)

  const flip = (key, label) => {
    setToggles((t) => {
      const next = { ...t, [key]: !t[key] }
      showToast(`${label} ${next[key] ? 'on' : 'off'}`, { variant: 'default', duration: 1600 })
      return next
    })
  }

  return (
    <div className="flex-1 pb-10">
      <TopBar title="Settings" backTo="/profile" />

      <div className="px-4 pt-3">
        {/* subscription banner */}
        <div
          className={`relative overflow-hidden rounded-4xl p-4 ${
            isPremium
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.9)]'
              : 'bg-gradient-to-br from-ink-900 via-[#1B1440] to-[#2B1B5A] text-white shadow-float'
          }`}
        >
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Crown size={20} strokeWidth={2.4} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] font-extrabold">
                {isPremium ? 'Premium active' : 'Free plan'}
              </p>
              <p className="mt-0.5 text-[12px] text-white/75">
                {isPremium ? 'Unlimited AI practice unlocked' : '5 minutes of AI practice per day'}
              </p>
            </div>
            {!isPremium && (
              <Button to="/premium" variant="glass" size="sm" full={false} className="shrink-0">
                Upgrade
              </Button>
            )}
          </div>
        </div>

        {/* groups */}
        {settingsGroups.map((group) => (
          <div key={group.id} className="mt-5">
            <h2 className="eyebrow mb-2.5 px-1">{group.title}</h2>
            <div className="surface divide-y divide-ink-100 p-0">
              {group.items.map((item) => {
                const t = getTint(item.tint)
                const key = `${group.id}.${item.id}`
                const isToggle = item.type === 'toggle'
                const Row = isToggle ? 'div' : 'button'
                return (
                  <Row
                    key={item.id}
                    {...(isToggle
                      ? {}
                      : {
                          type: 'button',
                          onClick: () =>
                            item.id === 'plan'
                              ? showToast('Opening subscription…', { variant: 'default' })
                              : showToast(`${item.label} — demo only`, { variant: 'default' }),
                        })}
                    className={`flex w-full items-center gap-3 p-3.5 text-left ${
                      isToggle ? '' : 'press hover:bg-ink-50/60'
                    }`}
                  >
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl2 ${t.soft} ${t.text}`}>
                      <Icon name={item.icon} size={16} strokeWidth={2.4} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-bold text-ink-900">{item.label}</span>
                      {!isToggle && item.value && (
                        <span className="mt-0.5 block truncate text-[11.5px] text-ink-400">{item.value}</span>
                      )}
                    </span>

                    {isToggle ? (
                      <Toggle
                        checked={toggles[key]}
                        onChange={() => flip(key, item.label)}
                        label={item.label}
                      />
                    ) : (
                      <ChevronRight size={16} className="shrink-0 text-ink-300" strokeWidth={2.4} />
                    )}
                  </Row>
                )
              })}
            </div>
          </div>
        ))}

        {/* danger zone */}
        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={() => showToast('Sign out is disabled in this demo', { variant: 'default' })}
            className="press focus-ring flex w-full items-center justify-center gap-2 rounded-2xl border border-ink-200 bg-white py-3.5 text-[13.5px] font-bold text-ink-600 shadow-soft hover:border-ink-300"
          >
            <LogOut size={16} strokeWidth={2.5} />
            Log out
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="press focus-ring flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-[13px] font-bold text-rose-500 hover:bg-rose-50"
          >
            <Trash2 size={15} strokeWidth={2.5} />
            Delete account
          </button>
        </div>

        <p className="mt-6 text-center text-[11.5px] leading-relaxed text-ink-300">
          LinguaOne · Version 1.0.0 (demo)
          <br />
          Prototype build — no data leaves this device.
        </p>
      </div>

      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete account?"
        subtitle="This would permanently remove your progress, streak and saved words. Disabled in this demo."
        footer={
          <>
            <Button onClick={() => setConfirmDelete(false)} variant="neutral" size="lg">
              Keep my account
            </Button>
          </>
        }
      >
        <div className="rounded-2xl border border-rose-100 bg-rose-50/70 p-3.5">
          <p className="text-[12.5px] leading-relaxed text-rose-800">
            You would lose 2,480 XP, a 7 day streak and 326 saved words.
          </p>
        </div>
      </Modal>
    </div>
  )
}
