/**
 * Fake iOS status bar — desktop preview only (the real one shows on a phone).
 * Screens with a dark hero render this themselves so the hero runs edge to edge.
 */
export function StatusBar({ dark = false, className = '' }) {
  return (
    <div
      className={`z-20 hidden shrink-0 items-center justify-between px-7 pt-3 text-[12px] font-semibold sm:flex ${
        dark ? 'text-white' : 'text-ink-900'
      } ${className}`}
      aria-hidden="true"
    >
      <span className="tabular-nums tracking-tight">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={i * 4.4}
              y={8 - i * 2.5}
              width="3"
              height={3 + i * 2.5}
              rx="1"
              fill="currentColor"
              opacity={i === 3 ? 0.35 : 1}
            />
          ))}
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 9.6 5.9 7.9a2.3 2.3 0 0 1 3.2 0L7.5 9.6Z" fill="currentColor" />
          <path d="M3.6 5.9a5.7 5.7 0 0 1 7.8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M1.3 3.5a9 9 0 0 1 12.4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect
            x="0.6"
            y="0.6"
            width="20"
            height="10.8"
            rx="3"
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
          <rect x="2.2" y="2.2" width="15" height="7.6" rx="1.8" fill="currentColor" />
          <path d="M22.5 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity="0.45" />
        </svg>
      </div>
    </div>
  )
}

export default StatusBar
