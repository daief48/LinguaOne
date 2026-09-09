import { NavLink, useLocation } from 'react-router-dom'
import { BarChart3, BookOpen, Home, Mic, User } from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/practice', label: 'Practice', icon: Mic },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  const { pathname } = useLocation()
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((i) => i.to === pathname),
  )

  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-3 pb-3 safe-bottom sm:pb-6">
      {/* content dissolves into the nav instead of running under it */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/85 to-transparent"
        aria-hidden="true"
      />
      <div className="pointer-events-auto relative mx-auto flex max-w-[400px] items-stretch rounded-[26px] border border-white/70 bg-white/80 p-1.5 shadow-nav backdrop-blur-2xl">
        {/* sliding highlight behind the active tab */}
        <span
          className="pointer-events-none absolute bottom-1.5 top-1.5 w-[20%] px-1 transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)]"
          style={{ transform: `translateX(${activeIndex * 100}%)` }}
          aria-hidden="true"
        >
          <span className="block h-full w-full rounded-[20px] bg-gradient-to-b from-violet-50 to-white/0" />
        </span>

        {NAV_ITEMS.map(({ to, label, icon: IconCmp }) => (
          <NavLink
            key={to}
            to={to}
            className="press focus-ring group relative flex flex-1 flex-col items-center gap-1 rounded-[20px] py-1.5"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`relative grid h-9 w-9 place-items-center rounded-xl2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white shadow-glow animate-tab-pop'
                      : 'text-ink-400 group-hover:bg-ink-100 group-hover:text-ink-700'
                  }`}
                >
                  <IconCmp size={18} strokeWidth={isActive ? 2.4 : 2.1} />
                  {isActive && (
                    <span className="absolute inset-0 animate-glow-pulse rounded-xl2 bg-gradient-to-br from-violet-500 to-blue-500 opacity-40 blur-md" />
                  )}
                </span>
                <span
                  className={`text-[10px] font-bold leading-none transition-colors duration-300 ${
                    isActive ? 'text-violet-600' : 'text-ink-400'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default BottomNav
