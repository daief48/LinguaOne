import { useCallback, useMemo, useRef, useState } from 'react'
import { AppContext } from './appContext'
import { user as mockUser } from '../data/mock'

/**
 * Single source of truth for the demo. Everything is in-memory —
 * onboarding choices flow through here into the main app screens.
 */
export function AppProvider({ children }) {
  const [languageId, setLanguageId] = useState('en')
  const [goalId, setGoalId] = useState('fluency')
  const [dailyGoal, setDailyGoal] = useState(15)
  const [isPremium, setIsPremium] = useState(false)
  const [savedWords, setSavedWords] = useState(() => new Set())
  const [xp, setXp] = useState(mockUser.xp)
  const [minutesToday, setMinutesToday] = useState(mockUser.minutesToday)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  const showToast = useCallback((message, options = {}) => {
    const id = ++toastId.current
    const toast = {
      id,
      message,
      variant: options.variant || 'default',
      icon: options.icon,
      duration: options.duration ?? 2600,
    }
    setToasts((list) => [...list.slice(-2), toast])
    window.setTimeout(() => {
      setToasts((list) => list.filter((t) => t.id !== id))
    }, toast.duration)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id))
  }, [])

  const addXp = useCallback(
    (amount, message) => {
      setXp((v) => v + amount)
      if (message) showToast(message, { variant: 'xp', duration: 2400 })
    },
    [showToast],
  )

  const toggleSavedWord = useCallback(
    (id, word) => {
      let added = false
      setSavedWords((set) => {
        const next = new Set(set)
        if (next.has(id)) next.delete(id)
        else {
          next.add(id)
          added = true
        }
        return next
      })
      showToast(added ? `“${word}” saved to your list` : `“${word}” removed`, {
        variant: added ? 'success' : 'default',
      })
    },
    [showToast],
  )

  const addMinutes = useCallback((mins) => {
    setMinutesToday((v) => Math.min(v + mins, 60))
  }, [])

  const value = useMemo(
    () => ({
      user: mockUser,
      languageId,
      setLanguageId,
      goalId,
      setGoalId,
      dailyGoal,
      setDailyGoal,
      isPremium,
      setIsPremium,
      savedWords,
      toggleSavedWord,
      xp,
      addXp,
      minutesToday,
      addMinutes,
      toasts,
      showToast,
      dismissToast,
    }),
    [
      languageId,
      goalId,
      dailyGoal,
      isPremium,
      savedWords,
      toggleSavedWord,
      xp,
      addXp,
      minutesToday,
      addMinutes,
      toasts,
      showToast,
      dismissToast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
