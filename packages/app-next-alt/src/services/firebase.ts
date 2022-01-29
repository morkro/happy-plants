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
import { getStorage, ref } from 'firebase/storage'
import { collection, doc, DocumentReference, getFirestore, setDoc } from 'firebase/firestore'
import { v4 as uuid } from 'uuid'
import config from 'config'
import { AppState } from 'store'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import logger from 'utilities/logger'
import { Plant, PlantTag } from 'typings/plant'
import { DeviceInfo, getDeviceInfo } from 'utilities/getDeviceInfo'
import { isValidHttpUrl } from 'utilities/isUrl'
import useUserProfile from 'utilities/useUserProfile'
import { setSessionEntry } from './webStorage'

/**
 * Table of contents:
 * 1. Types
 * 2. Authentication
 * 3. Collections
 * 4. Files
 */

let firebaseApp: FirebaseApp

export function initFirebaseApp(options: Record<string, string> = {}) {
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
 * ###################### 1. Types ###############################
 */
export enum FirestoreCollections {
  Users = 'users',
  Plants = 'plants',
  Tags = 'tags',
  BugReports = 'bugReports',
  FeatureRequests = 'featureRequests',
}

export type FirestoreLoginProvider = 'email' | 'google' | 'github' | 'twitter'

export interface FirestoreUserDocument {
  tags: PlantTag[]
}

export interface FirestoreBugReport {
  created: number
  modified: number
  reportedBy: {
    userId: string
    email: string
  }
  description: string
  screenshot?: null | File
  appVersion: string
  deviceInfo: DeviceInfo
}

/**
 * ###################### 2. Authentication ######################
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
 * ###################### 3. Collections ######################
 */
export function useUserDocument() {
  const profile = useUserProfile()
  const db = getFirestore(firebaseApp)
  const ref = doc(
    db,
    FirestoreCollections.Users,
    profile.id
  ) as DocumentReference<FirestoreUserDocument>
  return useDocumentData(ref)
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

export function usePlantDocument(documentId: string) {
  const profile = useUserProfile()
  const db = getFirestore(firebaseApp)
  const ref = doc(
    db,
    FirestoreCollections.Users,
    profile.id,
    FirestoreCollections.Plants,
    documentId
  ) as DocumentReference<Plant>
  return useDocumentData(ref)
}

export async function addBugReport(report: Partial<FirestoreBugReport>) {
  const guid = uuid()
  const now = Date.now()
  const fullReport = {
    ...report,
    deviceInfo: getDeviceInfo(),
    appVersion: config.version,
    created: now,
    modified: now,
  } as FirestoreBugReport
  const db = getFirestore(firebaseApp)
  return setDoc(doc(db, FirestoreCollections.BugReports, guid), fullReport)
}

/**
 * ###################### 4. Files ######################
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
