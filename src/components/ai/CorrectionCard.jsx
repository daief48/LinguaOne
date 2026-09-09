import { useMemo } from 'react'
import { ArrowDown, Lightbulb, Sparkles, Volume2 } from 'lucide-react'
import { XPBadge } from '../ui/Badges'

/** Word-level LCS diff so the changed part can be highlighted precisely. */
function diffWords(before, after) {
  const a = before.split(/\s+/).filter(Boolean)
  const b = after.split(/\s+/).filter(Boolean)
  const n = a.length
  const m = b.length
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))

  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      const same = a[i].replace(/[.,!?]/g, '').toLowerCase() === b[j].replace(/[.,!?]/g, '').toLowerCase()
      dp[i][j] = same ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const left = []
  const right = []
  let i = 0
  let j = 0
  while (i < n && j < m) {
    const same = a[i].replace(/[.,!?]/g, '').toLowerCase() === b[j].replace(/[.,!?]/g, '').toLowerCase()
    if (same) {
      left.push({ w: a[i], changed: false })
      right.push({ w: b[j], changed: false })
      i += 1
      j += 1
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      left.push({ w: a[i], changed: true })
      i += 1
    } else {
      right.push({ w: b[j], changed: true })
      j += 1
    }
  }
  while (i < n) {
    left.push({ w: a[i], changed: true })
    i += 1
  }
  while (j < m) {
    right.push({ w: b[j], changed: true })
    j += 1
  }
  return { left, right }
}

/** Collapse consecutive tokens with the same flag into one run. */
function groupRuns(tokens) {
  return tokens.reduce((runs, t) => {
    const last = runs[runs.length - 1]
    if (last && last.changed === t.changed) last.words.push(t.w)
    else runs.push({ changed: t.changed, words: [t.w] })
    return runs
  }, [])
}

function DiffLine({ tokens, tone }) {
  const styles =
    tone === 'wrong'
      ? 'bg-rose-100 text-rose-700 line-through decoration-rose-400/70 decoration-2'
      : 'bg-emerald-100 text-emerald-700'
  const runs = groupRuns(tokens)

  return (
    <p className={`text-[14.5px] font-semibold leading-relaxed ${tone === 'wrong' ? 'text-ink-500' : 'text-ink-900'}`}>
      {runs.map((run, i) => {
        const text = run.words.join(' ')
        return (
          <span key={i}>
            {run.changed ? <mark className={`rounded-md px-1 py-0.5 ${styles}`}>{text}</mark> : text}
            {i < runs.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </p>
  )
}

/**
 * The signature "instant feedback" card.
 * Shows what the learner said, the natural version, and why.
 */
export function CorrectionCard({
  original,
  corrected,
  explanation,
  tip,
  xp,
  compact = false,
  onListen,
  footer,
  className = '',
}) {
  const { left, right } = useMemo(() => diffWords(original, corrected), [original, corrected])

  return (
    <div
      className={`relative overflow-hidden rounded-4xl border border-violet-100 bg-white shadow-card animate-slide-up ${className}`}
    >
      <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full bg-violet-100/60 blur-2xl" />

      <div className="relative flex items-center gap-2 border-b border-violet-100/80 bg-gradient-to-r from-violet-50 via-indigo-50/60 to-transparent px-4 py-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
          <Sparkles size={14} strokeWidth={2.5} />
        </span>
        <span className="font-display text-[13px] font-extrabold text-ink-900">AI Correction</span>
        {typeof xp === 'number' && <XPBadge amount={xp} size="sm" className="ml-auto" />}
      </div>

      <div className="relative p-4">
        <div className="rounded-2xl bg-ink-50 p-3">
          <span className="eyebrow mb-1.5 block text-ink-400">You said</span>
          <DiffLine tokens={left} tone="wrong" />
        </div>

        <div className="my-2 flex justify-center">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-white shadow-soft ring-1 ring-ink-100">
            <ArrowDown size={13} className="text-violet-500" strokeWidth={2.8} />
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="eyebrow text-emerald-600">You could say</span>
            {onListen && (
              <button
                type="button"
                onClick={onListen}
                aria-label="Listen to the corrected sentence"
                className="press focus-ring grid h-6 w-6 place-items-center rounded-full bg-white text-emerald-600 shadow-soft"
              >
                <Volume2 size={12} strokeWidth={2.6} />
              </button>
            )}
          </div>
          <DiffLine tokens={right} tone="right" />
        </div>

        {(explanation || tip) && !compact && (
          <div className="mt-3 flex gap-2.5 rounded-2xl border border-amber-100 bg-amber-50/70 p-3">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-600">
              <Lightbulb size={14} strokeWidth={2.5} />
            </span>
            <div className="min-w-0">
              <p className="text-[12.5px] font-bold text-amber-800">{tip ? 'Grammar Tip' : 'Why'}</p>
              <p className="mt-0.5 text-[12.5px] leading-relaxed text-amber-800/85">{explanation || tip}</p>
            </div>
          </div>
        )}

        {compact && (explanation || tip) && (
          <p className="mt-2.5 flex items-start gap-1.5 text-[12.5px] leading-relaxed text-ink-500">
            <Lightbulb size={13} className="mt-0.5 shrink-0 text-amber-500" strokeWidth={2.5} />
            {explanation || tip}
          </p>
        )}

        {footer && <div className="mt-3.5">{footer}</div>}
      </div>
    </div>
  )
}

export default CorrectionCard
