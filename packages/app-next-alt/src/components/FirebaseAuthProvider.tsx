import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useAppStore } from 'store'
import { initFirebaseApp } from 'services/firebase'
import Splash from 'pages/Splash'

type FirebaseAuthProviderProps = React.PropsWithChildren<{ config: Record<string, string> }>

export function FirebaseAuthProvider(props: FirebaseAuthProviderProps) {
  const firebaseApp = initFirebaseApp(props.config)
  const { setStore } = useAppStore()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(firebaseApp), async (user) => {
      setStore({
        user,
        isSignedIn: user !== null,
      })
      setLoading(false)
    })

    return () => {
      unsubscribe?.()
    }
  }, [])

  return isLoading ? <Splash /> : <React.Fragment>{props.children}</React.Fragment>
}
