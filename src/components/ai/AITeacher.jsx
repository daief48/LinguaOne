import { useId } from 'react'
import { Sparkles } from 'lucide-react'

/**
 * Aria — the AI teacher.
 * A soft gradient orb with a calm, friendly face. Deliberately abstract:
 * professional and modern rather than a cartoon mascot.
 *
 * state: 'idle' | 'speaking' | 'listening' | 'thinking' | 'happy'
 */
export function AITeacher({
  size = 72,
  state = 'idle',
  className = '',
  halo = true,
  ring = false,
  breathe = true,
}) {
  const id = useId().replace(/:/g, '')
  const speaking = state === 'speaking'
  const thinking = state === 'thinking'
  const listening = state === 'listening'
  const happy = state === 'happy'

  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      {halo && (
        <div
          className="absolute -inset-[18%] rounded-full bg-gradient-to-br from-violet-400/35 via-indigo-400/25 to-cyan-300/30 blur-xl"
          aria-hidden="true"
        />
      )}
      {ring && (
        <>
          <span className="absolute inset-0 animate-ring-ping rounded-full border-2 border-violet-400/50" aria-hidden="true" />
          <span
            className="absolute inset-0 animate-ring-ping rounded-full border-2 border-cyan-300/40"
            style={{ animationDelay: '700ms' }}
            aria-hidden="true"
          />
        </>
      )}

      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={`relative block origin-center drop-shadow-[0_10px_24px_rgba(91,33,182,0.35)] ${
          breathe && !speaking ? 'animate-breathe' : ''
        }`}
      >
        <defs>
          <linearGradient id={`face-${id}`} x1="10%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#A78BFA" />
            <stop offset="45%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <radialGradient id={`gloss-${id}`} cx="32%" cy="24%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`rim-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* head */}
        <rect x="6" y="6" width="88" height="88" rx="30" fill={`url(#face-${id})`} />
        <rect x="6" y="6" width="88" height="88" rx="30" fill={`url(#gloss-${id})`} />
        <rect
          x="7.2"
          y="7.2"
          width="85.6"
          height="85.6"
          rx="29"
          fill="none"
          stroke={`url(#rim-${id})`}
          strokeWidth="1.6"
        />

        {/* antenna spark — only reads well above ~44px */}
        {size >= 44 && (
          <>
            <circle cx="50" cy="3.5" r="3.2" fill="#FDE68A" />
            <line
              x1="50"
              y1="6.5"
              x2="50"
              y2="12"
              stroke="#FDE68A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.85"
            />
          </>
        )}

        {/* eyes */}
        <g className="origin-center animate-blink" style={{ transformBox: 'fill-box' }}>
          <rect x="30" y="40" width="9" height="15" rx="4.5" fill="#FFFFFF" />
          <rect x="61" y="40" width="9" height="15" rx="4.5" fill="#FFFFFF" />
        </g>
        {/* pupils shift slightly while thinking */}
        <g opacity="0.28" fill="#312E81">
          <circle cx={thinking ? 36.5 : 34.5} cy="49" r="2.4" />
          <circle cx={thinking ? 67.5 : 65.5} cy="49" r="2.4" />
        </g>

        {/* cheeks */}
        <ellipse cx="26" cy="63" rx="6" ry="3.6" fill="#F9A8D4" opacity={happy ? 0.55 : 0.32} />
        <ellipse cx="74" cy="63" rx="6" ry="3.6" fill="#F9A8D4" opacity={happy ? 0.55 : 0.32} />

        {/* mouth */}
        {speaking ? (
          <ellipse
            cx="50"
            cy="68"
            rx="8"
            ry="6"
            fill="#FFFFFF"
            className="origin-center animate-talk"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ) : listening ? (
          <circle cx="50" cy="68" r="4.5" fill="#FFFFFF" opacity="0.92" />
        ) : (
          <path
            d={happy ? 'M40 65 Q50 76 60 65' : 'M41 66 Q50 73 59 66'}
            stroke="#FFFFFF"
            strokeWidth="3.6"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>

      {thinking && (
        <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-white shadow-soft">
          <Sparkles size={13} className="text-violet-500" strokeWidth={2.6} />
        </span>
      )}
    </div>
  )
}

/** Row: avatar + name + status. Used in headers. */
export function AITeacherRow({ name = 'Aria', status = 'Your AI Teacher', state = 'idle', size = 42, dark = false }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <AITeacher size={size} state={state} halo={false} />
      <div className="min-w-0">
        <div className={`font-display text-[14px] font-extrabold leading-tight ${dark ? 'text-white' : 'text-ink-900'}`}>
          {name}
        </div>
        <div className={`flex items-center gap-1 text-[11.5px] font-medium ${dark ? 'text-white/70' : 'text-ink-400'}`}>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          {status}
        </div>
      </div>
    </div>
  )
}

export default AITeacher
