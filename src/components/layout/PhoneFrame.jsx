/**
 * Desktop device mockup — Google Pixel.
 *
 * Below `sm` the app is the page: no frame, no chrome. From `sm` up it sits
 * inside a Pixel-style shell — uniform bezel, centred hole-punch camera,
 * power + volume rocker on the right edge, Android gesture bar at the bottom.
 */

/** Pixel's centred hole-punch selfie camera. Floats above app content. */
function PunchHoleCamera() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-[13px] z-[60] hidden -translate-x-1/2 sm:block">
      <span className="relative grid h-[14px] w-[14px] place-items-center rounded-full bg-[#0a0d14] shadow-[0_0_0_1.5px_rgba(0,0,0,0.35)]">
        <span className="h-[8px] w-[8px] rounded-full bg-gradient-to-br from-[#1d3a5c] to-[#0b1522]" />
        <span className="absolute left-[3.5px] top-[3px] h-[2.5px] w-[2.5px] rounded-full bg-white/35" />
      </span>
    </div>
  )
}

/** Android gesture navigation bar. */
function GestureBar({ dark = false }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[8px] z-[55] hidden justify-center sm:flex">
      <span
        className={`h-[4px] w-[112px] rounded-full transition-colors duration-500 ${
          dark ? 'bg-white/75' : 'bg-ink-900/30'
        }`}
      />
    </div>
  )
}

/**
 * Pixel puts both buttons on the right: power on top (short, lighter finish),
 * volume rocker below it.
 */
function SideButtons() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="true">
      {/* power */}
      <span className="absolute -right-[3px] top-[150px] h-[38px] w-[3px] rounded-r-md bg-gradient-to-b from-[#8b93a3] via-[#6d7484] to-[#8b93a3]" />
      {/* volume rocker */}
      <span className="absolute -right-[3px] top-[204px] h-[68px] w-[3px] rounded-r-md bg-gradient-to-b from-[#4c525e] via-[#343a45] to-[#4c525e]" />
      {/* left antenna seam */}
      <span className="absolute -left-[1px] top-[190px] h-[2px] w-[2px] rounded-full bg-white/20" />
    </div>
  )
}

export function PhoneFrame({ children, darkIndicator = false, screenProps = {} }) {
  return (
    <div className="relative z-10 w-full sm:w-auto">
      {/* outer shell — matte graphite with a polished aluminium rail */}
      <div className="relative w-full sm:rounded-[50px] sm:bg-gradient-to-b sm:from-[#4a505c] sm:via-[#22262e] sm:to-[#3c424d] sm:p-[10px] sm:shadow-device">
        {/* rail highlight */}
        <div
          className="pointer-events-none absolute inset-0 hidden rounded-[50px] sm:block"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 12%, rgba(255,255,255,0) 88%, rgba(255,255,255,0.18) 100%)',
          }}
          aria-hidden="true"
        />
        {/* inner black rim between rail and glass */}
        <div
          className="pointer-events-none absolute inset-[7px] hidden rounded-[43px] ring-[3px] ring-[#0a0c11] sm:block"
          aria-hidden="true"
        />
        <SideButtons />

        {/* screen */}
        <div
          {...screenProps}
          className={`relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white sm:h-[min(872px,calc(100dvh-8rem))] sm:w-[430px] sm:rounded-[41px] ${
            screenProps.className || ''
          }`}
        >
          {children}
          <GestureBar dark={darkIndicator} />
        </div>

        <PunchHoleCamera />
      </div>
    </div>
  )
}

export default PhoneFrame
