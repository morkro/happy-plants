import { useEffect, useState } from 'react'

export default function useMediaQuery(query: string) {
  const mediaQuery = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaQuery.matches)
  const listener = (event: MediaQueryListEvent) => setMatches(event.matches)

  useEffect(() => {
    mediaQuery.addEventListener('change', listener)
    return () => {
      mediaQuery.removeEventListener('change', listener)
    }
  })

  return matches
}
