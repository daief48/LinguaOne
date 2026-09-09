import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { StepProgress } from '../ui/Progress'

/** Header for the setup flow: back arrow, step bar, title + subtitle. */
export function FlowHeader({ step, total = 4, title, subtitle, backTo, onBack, right }) {
  const navigate = useNavigate()
  return (
    <div className="px-5 pt-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => (onBack ? onBack() : backTo ? navigate(backTo) : navigate(-1))}
          aria-label="Go back"
          className="press focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-200 bg-white text-ink-600 shadow-soft hover:text-ink-900"
        >
          <ChevronLeft size={19} strokeWidth={2.5} />
        </button>
        {typeof step === 'number' && (
          <StepProgress total={total} current={step - 1} className="flex-1" />
        )}
        {right || (
          <span className="shrink-0 text-[12px] font-bold tabular-nums text-ink-400">
            {step}/{total}
          </span>
        )}
      </div>

      {title && (
        <div className="mt-6">
          <h1 className="title-xl text-balance">{title}</h1>
          {subtitle && <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}

export default FlowHeader
