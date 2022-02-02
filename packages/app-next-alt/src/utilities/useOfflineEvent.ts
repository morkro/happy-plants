import { useEffect, useState } from 'react'

export default function useOfflineEvent() {
  const [isOffline, setIsOffline] = useState(window.navigator.onLine === false)

  function offlineEventHandler() {
    setIsOffline(true)
  }

  function onlineEventHandler() {
    setIsOffline(false)
  }

  useEffect(() => {
    window.addEventListener('offline', offlineEventHandler)
    window.addEventListener('online', onlineEventHandler)
    return () => {
      window.removeEventListener('offline', offlineEventHandler)
      window.removeEventListener('online', onlineEventHandler)
    }
  })

  return isOffline
}
