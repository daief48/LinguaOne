/**
 * Pixel / Android status bar — desktop preview only (a real phone draws
 * its own). Screens with a dark hero render this themselves so the hero
 * runs edge to edge behind it.
 */
export function StatusBar({ dark = false, className = '' }) {
  return (
    <div
      className={`z-20 hidden h-[42px] shrink-0 items-center justify-between px-6 text-[13px] font-semibold sm:flex ${
        dark ? 'text-white' : 'text-ink-900 dark:text-white'
      } ${className}`}
      aria-hidden="true"
    >
      <span className="tabular-nums tracking-tight">9:41</span>

      <div className="flex items-center gap-[5px]">
        {/* mobile signal */}
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
          <path d="M13.6 1.2v9.6H11V1.2a.6.6 0 0 1 .6-.6h1.4a.6.6 0 0 1 .6.6Z" fill="currentColor" />
          <path d="M9.4 3.6v7.2H6.8V3.6a.6.6 0 0 1 .6-.6h1.4a.6.6 0 0 1 .6.6Z" fill="currentColor" />
          <path d="M5.2 6v4.8H2.6V6a.6.6 0 0 1 .6-.6h1.4a.6.6 0 0 1 .6.6Z" fill="currentColor" opacity="0.35" />
        </svg>

        {/* wifi */}
        <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
          <path
            d="M7.5 1.1c2.6 0 5 .95 6.6 2.5L7.5 11 .9 3.6A9.7 9.7 0 0 1 7.5 1.1Z"
            fill="currentColor"
          />
        </svg>

        {/* battery — Material style */}
        <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
          <rect x="0.7" y="0.7" width="18" height="10.6" rx="3.4" stroke="currentColor" strokeWidth="1.4" />
          <rect x="2.6" y="2.6" width="12.4" height="6.8" rx="2" fill="currentColor" />
          <rect x="20" y="4.2" width="1.6" height="3.6" rx="0.8" fill="currentColor" opacity="0.55" />
        </svg>
      </div>
    </div>
  )
}

export default StatusBar
