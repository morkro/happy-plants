import { FirebaseApp, initializeApp } from 'firebase/app'
import {
  getAuth,
  getRedirectResult,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  TwitterAuthProvider,
} from 'firebase/auth'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { collection, doc, DocumentReference, getFirestore, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import config from 'config'
import { AppState } from 'store'
import {
  FirestoreCollections,
  FirestoreLoginProvider,
  FirestoreUserDocument,
} from 'typings/firebase'
import logger from 'utilities/logger'
import { BugReport } from 'typings/bugReport'
import { Plant } from 'typings/plant'
import { getDeviceInfo } from 'utilities/getDeviceInfo'
import { isValidHttpUrl } from 'utilities/isUrl'
import { setSessionEntry } from './sessionStorage'

/**
 * Table of contents:
 * 1. Authentication
 * 2. Collections
 * 3. Files
 */

// const downloadURLWorker = new DownloadURLWorker()
let firebaseApp: FirebaseApp

export function initFirebaseApp(options: Record<string, string> = {}): FirebaseApp {
  try {
    firebaseApp = initializeApp(options)
  } catch (error: any) {
    if (error.code !== 'app/duplicate-app') {
      logger(`Failed to initialize Firebase with error ${error.message}`, true)
    }
  }
  return firebaseApp
}

/**
 * ###################### 1. Authentication ######################
 */
export async function signInUser(payload: {
  provider: FirestoreLoginProvider
  email: string
  password: string
}): Promise<void> {
  const auth = getAuth(firebaseApp)
  if (payload.provider === 'email') {
    await signInWithEmailAndPassword(auth, payload.email, payload.password)
  } else {
    // We are setting this property to later on check for it when the user returns to the app.
    setSessionEntry(config.localStorage.userAuthProgress, 'true')

    let provider
    switch (payload.provider) {
      case 'google':
        provider = new GoogleAuthProvider()
        break
      case 'github':
        provider = new GithubAuthProvider()
        break
      case 'twitter':
        provider = new TwitterAuthProvider()
        break
    }

    await signInWithRedirect(auth, provider)
  }
}

export async function forgotPassword(email: string): Promise<void> {
  return sendPasswordResetEmail(getAuth(firebaseApp), email)
}

export async function getAuthRedirectResults(): Promise<Partial<AppState>> {
  const results = await getRedirectResult(getAuth(firebaseApp))
  return {
    user: results?.user,
    isSignedIn: true,
  }
}

export async function signOutUser() {
  return signOut(getAuth(firebaseApp))
}

/**
 * ###################### 2. Collections ######################
 */
export function getUserDoc(userId: string) {
  const db = getFirestore(firebaseApp)
  const ref = doc(db, FirestoreCollections.Users, userId)
  return ref as DocumentReference<FirestoreUserDocument>
}

export function getCollection(userId: string, collectionName: string) {
  const db = getFirestore(firebaseApp)
  return collection(db, FirestoreCollections.Users, userId, collectionName)
}

export function getPlantDoc(userId: string, documentId: string) {
  const db = getFirestore(firebaseApp)
  const ref = doc(db, FirestoreCollections.Users, userId, FirestoreCollections.Plants, documentId)
  return ref as DocumentReference<Plant>
}

export async function addBugReport(report: Partial<BugReport>) {
  const guid = uuid()
  const now = Date.now()
  const fullReport = {
    ...report,
    deviceInfo: getDeviceInfo(),
    appVersion: config.version,
    created: now,
    modified: now,
  } as BugReport
  const db = getFirestore(firebaseApp)
  return setDoc(doc(db, FirestoreCollections.BugReports, guid), fullReport)
}

/**
 * ###################### 2. Files ######################
 */
export function getFileRef(path?: string) {
  const storage = getStorage(firebaseApp)
  if (path && isValidHttpUrl(path)) {
    return ref(storage, path)
  }
  const _ref = ref(storage, path)
  if (_ref.fullPath === '') {
    return
  }
  return _ref
}
