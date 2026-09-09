import { useCallback, useEffect, useRef, useState } from 'react'

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Flips to true one frame after mount — lets bars/rings animate from 0. */
export function useMounted(delay = 90) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), delay)
    return () => window.clearTimeout(t)
  }, [delay])
  return ready
}

/** Eased count-up for hero numbers. */
export function useCountUp(target, { duration = 1100, decimals = 0, start = 0 } = {}) {
  const [value, setValue] = useState(reduceMotion() ? target : start)
  const frame = useRef(0)

  useEffect(() => {
    if (reduceMotion()) {
      setValue(target)
      return undefined
    }
    const from = start
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(from + (target - from) * eased)
      if (p < 1) frame.current = requestAnimationFrame(tick)
    }
    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [target, duration, start])

  const factor = Math.pow(10, decimals)
  return Math.round(value * factor) / factor
}

/** setInterval that respects changing callbacks and pauses on null delay. */
export function useInterval(callback, delay) {
  const saved = useRef(callback)
  useEffect(() => {
    saved.current = callback
  }, [callback])
  useEffect(() => {
    if (delay === null || delay === undefined) return undefined
    const id = window.setInterval(() => saved.current(), delay)
    return () => window.clearInterval(id)
  }, [delay])
}

/**
 * Runs a list of [delayMs, fn] steps in order, clearing them on unmount.
 * `run` / `cancel` keep a stable identity — callers put `cancel` in effect
 * deps, and a changing identity would cancel the sequence on every render.
 */
export function useSequence() {
  const timers = useRef([])

  const cancel = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t))
    timers.current = []
  }, [])

  const run = useCallback(
    (steps) => {
      cancel()
      let elapsed = 0
      steps.forEach(([ms, fn]) => {
        elapsed += ms
        timers.current.push(window.setTimeout(fn, elapsed))
      })
    },
    [cancel],
  )

  useEffect(() => cancel, [cancel])

  return { run, cancel }
}

export const formatTime = (totalSeconds) => {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}
