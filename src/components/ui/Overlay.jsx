import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

export const OVERLAY_ROOT_ID = 'app-overlay-root'

/** Overlays mount inside the phone frame, not the browser viewport. */
function usePortalTarget() {
  const [el, setEl] = useState(null)
  useEffect(() => {
    setEl(document.getElementById(OVERLAY_ROOT_ID) || document.body)
  }, [])
  return el
}

function useEscape(open, onClose) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
}

export function Modal({ open, onClose, title, subtitle, children, footer, className = '' }) {
  const target = usePortalTarget()
  useEscape(open, onClose)
  if (!open || !target) return null

  return createPortal(
    <div className="absolute inset-0 z-50 flex items-center justify-center p-5">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink-900/45 backdrop-blur-[3px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative w-full max-w-[340px] animate-scale-in rounded-4xl border border-white/70 bg-white p-5 shadow-float ${className}`}
      >
        {onClose && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="press focus-ring absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        )}
        {title && <h3 className="title-lg pr-8">{title}</h3>}
        {subtitle && <p className="body-muted mt-1.5">{subtitle}</p>}
        <div className={title ? 'mt-4' : ''}>{children}</div>
        {footer && <div className="mt-5 space-y-2">{footer}</div>}
      </div>
    </div>,
    target,
  )
}

export function BottomSheet({ open, onClose, title, subtitle, children, footer, className = '' }) {
  const target = usePortalTarget()
  useEscape(open, onClose)
  if (!open || !target) return null

  return createPortal(
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink-900/45 backdrop-blur-[3px]"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={`relative max-h-[86%] animate-sheet-up overflow-y-auto rounded-t-[30px] border-t border-white/70 bg-white pb-6 shadow-float scroll-area ${className}`}
      >
        <div className="sticky top-0 z-10 rounded-t-[30px] bg-white/95 px-5 pb-3 pt-3 backdrop-blur">
          <div className="mx-auto mb-3.5 h-1.5 w-10 rounded-full bg-ink-200" />
          {title && (
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="title-lg">{title}</h3>
                {subtitle && <p className="body-muted mt-1">{subtitle}</p>}
              </div>
              {onClose && (
                <button
                  type="button"
                  aria-label="Close"
                  onClick={onClose}
                  className="press focus-ring mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-100 text-ink-500 hover:bg-ink-200"
                >
                  <X size={15} strokeWidth={2.6} />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="px-5">{children}</div>
        {footer && <div className="mt-5 space-y-2 px-5">{footer}</div>}
      </div>
    </div>,
    target,
  )
}

export { usePortalTarget }
