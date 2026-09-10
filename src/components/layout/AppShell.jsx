import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import { BottomNav } from './BottomNav'
import { StatusBar } from './StatusBar'
import { PhoneFrame } from './PhoneFrame'
import { ToastHost } from '../ui/Toast'
import { OVERLAY_ROOT_ID } from '../ui/Overlay'
import { BRAND } from '../../data/brand'

/** Routes that keep the main tab bar. */
const NAV_ROUTES = ['/home', '/learn', '/practice', '/progress', '/profile']

/** Screens whose hero runs to the top edge — they draw their own status bar. */
const OWN_STATUS_BAR = ['/', '/placement-result', '/ielts', '/premium', '/profile']
const ownsStatusBar = (path) => OWN_STATUS_BAR.includes(path) || path.startsWith('/lesson/')

/** Screens that are dark where the home indicator sits. */
const DARK_BOTTOM = ['/']

/** Decorative desktop backdrop — slow-drifting colour, dot grid and grain. */
function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden grain" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#F1EDFF] via-[#F7F9FC] to-[#E7F5FF] transition-colors duration-500 dark:from-[#0B0C14] dark:via-[#0E0F18] dark:to-[#141525]" />
      <div className="absolute -left-32 -top-32 h-[440px] w-[440px] animate-drift rounded-full bg-violet-400/35 blur-[120px] dark:bg-violet-600/20" />
      <div
        className="absolute -right-28 top-1/4 h-[400px] w-[400px] animate-drift-slow rounded-full bg-cyan-400/30 blur-[120px] dark:bg-cyan-600/15"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-160px] left-1/3 h-[420px] w-[420px] animate-drift rounded-full bg-pink-400/25 blur-[130px] dark:bg-pink-600/15"
        style={{ animationDelay: '-12s' }}
      />
      <div
        className="absolute right-1/4 top-[-120px] h-[300px] w-[300px] animate-drift-slow rounded-full bg-amber-300/20 blur-[110px] dark:bg-amber-600/10"
        style={{ animationDelay: '-3s' }}
      />
      <div className="absolute inset-0 grid-dots opacity-[0.45] dark:opacity-[0.18]" />
    </div>
  )
}

/** Quiet brand mark beside the frame on large screens. */
function DesktopAside() {
  return (
    <div className="pointer-events-none absolute left-12 top-1/2 hidden w-[240px] -translate-y-1/2 xl:block">
      <div className="animate-slide-up">
        <div className="flex items-center gap-3">
          <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-glow">
            <Sparkles size={20} strokeWidth={2.4} />
            <span className="absolute inset-0 animate-glow-pulse rounded-2xl bg-gradient-to-br from-violet-400 to-cyan-400 blur-lg" />
          </span>
          <div>
            <div className="font-display text-[17px] font-extrabold leading-none text-ink-900 dark:text-white">{BRAND.name}</div>
            <div className="mt-1.5 text-[11.5px] font-semibold text-ink-400 dark:text-ink-400">{BRAND.descriptor}</div>
          </div>
        </div>

        <p className="mt-6 font-display text-[19px] font-extrabold leading-snug tracking-[-0.02em] text-ink-800 dark:text-white">
          <span className="gradient-text">Learn. Speak. Improve.</span>
          <br />
          Every Day.
        </p>

        <div className="mt-5 space-y-2.5">
          {['AI conversation partner', 'Instant grammar feedback', 'IELTS band scoring'].map((f, i) => (
            <div
              key={f}
              className="flex items-center gap-2.5 animate-slide-up"
              style={{ animationDelay: `${160 + i * 90}ms` }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
              <span className="text-[12.5px] font-medium text-ink-500 dark:text-ink-300">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function AppShell() {
  const { pathname } = useLocation()
  const scrollRef = useRef(null)

  const showNav = NAV_ROUTES.includes(pathname)
  const showStatusBar = !ownsStatusBar(pathname)
  const darkIndicator = DARK_BOTTOM.includes(pathname)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  /**
   * One observer per screen reveals every `.reveal` block as it scrolls in.
   * A MutationObserver picks up blocks mounted later (e.g. after a simulated
   * loading state), and a timeout force-reveals anything left — content must
   * never be stuck invisible.
   */
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return undefined

    const showAll = () => root.querySelectorAll('.reveal').forEach((n) => n.classList.add('reveal-in'))
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    if (typeof IntersectionObserver === 'undefined' || reduce) {
      showAll()
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in')
            io.unobserve(entry.target)
          }
        })
      },
      { root, threshold: 0.1, rootMargin: '0px 0px -6% 0px' },
    )

    const observeAll = () =>
      root.querySelectorAll('.reveal:not(.reveal-in)').forEach((n) => io.observe(n))

    observeAll()

    const mo = new MutationObserver(observeAll)
    mo.observe(root, { childList: true, subtree: true })

    const safety = window.setTimeout(showAll, 4000)

    return () => {
      io.disconnect()
      mo.disconnect()
      window.clearTimeout(safety)
    }
  }, [pathname])

  return (
    <div className="relative flex min-h-[100dvh] w-full items-center justify-center sm:p-6">
      <Backdrop />
      <DesktopAside />

      <PhoneFrame darkIndicator={darkIndicator} screenProps={{ id: OVERLAY_ROOT_ID }}>
        {showStatusBar && <StatusBar />}

        <div ref={scrollRef} className="scroll-area relative flex-1 overflow-y-auto overflow-x-hidden">
          {/* A flex column so screens can stretch with `flex-1`. */}
          <div key={pathname} className="flex min-h-full flex-col">
            <Outlet />
          </div>
        </div>

        {showNav && <BottomNav />}
        <ToastHost />
      </PhoneFrame>
    </div>
  )
}

export default AppShell
