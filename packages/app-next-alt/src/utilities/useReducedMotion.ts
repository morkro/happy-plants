import { useState, useRef, useEffect } from 'react'
import { useAppStore } from 'store'

export default function useReducedMotion() {
  const { store } = useAppStore()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    store.userPreferences.animations === 'enabled'
  )
  const { current: mediaQuery } = useRef(window?.matchMedia('(prefers-reduced-motion: reduce)'))

  useEffect(() => {
    const listener = () => {
      setPrefersReducedMotion(!!mediaQuery.matches)
    }
    mediaQuery.addEventListener('change', listener)

    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  }, [mediaQuery])

  return prefersReducedMotion
}
