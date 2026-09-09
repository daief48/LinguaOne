import { useId } from 'react'

/**
 * Circular SVG flags.
 * Flag emoji (🇬🇧, 🇩🇪, …) don't render on Windows — they fall back to the
 * letter pair "GB" / "DE" — so the demo draws them instead.
 */

const flags = {
  en: (
    <>
      <rect width="24" height="24" fill="#012169" />
      <path d="M0 0 24 24M24 0 0 24" stroke="#FFF" strokeWidth="5" />
      <path d="M0 0 24 24M24 0 0 24" stroke="#C8102E" strokeWidth="2.6" />
      <path d="M12 0v24M0 12h24" stroke="#FFF" strokeWidth="8" />
      <path d="M12 0v24M0 12h24" stroke="#C8102E" strokeWidth="4.6" />
    </>
  ),
  de: (
    <>
      <rect width="24" height="8" fill="#111" />
      <rect y="8" width="24" height="8" fill="#DD0000" />
      <rect y="16" width="24" height="8" fill="#FFCE00" />
    </>
  ),
  fr: (
    <>
      <rect width="8" height="24" fill="#0055A4" />
      <rect x="8" width="8" height="24" fill="#FFF" />
      <rect x="16" width="8" height="24" fill="#EF4135" />
    </>
  ),
  es: (
    <>
      <rect width="24" height="24" fill="#AA151B" />
      <rect y="6" width="24" height="12" fill="#F1BF00" />
      <circle cx="8.5" cy="12" r="2" fill="#AA151B" opacity="0.75" />
    </>
  ),
  ar: (
    <>
      <rect width="24" height="24" fill="#165D31" />
      <rect x="5" y="9" width="14" height="1.7" rx="0.85" fill="#FFF" />
      <rect x="5" y="13.5" width="12" height="1.5" rx="0.75" fill="#FFF" />
      <path d="M17 12.5h2.6l-1 1.5" fill="#FFF" />
    </>
  ),
  ja: (
    <>
      <rect width="24" height="24" fill="#FFF" />
      <circle cx="12" cy="12" r="6.4" fill="#BC002D" />
    </>
  ),
  it: (
    <>
      <rect width="8" height="24" fill="#009246" />
      <rect x="8" width="8" height="24" fill="#FFF" />
      <rect x="16" width="8" height="24" fill="#CE2B37" />
    </>
  ),
  zh: (
    <>
      <rect width="24" height="24" fill="#DE2910" />
      <path
        d="m7 5.4 1.1 3.3H11.6L8.8 10.8l1.1 3.3L7 12l-2.8 2.1 1.1-3.3-2.8-2.1h3.5z"
        fill="#FFDE00"
      />
      <circle cx="13.5" cy="5.5" r="1.2" fill="#FFDE00" />
      <circle cx="16.5" cy="8.5" r="1.2" fill="#FFDE00" />
      <circle cx="16.5" cy="12.5" r="1.2" fill="#FFDE00" />
      <circle cx="13.5" cy="15.5" r="1.2" fill="#FFDE00" />
    </>
  ),
  ko: (
    <>
      <rect width="24" height="24" fill="#FFF" />
      <path d="M12 7.2a4.8 4.8 0 0 1 0 9.6 2.4 2.4 0 0 1 0-4.8 2.4 2.4 0 0 0 0-4.8z" fill="#CD2E3A" />
      <path d="M12 7.2a4.8 4.8 0 0 0 0 9.6 2.4 2.4 0 0 0 0-4.8 2.4 2.4 0 0 1 0-4.8z" fill="#0047A0" />
      <g fill="#111" opacity="0.85">
        <rect x="2.4" y="5.4" width="4" height="0.9" transform="rotate(33 4.4 5.85)" />
        <rect x="17.6" y="17.7" width="4" height="0.9" transform="rotate(33 19.6 18.15)" />
      </g>
    </>
  ),
}

export function Flag({ code = 'en', size = 22, className = '', ring = true }) {
  const id = useId().replace(/:/g, '')
  const art = flags[code] || flags.en

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={`${code.toUpperCase()} flag`}
    >
      <defs>
        <clipPath id={`flag-${id}`}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#flag-${id})`}>{art}</g>
      {ring && <circle cx="12" cy="12" r="11.4" fill="none" stroke="rgba(11,16,32,0.14)" strokeWidth="1.2" />}
    </svg>
  )
}

export default Flag
