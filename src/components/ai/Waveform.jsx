import { useMemo } from 'react'
import { tint as getTint } from '../../data/tints'

/* Deterministic pseudo-random so bars look organic but never re-shuffle. */
const seeded = (i, seed = 1) => {
  const x = Math.sin((i + 1) * 12.9898 * seed) * 43758.5453
  return x - Math.floor(x)
}

/**
 * Animated voice waveform.
 * active=true  → bars breathe (listening / speaking)
 * active=false → frozen shape (a recorded clip)
 */
export function Waveform({
  bars = 28,
  active = true,
  tint = 'violet',
  height = 34,
  className = '',
  seed = 1,
  width = 3,
  gradient = true,
  progress = null,
}) {
  const t = getTint(tint)
  const heights = useMemo(
    () => Array.from({ length: bars }, (_, i) => 0.22 + seeded(i, seed) * 0.78),
    [bars, seed],
  )

  return (
    <div className={`flex items-center justify-center gap-[3px] ${className}`} style={{ height }} aria-hidden="true">
      {heights.map((h, i) => {
        const played = progress === null || i / bars <= progress
        return (
          <span
            key={i}
            className={`rounded-full ${
              gradient ? `bg-gradient-to-t ${t.grad}` : t.bar
            } ${active ? 'animate-[wave-bar_1s_ease-in-out_infinite]' : ''}`}
            style={{
              width,
              height: `${h * 100}%`,
              opacity: played ? (active ? 0.95 : 0.85) : 0.22,
              animationDelay: `${(i % 9) * 90}ms`,
              transformOrigin: 'center',
            }}
          />
        )
      })}
    </div>
  )
}

/** Wide, thin waveform used inside audio players. */
export function WaveformScrubber({ bars = 46, progress = 0, tint = 'cyan', height = 32, className = '', onSeek }) {
  const t = getTint(tint)
  const heights = useMemo(() => Array.from({ length: bars }, (_, i) => 0.25 + seeded(i, 3) * 0.75), [bars])

  return (
    <div
      className={`flex h-full cursor-pointer items-center gap-[2.5px] ${className}`}
      style={{ height }}
      onClick={(e) => {
        if (!onSeek) return
        const rect = e.currentTarget.getBoundingClientRect()
        onSeek(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
      }}
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={`flex-1 rounded-full transition-colors duration-200 ${
            i / bars <= progress ? t.bar : 'bg-ink-200'
          }`}
          style={{ height: `${h * 100}%` }}
        />
      ))}
    </div>
  )
}

/** Three-dot "AI is thinking" indicator. */
export function ThinkingDots({ className = '', tint = 'violet' }) {
  const t = getTint(tint)
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${t.bar} animate-dot-bounce`}
          style={{ animationDelay: `${i * 140}ms` }}
        />
      ))}
    </span>
  )
}

export default Waveform
