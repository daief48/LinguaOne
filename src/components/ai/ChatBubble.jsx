import { AITeacher } from './AITeacher'
import { ThinkingDots } from './Waveform'

/** AI message — avatar + soft white bubble. */
export function AIBubble({ children, state = 'idle', actions, className = '', showAvatar = true }) {
  return (
    <div className={`flex items-start gap-2 animate-slide-up ${className}`}>
      {showAvatar ? (
        <AITeacher size={34} state={state} halo={false} className="mt-1" />
      ) : (
        <span className="w-[34px] shrink-0" />
      )}
      <div className="min-w-0 max-w-[80%]">
        <div className="rounded-3xl rounded-bl-lg border border-ink-100 bg-white px-3.5 py-3 shadow-soft">
          <p className="text-[14px] font-medium leading-relaxed text-ink-800">{children}</p>
        </div>
        {actions && <div className="mt-2 flex flex-wrap gap-1.5">{actions}</div>}
      </div>
    </div>
  )
}

/** Learner message — right-aligned gradient bubble. */
export function UserBubble({ children, meta, className = '' }) {
  return (
    <div className={`flex flex-col items-end animate-slide-up ${className}`}>
      <div className="max-w-[82%] rounded-3xl rounded-br-lg bg-gradient-to-br from-violet-600 to-indigo-600 px-3.5 py-3 shadow-glow">
        <p className="text-[14px] font-medium leading-relaxed text-white">{children}</p>
      </div>
      {meta && <span className="mr-1 mt-1.5 text-[11px] font-medium text-ink-400">{meta}</span>}
    </div>
  )
}

/** "Aria is typing" placeholder. */
export function TypingBubble({ className = '' }) {
  return (
    <div className={`flex items-start gap-2 animate-slide-up ${className}`}>
      <AITeacher size={34} state="thinking" halo={false} className="mt-1" />
      <div className="rounded-3xl rounded-bl-lg border border-ink-100 bg-white px-4 py-3.5 shadow-soft">
        <ThinkingDots />
      </div>
    </div>
  )
}

/** Small pill button used under AI bubbles (Replay / Slow / Transcript). */
export function BubbleAction({ icon: IconCmp, children, onClick, active = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press focus-ring inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-[12px] font-bold transition ${
        active
          ? 'border-violet-200 bg-violet-50 text-violet-700'
          : 'border-ink-200 bg-white text-ink-600 hover:border-ink-300 hover:text-ink-900'
      }`}
    >
      {IconCmp && <IconCmp size={13} strokeWidth={2.5} />}
      {children}
    </button>
  )
}

/** Divider used between conversation turns. */
export function ChatDivider({ children }) {
  return (
    <div className="flex items-center gap-2.5 py-1">
      <span className="h-px flex-1 bg-ink-100" />
      <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink-300">{children}</span>
      <span className="h-px flex-1 bg-ink-100" />
    </div>
  )
}

export { AITeacher }
