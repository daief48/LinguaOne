import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { AITeacher } from '../components/ai/AITeacher'
import { canGoBack } from '../components/layout/TopBar'
import { useApp } from '../context/appContext'
import { user } from '../data/mock'
import { BRAND } from '../data/brand'

function Field({ icon: IconCmp, label, type = 'text', value, onChange, placeholder, trailing }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block">{label}</span>
      <span className="relative flex items-center">
        <IconCmp size={16} className="pointer-events-none absolute left-3.5 text-ink-400" strokeWidth={2.3} />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="focus-ring h-[52px] w-full rounded-2xl border border-ink-200 bg-white pl-10 pr-11 text-[14.5px] font-medium text-ink-900 placeholder:text-ink-300 hover:border-ink-300"
        />
        {trailing}
      </span>
    </label>
  )
}

export default function Login() {
  const navigate = useNavigate()
  const { showToast } = useApp()
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('linguaone')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = (e) => {
    e?.preventDefault()
    setBusy(true)
    window.setTimeout(() => {
      showToast(`Welcome back, ${user.name}!`, { variant: 'success' })
      navigate('/home')
    }, 900)
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="px-5 pt-3">
        <button
          type="button"
          onClick={() => (canGoBack() ? navigate(-1) : navigate('/onboarding'))}
          aria-label="Go back"
          className="press focus-ring grid h-10 w-10 place-items-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-soft hover:text-ink-900"
        >
          <ChevronLeft size={19} strokeWidth={2.5} />
        </button>
      </div>

      <div className="flex-1 px-5 pt-6 animate-page-in">
        <div className="flex items-center gap-3">
          <AITeacher size={54} state="happy" />
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.14em] text-violet-600">
              <Sparkles size={10} strokeWidth={2.8} />
              {BRAND.name}
            </span>
            <h1 className="mt-1.5 title-xl">Welcome back</h1>
          </div>
        </div>
        <p className="mt-2.5 text-[14px] leading-relaxed text-ink-500">
          Your streak, plan and saved words are waiting.
        </p>

        <form onSubmit={submit} className="mt-7 space-y-3.5">
          <Field icon={Mail} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@email.com" />
          <Field
            icon={Lock}
            label="Password"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
            trailing={
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? 'Hide password' : 'Show password'}
                className="press focus-ring absolute right-3 grid h-8 w-8 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-700"
              >
                {show ? <EyeOff size={16} strokeWidth={2.3} /> : <Eye size={16} strokeWidth={2.3} />}
              </button>
            }
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => showToast('Reset link sent to your email', { variant: 'success' })}
              className="press focus-ring rounded-lg py-1 text-[12.5px] font-bold text-violet-600 hover:text-violet-700"
            >
              Forgot password?
            </button>
          </div>

          <Button as="button" type="submit" size="xl" loading={busy} iconRight={busy ? undefined : ArrowRight}>
            {busy ? 'Signing in…' : 'Log in'}
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-ink-100" />
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-ink-300">or</span>
          <span className="h-px flex-1 bg-ink-100" />
        </div>

        <div className="space-y-2.5">
          {[
            { id: 'google', label: 'Continue with Google', mark: 'G', tone: 'text-[#4285F4]' },
            { id: 'apple', label: 'Continue with Apple', mark: '', tone: 'text-ink-900' },
          ].map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                showToast(`${p.label} — demo sign-in`, { variant: 'default' })
                submit()
              }}
              className="press focus-ring flex h-[52px] w-full items-center justify-center gap-2.5 rounded-2xl border border-ink-200 bg-white text-[14.5px] font-bold text-ink-800 shadow-soft hover:border-ink-300"
            >
              <span className={`font-display text-[17px] font-extrabold ${p.tone}`}>{p.mark}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pb-7 pt-6 safe-bottom">
        <p className="text-center text-[13.5px] font-semibold text-ink-500">
          New here?{' '}
          <Link to="/language" className="font-bold text-violet-600 hover:text-violet-700">
            Create an account
          </Link>
        </p>
        <p className="mt-3 text-center text-[11.5px] text-ink-300">
          Demo build — any credentials sign you in.
        </p>
      </div>
    </div>
  )
}
