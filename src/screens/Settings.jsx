import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronRight, Crown, Download, LogOut, Star, Trash2 } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Icon } from '../components/ui/Icon'
import { Modal, BottomSheet } from '../components/ui/Overlay'
import { Button } from '../components/ui/Button'
import { useApp } from '../context/appContext'
import { dailyGoalOptions, settingsGroups, settingsOptions, user } from '../data/mock'
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
        checked ? 'bg-gradient-to-r from-violet-600 to-indigo-600' : 'bg-ink-200 dark:bg-white/20'
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
  const navigate = useNavigate()
  const { isPremium, showToast, dailyGoal, setDailyGoal, isDark, toggleDark } = useApp()

  const [toggles, setToggles] = useState(() => {
    const initial = {}
    settingsGroups.forEach((g) =>
      g.items.forEach((i) => {
        if (i.type === 'toggle') initial[`${g.id}.${i.id}`] = i.value
      }),
    )
    return initial
  })

  /* Chosen values for the option pickers, keyed by picker id. */
  const [choices, setChoices] = useState({
    applang: 'English',
    level: 'B1 Intermediate',
    focus: 'Speaking',
    voice: 'Aria — British',
    speed: 'Natural',
  })

  const [picker, setPicker] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [rating, setRating] = useState(0)
  const [rateOpen, setRateOpen] = useState(false)

  const flip = (key, label) => {
    setToggles((t) => {
      const next = { ...t, [key]: !t[key] }
      showToast(`${label} ${next[key] ? 'on' : 'off'}`, { variant: 'default', duration: 1600 })
      return next
    })
  }

  /** Live value for a row — picker choices and the daily goal are dynamic. */
  const valueFor = (item) => {
    if (item.picker === 'daily') return `${dailyGoal} minutes`
    if (item.picker) return choices[item.picker] ?? item.value
    return item.value
  }

  const handleRow = (item) => {
    if (item.to) return navigate(item.to)
    if (item.picker) return setPicker(item.picker)
    if (item.action === 'export') return setExporting(true)
    if (item.action === 'rate') return setRateOpen(true)
    return showToast(`${item.label} — demo only`, { variant: 'default' })
  }

  /* Picker sheet config: the daily goal reuses the onboarding options. */
  const pickerConfig =
    picker === 'daily'
      ? {
          title: 'Daily goal',
          subtitle: 'How much time you want to practise each day.',
          options: dailyGoalOptions.map((o) => `${o.minutes} minutes`),
          value: `${dailyGoal} minutes`,
          onPick: (v) => {
            setDailyGoal(parseInt(v, 10))
            showToast(`Daily goal set to ${v}`, { variant: 'success' })
          },
        }
      : picker
        ? {
            ...settingsOptions[picker],
            value: choices[picker],
            onPick: (v) => {
              setChoices((c) => ({ ...c, [picker]: v }))
              showToast(`${settingsOptions[picker].title} set to ${v}`, { variant: 'success' })
            },
          }
        : null

  return (
    <div className="flex-1 pb-10">
      <TopBar title="Settings" backTo="/profile" />

      <div className="px-4 pt-3">
        {/* subscription banner */}
        <button
          type="button"
          onClick={() => navigate('/premium')}
          className={`press relative w-full overflow-hidden rounded-4xl p-4 text-left ${
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
            {!isPremium ? (
              <span className="shrink-0 rounded-xl bg-white/15 px-3 py-1.5 text-[12.5px] font-bold backdrop-blur">
                Upgrade
              </span>
            ) : (
              <ChevronRight size={18} className="shrink-0 text-white/70" strokeWidth={2.5} />
            )}
          </div>
        </button>

        {/* groups */}
        {settingsGroups.map((group) => (
          <div key={group.id} className="reveal mt-5">
            <h2 className="eyebrow mb-2.5 px-1">{group.title}</h2>
            <div className="surface divide-y divide-ink-100 p-0">
              {group.items.map((item) => {
                const t = getTint(item.tint)
                const key = `${group.id}.${item.id}`
                const isToggle = item.type === 'toggle'
                const isDarkToggle = item.type === 'dark_toggle'
                const value = isDarkToggle ? (isDark ? 'On' : 'Off') : valueFor(item)

                const inner = (
                  <>
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl2 ${t.soft} ${t.text}`}>
                      <Icon name={item.icon} size={16} strokeWidth={2.4} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-bold text-ink-900">{item.label}</span>
                      {!isToggle && !isDarkToggle && value && (
                        <span className="mt-0.5 block truncate text-[11.5px] text-ink-400">{value}</span>
                      )}
                    </span>

                    {isDarkToggle ? (
                      <Toggle checked={isDark} onChange={toggleDark} label={item.label} />
                    ) : isToggle ? (
                      <Toggle checked={toggles[key]} onChange={() => flip(key, item.label)} label={item.label} />
                    ) : (
                      <ChevronRight size={16} className="shrink-0 text-ink-300 dark:text-ink-400" strokeWidth={2.4} />
                    )}
                  </>
                )

                if (isToggle || isDarkToggle) {
                  return (
                    <div key={item.id} className="flex w-full items-center gap-3 p-3.5 text-left">
                      {inner}
                    </div>
                  )
                }
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleRow(item)}
                    className="press flex w-full items-center gap-3 p-3.5 text-left hover:bg-ink-50/60"
                  >
                    {inner}
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* danger zone */}
        <div className="reveal mt-6 space-y-2.5">
          <button
            type="button"
            onClick={() => setConfirmLogout(true)}
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

      {/* option picker */}
      <BottomSheet
        open={Boolean(pickerConfig)}
        onClose={() => setPicker(null)}
        title={pickerConfig?.title}
        subtitle={pickerConfig?.subtitle}
      >
        <div className="space-y-2 pb-2">
          {pickerConfig?.options.map((o) => {
            const active = o === pickerConfig.value
            return (
              <button
                key={o}
                type="button"
                onClick={() => {
                  pickerConfig.onPick(o)
                  setPicker(null)
                }}
                className={`press focus-ring flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition ${
                  active ? 'border-violet-200 bg-violet-50/70' : 'border-ink-100 bg-white hover:border-ink-200'
                }`}
              >
                <span className="flex-1 text-[14px] font-semibold text-ink-800">{o}</span>
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

      {/* export data */}
      <Modal
        open={exporting}
        onClose={() => setExporting(false)}
        title="Download your data"
        subtitle="We’ll build a file with your progress, saved words and conversation history."
        footer={
          <>
            <Button
              onClick={() => {
                setExporting(false)
                showToast('Export requested — we’ll email the link', { variant: 'success' })
              }}
              size="lg"
              icon={Download}
            >
              Request export
            </Button>
            <Button onClick={() => setExporting(false)} variant="ghost" size="md">
              Cancel
            </Button>
          </>
        }
      >
        <div className="rounded-2xl bg-ink-50 p-3.5">
          <ul className="space-y-1.5">
            {['Progress and XP history', 'Saved vocabulary (326 words)', 'Conversation transcripts', 'Account details'].map(
              (l) => (
                <li key={l} className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-600">
                  <Check size={13} className="shrink-0 text-emerald-500" strokeWidth={3.2} />
                  {l}
                </li>
              ),
            )}
          </ul>
        </div>
      </Modal>

      {/* rate */}
      <Modal
        open={rateOpen}
        onClose={() => setRateOpen(false)}
        title="Enjoying LinguaOne?"
        subtitle="Your rating helps other learners find us."
        footer={
          <>
            <Button
              onClick={() => {
                setRateOpen(false)
                showToast(rating >= 4 ? 'Thanks! Opening the store…' : 'Thanks — we’ll use your feedback', {
                  variant: 'success',
                })
              }}
              size="lg"
              disabled={rating === 0}
            >
              {rating === 0 ? 'Pick a rating' : 'Submit rating'}
            </Button>
            <Button onClick={() => setRateOpen(false)} variant="ghost" size="md">
              Maybe later
            </Button>
          </>
        }
      >
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              aria-label={`${n} star${n > 1 ? 's' : ''}`}
              className="press focus-ring rounded-lg p-1"
            >
              <Star
                size={30}
                strokeWidth={2}
                className={n <= rating ? 'fill-amber-400 text-amber-400' : 'text-ink-200'}
              />
            </button>
          ))}
        </div>
      </Modal>

      {/* logout */}
      <Modal
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
        title="Log out?"
        subtitle="Your streak and progress stay saved to this account."
        footer={
          <>
            <Button
              onClick={() => {
                setConfirmLogout(false)
                showToast('Signed out', { variant: 'default' })
                navigate('/login')
              }}
              variant="dark"
              size="lg"
              icon={LogOut}
            >
              Log out
            </Button>
            <Button onClick={() => setConfirmLogout(false)} variant="ghost" size="md">
              Stay logged in
            </Button>
          </>
        }
      >
        <div className="rounded-2xl bg-ink-50 p-3.5">
          <p className="text-[13px] font-semibold text-ink-700">{user.fullName}</p>
          <p className="text-[12px] text-ink-400">{user.email}</p>
        </div>
      </Modal>

      {/* delete */}
      <Modal
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Delete account?"
        subtitle="This would permanently remove your progress, streak and saved words. Disabled in this demo."
        footer={
          <Button onClick={() => setConfirmDelete(false)} variant="neutral" size="lg">
            Keep my account
          </Button>
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
