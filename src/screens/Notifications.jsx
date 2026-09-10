import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BellOff, Check, ChevronRight, Settings as SettingsIcon } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Icon } from '../components/ui/Icon'
import { Button } from '../components/ui/Button'
import { useApp } from '../context/appContext'
import { notifications } from '../data/mock'
import { tint as getTint } from '../data/tints'

export default function Notifications() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const [read, setRead] = useState(() => new Set())
  const [dismissed, setDismissed] = useState(() => new Set())

  const items = notifications.filter((n) => !dismissed.has(n.id))
  const unread = items.filter((n) => n.unread && !read.has(n.id)).length

  const groups = useMemo(() => {
    const out = {}
    items.forEach((n) => {
      out[n.group] = out[n.group] || []
      out[n.group].push(n)
    })
    return out
  }, [items])

  const open = (n) => {
    setRead((s) => new Set(s).add(n.id))
    navigate(n.to)
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <TopBar
        title="Notifications"
        subtitle={unread ? `${unread} unread` : 'All caught up'}
        backTo="/home"
        right={
          <button
            type="button"
            onClick={() => navigate('/settings')}
            aria-label="Notification settings"
            className="press focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-500 shadow-soft hover:text-ink-900"
          >
            <SettingsIcon size={17} strokeWidth={2.3} />
          </button>
        }
      />

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-3xl bg-ink-100 text-ink-300">
            <BellOff size={26} strokeWidth={2.2} />
          </span>
          <h2 className="mt-4 title-lg">Nothing new</h2>
          <p className="mt-2 max-w-[240px] text-[13.5px] leading-relaxed text-ink-500">
            Reminders and AI tips will show up here.
          </p>
          <Button to="/home" variant="neutral" size="lg" full={false} className="mt-5">
            Back to Home
          </Button>
        </div>
      ) : (
        <div className="px-4 pt-3">
          {unread > 0 && (
            <button
              type="button"
              onClick={() => {
                setRead(new Set(notifications.map((n) => n.id)))
                showToast('All notifications marked as read', { variant: 'success' })
              }}
              className="press focus-ring mb-4 flex w-full items-center justify-center gap-1.5 rounded-2xl border border-ink-200 bg-white py-2.5 text-[13px] font-bold text-ink-600 shadow-soft hover:border-ink-300"
            >
              <Check size={14} strokeWidth={2.8} />
              Mark all as read
            </button>
          )}

          {Object.entries(groups).map(([group, list]) => (
            <div key={group} className="reveal mb-5">
              <h2 className="eyebrow mb-2.5 px-1">{group}</h2>
              <div className="stagger space-y-2.5">
                {list.map((n) => {
                  const t = getTint(n.tint)
                  const isUnread = n.unread && !read.has(n.id)
                  return (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => open(n)}
                      className={`tap-card flex w-full items-start gap-3 rounded-3xl border p-3.5 ${
                        isUnread
                          ? 'border-violet-100 bg-gradient-to-r from-violet-50/70 to-white shadow-soft'
                          : 'border-ink-100 bg-white shadow-soft'
                      }`}
                    >
                      <span
                        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white ${t.grad} ${t.glow}`}
                      >
                        <Icon name={n.icon} size={19} strokeWidth={2.3} />
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate font-display text-[14px] font-extrabold text-ink-900">
                            {n.title}
                          </span>
                          {isUnread && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600" />
                          )}
                        </span>
                        <span className="mt-0.5 block text-[12.5px] leading-relaxed text-ink-500">{n.body}</span>
                        <span className="mt-1.5 block text-[11px] font-semibold text-ink-300">{n.time}</span>
                      </span>

                      <ChevronRight size={16} className="mt-0.5 shrink-0 text-ink-300" strokeWidth={2.4} />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setDismissed(new Set(notifications.map((n) => n.id)))
              showToast('Notifications cleared', { variant: 'default' })
            }}
            className="press focus-ring w-full rounded-2xl py-3 text-[13px] font-bold text-ink-400 hover:text-rose-500"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  )
}
