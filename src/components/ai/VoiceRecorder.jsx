import { Check, Loader2, Mic, Square } from 'lucide-react'
import { Waveform } from './Waveform'

const stateCopy = {
  idle: { label: 'Tap to speak', tone: 'text-ink-400' },
  listening: { label: 'Listening…', tone: 'text-violet-600' },
  processing: { label: 'Processing…', tone: 'text-indigo-600' },
  done: { label: 'Got it', tone: 'text-emerald-600' },
}

/**
 * Simulated microphone control.
 * state: 'idle' | 'listening' | 'processing' | 'done'
 */
export function VoiceRecorder({
  state = 'idle',
  onPress,
  size = 84,
  label,
  hint,
  hold = false,
  showWave = true,
  disabled = false,
  className = '',
}) {
  const listening = state === 'listening'
  const processing = state === 'processing'
  const done = state === 'done'
  const copy = stateCopy[state] || stateCopy.idle

  const surface = listening
    ? 'bg-gradient-to-br from-rose-500 via-pink-500 to-violet-600'
    : processing
      ? 'bg-gradient-to-br from-indigo-500 to-violet-600'
      : done
        ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
        : 'bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600'

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {showWave && (
        <div className="mb-4 h-9 w-full max-w-[230px]">
          <Waveform
            active={listening}
            bars={26}
            tint={listening ? 'pink' : 'violet'}
            height={36}
            className={listening ? 'opacity-100' : 'opacity-30'}
          />
        </div>
      )}

      <div className="relative grid place-items-center" style={{ width: size + 34, height: size + 34 }}>
        {listening && (
          <>
            <span
              className="absolute rounded-full bg-pink-400/45 animate-mic-pulse"
              style={{ width: size, height: size }}
            />
            <span
              className="absolute rounded-full bg-violet-400/40 animate-mic-pulse"
              style={{ width: size, height: size, animationDelay: '600ms' }}
            />
          </>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={onPress}
          aria-label={label || copy.label}
          className={`press focus-ring relative grid place-items-center rounded-full text-white shadow-[0_18px_40px_-14px_rgba(79,70,229,0.75)] transition-all duration-300 ${surface} ${
            disabled ? 'opacity-50' : ''
          }`}
          style={{ width: size, height: size }}
        >
          {processing ? (
            <Loader2 size={size * 0.36} className="animate-spin" strokeWidth={2.4} />
          ) : done ? (
            <Check size={size * 0.4} strokeWidth={2.8} />
          ) : listening ? (
            <Square size={size * 0.3} strokeWidth={2.6} className="fill-white" />
          ) : (
            <Mic size={size * 0.38} strokeWidth={2.3} />
          )}
          <span className="pointer-events-none absolute inset-1 rounded-full border border-white/25" />
        </button>
      </div>

      <p className={`mt-3.5 font-display text-[14px] font-extrabold ${copy.tone}`}>{label || copy.label}</p>
      {(hint || hold) && (
        <p className="mt-1 text-center text-[12px] text-ink-400">
          {hint || (hold ? 'Hold to Speak' : 'Tap the microphone to answer')}
        </p>
      )}
    </div>
  )
}

export default VoiceRecorder
