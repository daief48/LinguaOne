import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { AITeacher } from '../components/ai/AITeacher'
import { StatusBar } from '../components/layout/StatusBar'
import { BRAND } from '../data/brand'

export default function Splash() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const steps = [
      window.setTimeout(() => setProgress(38), 250),
      window.setTimeout(() => setProgress(72), 900),
      window.setTimeout(() => setProgress(100), 1500),
      window.setTimeout(() => navigate('/onboarding'), 2200),
    ]
    return () => steps.forEach((t) => window.clearTimeout(t))
  }, [navigate])

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden mesh-hero px-8 text-center">
      <StatusBar dark className="absolute inset-x-0 top-0" />
      {/* soft orbs */}
      <div className="pointer-events-none absolute -left-16 top-16 h-52 w-52 rounded-full bg-white/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-14 bottom-28 h-64 w-64 rounded-full bg-cyan-300/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.14] grid-dots" />

      <div className="relative animate-scale-in">
        <AITeacher size={128} state="happy" ring />
      </div>

      <div className="relative mt-9 animate-slide-up" style={{ animationDelay: '160ms' }}>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-white/90 backdrop-blur">
          <Sparkles size={11} strokeWidth={2.8} />
          {BRAND.descriptor}
        </span>
        <h1 className="mt-4 font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
          {BRAND.name}
        </h1>
        <p className="mt-2.5 text-[14.5px] font-medium text-white/85">{BRAND.subtitle}</p>
      </div>

      <div className="relative mt-12 w-full max-w-[210px] animate-fade-in" style={{ animationDelay: '400ms' }}>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-gradient-to-r from-white via-cyan-200 to-white transition-[width] duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-3 text-[11.5px] font-semibold tracking-wide text-white/65">
          Preparing your lessons…
        </p>
      </div>

      <p className="absolute bottom-8 text-[11.5px] font-semibold tracking-[0.1em] text-white/55 safe-bottom">
        {BRAND.tagline}
      </p>
    </div>
  )
}
