import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { useAppStore } from 'store'
import { initFirebaseApp } from 'services/firebase'
import Splash from 'pages/Splash'

type FirebaseAuthProviderProps = React.PropsWithChildren<{ config: Record<string, string> }>

export function FirebaseAuthProvider(props: FirebaseAuthProviderProps) {
  initFirebaseApp(props.config)
  const { setStore } = useAppStore()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setStore({
        initializing: false,
        user,
        isSignedIn: user !== null,
      })
      setLoading(false)
    })

    return () => {
      unsubscribe?.()
    }
  }, [setStore])

  return isLoading ? <Splash /> : <React.Fragment>{props.children}</React.Fragment>
}
