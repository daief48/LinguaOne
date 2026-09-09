import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { BottomNav } from './BottomNav'
import { StatusBar } from './StatusBar'
import { ToastHost } from '../ui/Toast'
import { OVERLAY_ROOT_ID } from '../ui/Overlay'
import { BRAND } from '../../data/brand'

/** Routes that keep the main tab bar. */
const NAV_ROUTES = ['/home', '/learn', '/practice', '/progress', '/profile']

/** Screens whose hero runs to the top edge — they draw their own status bar. */
const OWN_STATUS_BAR = ['/', '/placement-result', '/ielts', '/premium', '/profile']
const ownsStatusBar = (path) => OWN_STATUS_BAR.includes(path) || path.startsWith('/lesson/')

/** Decorative desktop backdrop — the app sits on top of it. */
function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F3F0FF] via-[#F7F9FC] to-[#EAF6FF]" />
      <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-300/40 blur-[110px]" />
      <div className="absolute -right-24 top-1/4 h-[380px] w-[380px] rounded-full bg-cyan-300/40 blur-[110px]" />
      <div className="absolute bottom-[-140px] left-1/3 h-[400px] w-[400px] rounded-full bg-pink-300/30 blur-[120px]" />
      <div className="absolute inset-0 grid-dots opacity-[0.5]" />
    </div>
  )
}

/** Quiet brand mark beside the frame on large screens. */
function DesktopAside() {
  return (
    <div className="pointer-events-none absolute left-10 top-10 hidden w-[260px] xl:block">
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-glow">
          <Sparkles size={19} strokeWidth={2.4} />
        </span>
        <div>
          <div className="font-display text-[16px] font-extrabold leading-none text-ink-900">{BRAND.name}</div>
          <div className="mt-1 text-[11.5px] font-semibold text-ink-400">{BRAND.descriptor}</div>
        </div>
      </div>
      <p className="mt-4 text-[12.5px] font-medium leading-relaxed text-ink-400">{BRAND.tagline}</p>
    </div>
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  const scrollRef = useRef(null)

  const showNav = NAV_ROUTES.includes(pathname)
  const showStatusBar = !ownsStatusBar(pathname)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center sm:p-6">
      <Backdrop />
      <DesktopAside />

      <div
        id={OVERLAY_ROOT_ID}
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-white sm:h-[min(900px,calc(100dvh-3rem))] sm:w-[430px] sm:rounded-device sm:shadow-device sm:ring-1 sm:ring-ink-900/5"
      >
        {showStatusBar && <StatusBar />}

        <div ref={scrollRef} className="scroll-area relative flex-1 overflow-y-auto overflow-x-hidden">
          {/* A flex column so screens can stretch with `flex-1`. */}
          <div key={pathname} className="flex min-h-full flex-col">
            <Outlet />
          </div>
        </div>

        {showNav && <BottomNav />}
        <ToastHost />
      </div>
    </div>
  )
}

export default AppShell
