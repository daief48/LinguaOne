import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ChevronLeft, Crown, Shield, Sparkles, Star, X, Zap } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { Modal } from '../components/ui/Overlay'
import { AITeacher } from '../components/ai/AITeacher'
import { StatusBar } from '../components/layout/StatusBar'
import { canGoBack } from '../components/layout/TopBar'
import { useApp } from '../context/appContext'
import { plans, premiumFeatures, premiumProof } from '../data/mock'

const freePlan = plans.find((p) => p.id === 'free')
const paidPlans = plans.filter((p) => p.id !== 'free')

export default function Premium() {
  const navigate = useNavigate()
  const { isPremium, setIsPremium, showToast } = useApp()
  const [planId, setPlanId] = useState('yearly')
  const [confirm, setConfirm] = useState(false)

  const plan = paidPlans.find((p) => p.id === planId)

  const start = () => {
    setConfirm(false)
    setIsPremium(true)
    showToast('Premium unlocked — enjoy unlimited practice!', { variant: 'success', duration: 3000 })
    navigate('/home')
  }

  return (
    <div className="flex flex-1 flex-col bg-ink-900 pb-8">
      {/* hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-ink-900 via-[#1B1440] to-[#2B1B5A] px-5 pb-10 pt-3 text-white sm:pt-[54px]">
        <StatusBar dark className="absolute inset-x-0 top-0" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] grid-dots" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-500/35 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 top-28 h-52 w-52 rounded-full bg-amber-400/20 blur-3xl" />

        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={() => (canGoBack() ? navigate(-1) : navigate('/home'))}
            aria-label="Go back"
            className="press focus-ring grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            <ChevronLeft size={19} strokeWidth={2.5} />
          </button>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-amber-200 backdrop-blur">
            <Crown size={11} strokeWidth={2.8} />
            Premium
          </span>
        </div>

        <div className="relative mt-6 text-center">
          <AITeacher size={78} state="happy" ring className="mx-auto" />
          <h1 className="mt-5 font-display text-[28px] font-extrabold leading-tight tracking-[-0.03em]">
            Unlock Your Full Potential
          </h1>
          <p className="mx-auto mt-2.5 max-w-[290px] text-[14px] leading-relaxed text-white/70">
            Your personal AI language teacher — available every day.
          </p>
        </div>

        {/* proof */}
        <div className="relative mt-6 flex items-center justify-center gap-2">
          {premiumProof.map((p) => (
            <div key={p.label} className="flex-1 rounded-2xl border border-white/10 bg-white/10 px-2 py-2.5 text-center backdrop-blur">
              <div className="font-display text-[17px] font-extrabold leading-none">{p.value}</div>
              <div className="mt-1 text-[10px] font-semibold text-white/60">{p.label}</div>
            </div>
          ))}
        </div>
        <div className="relative mt-3 flex items-center justify-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={13} className="fill-amber-300 text-amber-300" strokeWidth={0} />
          ))}
          <span className="ml-1.5 text-[11.5px] font-semibold text-white/60">from 48,000 reviews</span>
        </div>
      </div>

      {/* plans */}
      <div className="relative z-10 flex-1 rounded-t-[32px] bg-ink-50 px-4 pb-8 pt-6">
        <div className="mb-4 text-center">
          <h2 className="title-lg">Choose your plan</h2>
          <p className="mt-1 text-[13px] text-ink-500">Cancel anytime. No commitment.</p>
        </div>

        <div className="space-y-2.5">
          {paidPlans.map((p) => {
            const active = p.id === planId
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlanId(p.id)}
                className={`press focus-ring relative flex w-full items-center gap-3.5 overflow-hidden rounded-4xl border p-4 text-left transition-all duration-300 ${
                  active
                    ? 'border-violet-300 bg-white shadow-card ring-2 ring-violet-500/25'
                    : 'border-ink-200 bg-white/70 hover:border-ink-300'
                }`}
              >
                {p.badge && (
                  <span className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider text-white">
                    {p.badge}
                  </span>
                )}

                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${
                    active ? 'border-violet-600 bg-violet-600 text-white' : 'border-ink-300'
                  }`}
                >
                  {active && <Check size={13} strokeWidth={3.4} />}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[15px] font-extrabold text-ink-900">{p.name}</span>
                  <span className="mt-0.5 block text-[12px] text-ink-400">{p.desc}</span>
                  {p.monthly && (
                    <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10.5px] font-extrabold text-emerald-600">
                      {p.monthly}
                    </span>
                  )}
                </span>

                <span className="shrink-0 text-right">
                  <span className="block font-display text-[19px] font-extrabold leading-none text-ink-900">
                    {p.price}
                  </span>
                  <span className="mt-1 block text-[10.5px] font-semibold text-ink-400">{p.period}</span>
                </span>
              </button>
            )
          })}
        </div>

        {/* comparison */}
        <div className="mt-6 overflow-hidden rounded-4xl border border-ink-100 bg-white shadow-card">
          <div className="grid grid-cols-[1fr_64px_74px] items-center gap-2 border-b border-ink-100 bg-ink-50/70 px-4 py-2.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">What you get</span>
            <span className="text-center text-[11px] font-extrabold uppercase tracking-wider text-ink-400">Free</span>
            <span className="text-center">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white">
                <Crown size={9} strokeWidth={3} />
                Premium
              </span>
            </span>
          </div>

          <div className="divide-y divide-ink-100">
            {premiumFeatures.map((f, i) => {
              const inFree = i === 0 || i === 3 ? 'limited' : i === 5 || i === 6 ? 'limited' : false
              return (
                <div key={f.label} className="grid grid-cols-[1fr_64px_74px] items-center gap-2 px-4 py-2.5">
                  <span className="flex items-center gap-2.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-violet-50 text-violet-600">
                      <Icon name={f.icon} size={13} strokeWidth={2.5} />
                    </span>
                    <span className="text-[12.5px] font-semibold text-ink-700">{f.label}</span>
                  </span>
                  <span className="grid place-items-center">
                    {inFree === 'limited' ? (
                      <span className="text-[10.5px] font-bold text-ink-400">Limited</span>
                    ) : (
                      <X size={15} className="text-ink-300" strokeWidth={2.6} />
                    )}
                  </span>
                  <span className="grid place-items-center">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check size={12} strokeWidth={3.4} />
                    </span>
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* free plan card */}
        <div className="mt-4 rounded-4xl border border-ink-200 bg-white/70 p-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-[15px] font-extrabold text-ink-900">{freePlan.name} plan</h3>
            <span className="font-display text-[17px] font-extrabold text-ink-500">
              {freePlan.price}
              <span className="ml-1 text-[11px] font-bold text-ink-400">{freePlan.period}</span>
            </span>
          </div>
          <p className="mt-1 text-[12px] text-ink-400">{freePlan.desc}</p>
          <ul className="mt-3 grid gap-1.5">
            {freePlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[12.5px] text-ink-500">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink-300" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* trust */}
        <div className="mt-5 flex items-center justify-center gap-4 text-[11.5px] font-semibold text-ink-400">
          <span className="inline-flex items-center gap-1.5">
            <Shield size={13} strokeWidth={2.5} className="text-emerald-500" />
            Secure payment
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Zap size={13} strokeWidth={2.6} className="text-amber-500" />
            Instant access
          </span>
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 -mx-4 mt-6 bg-gradient-to-t from-ink-50 via-ink-50/95 to-transparent px-4 pb-6 pt-4 safe-bottom">
          {isPremium ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <p className="flex items-center justify-center gap-1.5 font-display text-[15px] font-extrabold text-emerald-700">
                <Check size={17} strokeWidth={3} />
                Premium is active
              </p>
              <Button to="/home" variant="neutral" size="lg" className="mt-3">
                Back to Home
              </Button>
            </div>
          ) : (
            <>
              <Button onClick={() => setConfirm(true)} variant="gold" size="xl" icon={Sparkles}>
                Start Premium — {plan.price}
              </Button>
              <p className="mt-3 text-center text-[12px] font-medium text-ink-400">
                Cancel anytime · {plan.period === 'per year' ? 'Billed yearly' : 'Billed monthly'}
              </p>
            </>
          )}
        </div>
      </div>

      {/* confirm */}
      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Start Premium?"
        subtitle={`${plan.name} · ${plan.price} ${plan.period}. This is a demo — no payment is taken.`}
        footer={
          <>
            <Button onClick={start} variant="gold" size="lg" icon={Crown}>
              Confirm
            </Button>
            <Button onClick={() => setConfirm(false)} variant="ghost" size="md">
              Not now
            </Button>
          </>
        }
      >
        <div className="rounded-2xl bg-ink-50 p-3.5">
          <ul className="space-y-2">
            {premiumFeatures.slice(0, 4).map((f) => (
              <li key={f.label} className="flex items-center gap-2 text-[12.5px] font-semibold text-ink-600">
                <Check size={13} className="shrink-0 text-emerald-500" strokeWidth={3.2} />
                {f.label}
              </li>
            ))}
            <li className="text-[12px] font-semibold text-ink-400">+ 6 more features</li>
          </ul>
        </div>
      </Modal>
    </div>
  )
}
