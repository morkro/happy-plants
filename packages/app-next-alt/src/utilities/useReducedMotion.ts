import { useState, useRef, useEffect } from 'react'

export default function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
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
