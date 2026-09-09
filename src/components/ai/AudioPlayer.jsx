import { useCallback, useEffect, useRef, useState } from 'react'
import { Gauge, Pause, Play, RotateCcw } from 'lucide-react'
import { WaveformScrubber } from './Waveform'
import { formatTime } from '../../hooks/useAnimations'
import { tint as getTint } from '../../data/tints'

const SPEEDS = [1, 0.75, 1.25]

/**
 * Simulated audio player. No real audio file — playback is a timer,
 * which keeps the prototype dependency-free but fully interactive.
 */
export function AudioPlayer({
  duration = 42,
  title,
  subtitle,
  tint = 'cyan',
  onTime,
  autoPlay = false,
  compact = false,
  className = '',
}) {
  const t = getTint(tint)
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(autoPlay)
  const [speed, setSpeed] = useState(1)
  const raf = useRef(0)
  const last = useRef(0)
  const onTimeRef = useRef(onTime)

  useEffect(() => {
    onTimeRef.current = onTime
  }, [onTime])

  useEffect(() => {
    if (!playing) return undefined
    last.current = performance.now()
    const tick = (now) => {
      const dt = ((now - last.current) / 1000) * speed
      last.current = now
      setTime((prev) => {
        const next = prev + dt
        if (next >= duration) {
          setPlaying(false)
          onTimeRef.current?.(duration)
          return duration
        }
        onTimeRef.current?.(next)
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [playing, speed, duration])

  const toggle = useCallback(() => {
    setPlaying((p) => {
      if (!p && time >= duration) setTime(0)
      return !p
    })
  }, [time, duration])

  const restart = () => {
    setTime(0)
    onTimeRef.current?.(0)
    setPlaying(true)
  }

  const seek = (ratio) => {
    const next = ratio * duration
    setTime(next)
    onTimeRef.current?.(next)
  }

  const progress = duration ? time / duration : 0

  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className={`press focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white ${t.grad} ${t.glow}`}
        >
          {playing ? <Pause size={16} className="fill-white" /> : <Play size={16} className="ml-0.5 fill-white" />}
        </button>
        <div className="h-8 flex-1">
          <WaveformScrubber bars={34} progress={progress} tint={tint} onSeek={seek} />
        </div>
        <span className="w-11 shrink-0 text-right font-mono text-[11.5px] font-semibold tabular-nums text-ink-400">
          {formatTime(duration - time)}
        </span>
      </div>
    )
  }

  return (
    <div className={`surface p-4 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-3.5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h3 className="title-md truncate">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-[12px] text-ink-400">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={() => setSpeed(SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length])}
            className="press focus-ring flex h-7 shrink-0 items-center gap-1 rounded-full bg-ink-100 px-2.5 text-[11.5px] font-bold text-ink-600 hover:bg-ink-200"
          >
            <Gauge size={12} strokeWidth={2.6} />
            {speed}×
          </button>
        </div>
      )}

      <div className="mb-3 h-11">
        <WaveformScrubber bars={44} progress={progress} tint={tint} height={44} onSeek={seek} />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={restart}
          aria-label="Replay"
          className="press focus-ring grid h-9 w-9 place-items-center rounded-full bg-ink-100 text-ink-500 hover:bg-ink-200"
        >
          <RotateCcw size={15} strokeWidth={2.4} />
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className={`press focus-ring grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br text-white ${t.grad} ${t.glow}`}
        >
          {playing ? <Pause size={19} className="fill-white" /> : <Play size={19} className="ml-0.5 fill-white" />}
        </button>
        <div className="ml-auto font-mono text-[12.5px] font-semibold tabular-nums text-ink-500">
          <span className="text-ink-900">{formatTime(time)}</span>
          <span className="text-ink-300"> / {formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer
