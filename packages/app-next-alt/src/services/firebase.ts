import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from 'config'
import { AppState } from 'store'
import { FirestoreLoginProvider } from 'typings/firebase'
import logger from 'utilities/logger'
import { setSessionEntry } from './sessionStorage'

export function initFirebaseApp(options: Record<string, string> = {}): void {
  try {
    firebase.initializeApp(options)
  } catch (error) {
    if (error.code !== 'app/duplicate-app') {
      logger(`Failed to initialize Firebase with error ${error.message}`, true)
    }
  }
}

export async function signInUser(payload: {
  provider: FirestoreLoginProvider
  email: string
  password: string
}): Promise<void> {
  if (payload.provider === 'email') {
    await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  } else {
    // We are setting this property to later on check for it when the user returns to the app.
    setSessionEntry(config.session.signInProgress, 'true')

    let provider
    switch (payload.provider) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider()
        break
      case 'github':
        provider = new firebase.auth.GithubAuthProvider()
        break
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider()
        break
    }

    await firebase.auth().signInWithRedirect(provider)
  }
}

export async function forgotPassword(email: string): Promise<void> {
  return firebase.auth().sendPasswordResetEmail(email)
}

export async function getAuthRedirectResults(): Promise<Partial<AppState>> {
  const results = await firebase.auth().getRedirectResult()
  return {
    user: results?.user,
    isSignedIn: true,
  }
}

export async function signOutUser() {
  return firebase.auth().signOut()
}
