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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import config from 'config'
import { AppState } from 'store'
import { useCollection, useCollectionData, useDocumentData } from 'react-firebase-hooks/firestore'
import logger from 'utilities/logger'
import { Plant, PlantFirestore, PlantTag } from 'typings/plant'
import { DeviceInfo, getDeviceInfo } from 'utilities/getDeviceInfo'
import { isValidHttpUrl } from 'utilities/isUrl'
import useUserProfile from 'utilities/useUserProfile'
import useHomePreferences from 'utilities/useHomePreferences'
import { setSessionEntry } from './webStorage'
import { plantConverter, tagConverter } from './firebaseConverter'

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
/**
 * 3.1 Plants
 */
export function usePlantDocs() {
  const db = getFirestore(firebaseApp)
  const profile = useUserProfile()
  const [orderType, orderDirection] = useHomePreferences()
  const collectionRef = collection(
    db,
    FirestoreCollections.Users,
    profile.id,
    FirestoreCollections.Plants
  ).withConverter(plantConverter)
  const filter = orderBy(orderType, orderDirection)
  return useCollectionData(query(collectionRef, filter))
}

export function usePlantCount() {
  const db = getFirestore(firebaseApp)
  const profile = useUserProfile()
  const collectionRef = collection(
    db,
    FirestoreCollections.Users,
    profile.id,
    FirestoreCollections.Plants
  )
  const [data, loading, error] = useCollection(collectionRef)
  return [data?.size, loading, error]
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
  ).withConverter(plantConverter)
  return useDocumentData(ref)
}

export function addPlant(userId: string, plantData: Partial<PlantFirestore>) {
  const db = getFirestore(firebaseApp)
  const plant = {
    ...plantData,
    created: Date.now(),
  }
  const collectionRef = collection(
    db,
    FirestoreCollections.Users,
    userId,
    FirestoreCollections.Plants
  )
  return addDoc(collectionRef, plant)
}

export async function updatePlant(userId: string, plantData: Partial<Plant>) {
  const { id, ...data } = plantData
  if (typeof id !== 'string') return
  const db = getFirestore(firebaseApp)
  const ref = doc(db, FirestoreCollections.Users, userId, FirestoreCollections.Plants, id)
  return updateDoc(ref, data)
}

/**
 * 3.2 Tags
 */
export function usePlantTags() {
  const db = getFirestore(firebaseApp)
  const profile = useUserProfile()
  const ref = collection(
    db,
    FirestoreCollections.Users,
    profile.id,
    FirestoreCollections.Tags
  ).withConverter(tagConverter)
  return useCollectionData(ref)
}

export function getTagRef(userId: string, tagId: string) {
  const db = getFirestore(firebaseApp)
  return doc(
    db,
    FirestoreCollections.Users,
    userId,
    FirestoreCollections.Tags,
    tagId
  ).withConverter(tagConverter)
}

export async function getTagDocs(tagRefs: DocumentReference<PlantTag>[] = []) {
  if (tagRefs.length === 0) {
    return []
  }
  return Promise.all(
    tagRefs.map(async (ref) => {
      const tag = await getDoc<PlantTag>(ref)
      return tag.data() as PlantTag
    })
  )
}

export async function addPlantTag(userId: string, tag: Partial<PlantTag>) {
  const db = getFirestore(firebaseApp)
  const collectionRef = collection(
    db,
    FirestoreCollections.Users,
    userId,
    FirestoreCollections.Tags
  ).withConverter(tagConverter)
  const data: Partial<PlantTag> = {
    value: tag.value,
    label: tag.label,
    created: Date.now(),
  }
  return addDoc(collectionRef, data)
}

export async function updatePlantTag(userId: string, tag: PlantTag) {
  const db = getFirestore(firebaseApp)
  const documentRef = doc(
    db,
    FirestoreCollections.Users,
    userId,
    FirestoreCollections.Tags,
    tag.id
  ).withConverter(tagConverter)
  return updateDoc(documentRef, {
    label: tag.label,
    value: tag.value,
    modified: Timestamp.fromMillis(Date.now()),
  })
}

export async function deletePlantTag(userId: string, tagId: string) {
  const db = getFirestore(firebaseApp)
  const documentRef = doc(db, FirestoreCollections.Users, userId, FirestoreCollections.Tags, tagId)
  return deleteDoc(documentRef)
}

export async function queryTagsFromPlants(userId: string, tagId: string) {
  const db = getFirestore(firebaseApp)
  const tagRef = doc(db, FirestoreCollections.Users, userId, FirestoreCollections.Tags, tagId)
  const collectionRef = collection(
    db,
    FirestoreCollections.Users,
    userId,
    FirestoreCollections.Plants
  ).withConverter(plantConverter)
  const q = query(collectionRef, where('tags', 'array-contains', tagRef))
  return getDocs(q)
}

/**
 * 3.3 Bug reports
 */
export async function addBugReport(report: Partial<FirestoreBugReport>) {
  const now = Date.now()
  const fullReport = {
    ...report,
    deviceInfo: getDeviceInfo(),
    appVersion: config.version,
    created: now,
    modified: now,
  } as FirestoreBugReport
  const db = getFirestore(firebaseApp)
  return addDoc(collection(db, FirestoreCollections.BugReports), fullReport)
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
