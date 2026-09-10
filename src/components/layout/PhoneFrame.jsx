import { useEffect, useState } from 'react'

/**
 * Google Pixel mockup, at true Pixel logical dimensions.
 *
 * The screen is exactly 412 × 915 CSS px — the Pixel 7/8/9 viewport Chrome
 * DevTools reports — so the app renders at real device resolution. When the
 * window is too short for the full device the whole shell is scaled down
 * rather than the screen being cropped, so the proportions stay exact.
 *
 * Under 640px wide there is no frame: the app simply is the page.
 */

export const SCREEN_W = 412
export const SCREEN_H = 915
const BEZEL = 12
const SHELL_W = SCREEN_W + BEZEL * 2 // 436
const SHELL_H = SCREEN_H + BEZEL * 2 // 939
const FRAME_MIN_WIDTH = 640

/** Pixel's centred hole-punch selfie camera. Floats above app content. */
function PunchHoleCamera() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[14px] z-[60] -translate-x-1/2">
      <span className="relative grid h-[13px] w-[13px] place-items-center rounded-full bg-[#07090e] shadow-[0_0_0_1.5px_rgba(0,0,0,0.4)]">
        <span className="h-[7px] w-[7px] rounded-full bg-gradient-to-br from-[#1e3d61] to-[#0a1220]" />
        <span className="absolute left-[3px] top-[2.5px] h-[2px] w-[2px] rounded-full bg-white/40" />
      </span>
    </div>
  )
}

/** Android gesture navigation bar. */
function GestureBar({ dark = false }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[9px] z-[55] flex justify-center">
      <span
        className={`h-[4px] w-[108px] rounded-full transition-colors duration-500 ${
          dark ? 'bg-white/75' : 'bg-ink-900/30'
        }`}
      />
    </div>
  )
}

/** Pixel puts both buttons on the right: power on top, volume rocker below. */
function SideButtons() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="absolute -right-[2.5px] top-[168px] h-[40px] w-[2.5px] rounded-r-md bg-gradient-to-b from-[#9aa2b1] via-[#767e8d] to-[#9aa2b1]" />
      <span className="absolute -right-[2.5px] top-[224px] h-[74px] w-[2.5px] rounded-r-md bg-gradient-to-b from-[#4e545f] via-[#363c46] to-[#4e545f]" />
    </div>
  )
}

/** Whether to draw the device, and how much to shrink it to fit the window. */
function useDeviceFit() {
  const read = () => {
    if (typeof window === 'undefined') return { framed: true, scale: 1 }
    if (window.innerWidth < FRAME_MIN_WIDTH) return { framed: false, scale: 1 }
    const fit = Math.min((window.innerHeight - 40) / SHELL_H, (window.innerWidth - 40) / SHELL_W)
    return { framed: true, scale: Math.min(1, Math.round(fit * 100) / 100) }
  }

  const [fit, setFit] = useState(read)

  useEffect(() => {
    const onResize = () => setFit(read())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return fit
}

export function PhoneFrame({ children, darkIndicator = false, screenProps = {} }) {
  const { framed, scale } = useDeviceFit()

  /* Small screens: the app fills the browser, no device chrome. */
  if (!framed) {
    return (
      <div
        id="app-overlay-root"
        {...screenProps}
        className={`relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-white dark:bg-[#0E0F17] ${
          screenProps.className || ''
        }`}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className="relative z-10 shrink-0"
      style={{ width: SHELL_W * scale, height: SHELL_H * scale }}
    >
      <div
        style={{
          width: SHELL_W,
          height: SHELL_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {/* shell */}
        <div className="relative h-full w-full rounded-[56px] bg-gradient-to-b from-[#4d535f] via-[#23272f] to-[#3f454f] shadow-device">
          <div
            className="pointer-events-none absolute inset-0 rounded-[56px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 10%, rgba(255,255,255,0) 90%, rgba(255,255,255,0.20) 100%)',
            }}
            aria-hidden="true"
          />
          <SideButtons />

          {/* screen */}
          <div
            id="app-overlay-root"
            {...screenProps}
            className={`relative flex flex-col overflow-hidden rounded-[44px] bg-white ring-[3px] ring-[#080a0e] dark:bg-[#0E0F17] ${
              screenProps.className || ''
            }`}
            style={{ width: SCREEN_W, height: SCREEN_H, margin: BEZEL }}
          >
            {children}
            <GestureBar dark={darkIndicator} />
          </div>

          <PunchHoleCamera />
        </div>
      </div>
    </div>
  )
}

export default PhoneFrame
