import { useState } from 'react'
import { ChevronDown, ExternalLink, FileText, Search, Shield, Sparkles } from 'lucide-react'
import { TopBar } from '../components/layout/TopBar'
import { Icon } from '../components/ui/Icon'
import { AITeacher } from '../components/ai/AITeacher'
import { Button } from '../components/ui/Button'
import { BottomSheet } from '../components/ui/Overlay'
import { useApp } from '../context/appContext'
import { faqs, helpChannels } from '../data/mock'
import { tint as getTint } from '../data/tints'

export default function Help() {
  const { showToast } = useApp()
  const [open, setOpen] = useState(null)
  const [query, setQuery] = useState('')
  const [channel, setChannel] = useState(null)

  const list = faqs.filter(
    (f) =>
      !query.trim() ||
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex-1 pb-8">
      <TopBar title="Help & Support" subtitle="Answers and contact" backTo="/settings" />

      {/* hero */}
      <div className="px-4 pt-3">
        <div className="relative overflow-hidden rounded-4xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-cyan-50/60 p-4 shadow-soft">
          <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-violet-200/50 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <AITeacher size={48} state="happy" />
            <div className="min-w-0">
              <h1 className="title-md">How can we help?</h1>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-500">
                Search the FAQ or message the team — we usually reply the same day.
              </p>
            </div>
          </div>

          <div className="relative mt-3.5 flex items-center">
            <Search size={16} className="pointer-events-none absolute left-3.5 text-ink-400" strokeWidth={2.3} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help articles"
              className="focus-ring h-11 w-full rounded-2xl border border-ink-200 bg-white pl-10 pr-3 text-[13.5px] font-medium text-ink-900 placeholder:text-ink-300"
            />
          </div>
        </div>
      </div>

      {/* channels */}
      <div className="reveal mt-5 px-4">
        <h2 className="eyebrow mb-2.5 px-1">Contact us</h2>
        <div className="stagger space-y-2.5">
          {helpChannels.map((c) => {
            const t = getTint(c.tint)
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setChannel(c)}
                className="tap-card surface flex w-full items-center gap-3 p-3.5"
              >
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl2 ${t.soft} ${t.text}`}>
                  <Icon name={c.icon} size={17} strokeWidth={2.4} />
                </span>
                <span className="min-w-0 flex-1 text-left">
                  <span className="block text-[13.5px] font-bold text-ink-900">{c.title}</span>
                  <span className="block truncate text-[11.5px] text-ink-400">{c.desc}</span>
                </span>
                <ExternalLink size={15} className="shrink-0 text-ink-300" strokeWidth={2.4} />
              </button>
            )
          })}
        </div>
      </div>

      {/* faq */}
      <div className="reveal mt-5 px-4">
        <h2 className="eyebrow mb-2.5 px-1">Frequently asked</h2>
        <div className="surface divide-y divide-ink-100 p-0">
          {list.map((f) => {
            const isOpen = open === f.id
            return (
              <div key={f.id}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  className="press flex w-full items-center gap-3 p-3.5 text-left hover:bg-ink-50/60"
                >
                  <span className="min-w-0 flex-1 text-[13.5px] font-bold text-ink-900">{f.q}</span>
                  <ChevronDown
                    size={17}
                    strokeWidth={2.5}
                    className={`shrink-0 text-ink-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 animate-slide-up">
                    <p className="rounded-2xl bg-ink-50 p-3 text-[13px] leading-relaxed text-ink-600">{f.a}</p>
                  </div>
                )}
              </div>
            )
          })}
          {list.length === 0 && (
            <p className="p-5 text-center text-[13px] text-ink-400">No articles match “{query}”.</p>
          )}
        </div>
      </div>

      {/* legal */}
      <div className="reveal mt-5 px-4">
        <div className="surface divide-y divide-ink-100 p-0">
          {[
            { id: 'terms', label: 'Terms of Service', icon: FileText, tint: 'blue' },
            { id: 'privacy', label: 'Privacy Policy', icon: Shield, tint: 'green' },
            { id: 'about', label: `About ${'LinguaOne'}`, icon: Sparkles, tint: 'violet' },
          ].map((l) => {
            const t = getTint(l.tint)
            return (
              <button
                key={l.id}
                type="button"
                onClick={() => showToast(`${l.label} — demo build`, { variant: 'default' })}
                className="press flex w-full items-center gap-3 p-3.5 text-left hover:bg-ink-50/60"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl2 ${t.soft} ${t.text}`}>
                  <l.icon size={16} strokeWidth={2.4} />
                </span>
                <span className="flex-1 text-[13.5px] font-bold text-ink-900">{l.label}</span>
                <ExternalLink size={15} className="shrink-0 text-ink-300" strokeWidth={2.4} />
              </button>
            )
          })}
        </div>
        <p className="mt-5 text-center text-[11.5px] text-ink-300">LinguaOne · Version 1.0.0 (demo)</p>
      </div>

      {/* contact sheet */}
      <BottomSheet
        open={Boolean(channel)}
        onClose={() => setChannel(null)}
        title={channel?.title}
        subtitle={channel?.desc}
        footer={
          <Button
            onClick={() => {
              setChannel(null)
              showToast('Message sent — we’ll reply by email', { variant: 'success' })
            }}
            size="lg"
          >
            Send message
          </Button>
        }
      >
        <div className="pb-2">
          <label className="block">
            <span className="eyebrow mb-1.5 block">Your message</span>
            <textarea
              rows={4}
              defaultValue=""
              placeholder="Tell us what happened…"
              className="focus-ring w-full resize-none rounded-2xl border border-ink-200 bg-white p-3 text-[13.5px] font-medium text-ink-900 placeholder:text-ink-300"
            />
          </label>
          <p className="mt-2 text-[11.5px] text-ink-400">
            Your level, plan and app version are attached automatically.
          </p>
        </div>
      </BottomSheet>
    </div>
  )
}
