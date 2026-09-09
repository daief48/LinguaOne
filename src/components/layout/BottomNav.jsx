import { NavLink } from 'react-router-dom'
import { BarChart3, BookOpen, Home, Mic, User } from 'lucide-react'

export const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/learn', label: 'Learn', icon: BookOpen },
  { to: '/practice', label: 'Practice', icon: Mic },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
  { to: '/profile', label: 'Profile', icon: User },
]

export function BottomNav() {
  return (
    <nav className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-3 pb-3 safe-bottom">
      <div className="pointer-events-auto mx-auto flex max-w-[400px] items-stretch gap-0.5 rounded-[26px] border border-white/70 bg-white/85 p-1.5 shadow-nav backdrop-blur-2xl">
        {NAV_ITEMS.map(({ to, label, icon: IconCmp }) => (
          <NavLink
            key={to}
            to={to}
            className="press focus-ring group flex flex-1 flex-col items-center gap-1 rounded-[20px] py-1.5"
          >
            {({ isActive }) => (
              <>
                <span
                  className={`grid h-9 w-9 place-items-center rounded-xl2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white shadow-glow'
                      : 'text-ink-400 group-hover:bg-ink-100 group-hover:text-ink-700'
                  }`}
                >
                  <IconCmp size={18} strokeWidth={isActive ? 2.4 : 2.1} />
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
