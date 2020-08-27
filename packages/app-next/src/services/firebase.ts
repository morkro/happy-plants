import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '@/config'
import { AssignDetailsPayload } from '@/modules/account/store/mutations'
import { setSessionEntry } from './sessionStorage'
import { Plant, PlantTag } from '@/types/plant'
import { BugReport, FeatureRequest } from '@/types/meta'

export const app = firebase.initializeApp(config.firebase)
export const firestore = app.firestore()
export const storage = firebase.storage()
export default firebase

type FirestoreType = firebase.firestore.Firestore
type FirestoreDocument = firebase.firestore.DocumentReference
type FirestoreCollection = firebase.firestore.CollectionReference

export enum FirestoreCollections {
  Users = 'users',
  Plants = 'plants',
  Tags = 'tags',
  BugReports = 'bugReports',
  FeatureRequests = 'featureRequests',
}

const createAccount = async (
  email: string,
  password: string,
  displayName?: string
): Promise<AssignDetailsPayload> => {
  const results = await firebase.auth().createUserWithEmailAndPassword(email, password)
  const user = results.user
  const idToken = await user.getIdToken()

  if (displayName) {
    await user.updateProfile({ displayName })
  }

  return {
    displayName: results.user.displayName,
    photoURL: results.user.photoURL,
    email: results.user.email,
    idToken,
  }
}

const forgotPassword = (email: string): Promise<void> =>
  firebase.auth().sendPasswordResetEmail(email)

const verifyPasswordResetCode = (code: string): Promise<string> =>
  firebase.auth().verifyPasswordResetCode(code)

const confirmNewPassword = (code: string, password: string): Promise<void> =>
  firebase.auth().confirmPasswordReset(code, password)

const getRedirectResults = async (): Promise<AssignDetailsPayload> => {
  const results = await firebase.auth().getRedirectResult()
  const idToken = await results.user.getIdToken()
  return {
    displayName: results.user.displayName,
    photoURL: results.user.photoURL,
    email: results.user.email,
    uid: results.user.uid,
    idToken,
  }
}

const getUserDoc = (userID: string): FirestoreDocument =>
  firestore.collection(FirestoreCollections.Users).doc(userID)

const getCollection = (userID: string, collection: string): FirestoreCollection =>
  getUserDoc(userID).collection(collection)

const addBugReport = async (guid: string, report: BugReport): Promise<void> =>
  firestore.collection(FirestoreCollections.BugReports).doc(guid).set(report)

const addFeatureRequest = async (guid: string, report: FeatureRequest): Promise<void> =>
  firestore.collection(FirestoreCollections.FeatureRequests).doc(guid).set(report)

const getStoragePath = (userID: string, guid: string): string =>
  `${FirestoreCollections.Users}/${userID}/${FirestoreCollections.Plants}/${guid}/cover.png`

const addPlant = async (userID: string, data: Plant): Promise<void> =>
  getUserDoc(userID).collection(FirestoreCollections.Plants).doc(data.guid).set(data)

const updatePlant = async (userID: string, data: Plant): Promise<void> => {
  const ref = getCollection(userID, FirestoreCollections.Plants).doc(data.guid)
  const snapshot = await ref.get()
  if (snapshot.exists) {
    ref.update(data)
  }
}

const deletePlant = async (userID: string, data: Plant): Promise<void> =>
  getUserDoc(userID).collection(FirestoreCollections.Plants).doc(data.guid).delete()

const setTags = async (userID: string, data: PlantTag[]): Promise<void> =>
  getUserDoc(userID).set({ tags: data })

const signInWithEmail = async (
  email: string,
  password: string
): Promise<firebase.auth.UserCredential> =>
  firebase.auth().signInWithEmailAndPassword(email, password)

const signInWithProvider = async (loginType: string): Promise<void> => {
  setSessionEntry('USER_SIGNIN_PROGRESS', 'true')

  let provider
  switch (loginType) {
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

  firebase.auth().signInWithRedirect(provider)
}

const signOutUser = async (): Promise<void> => firebase.auth().signOut()

const downloadFile = (path: string): Promise<string> => storage.ref().child(path).getDownloadURL()

const uploadFile = (path: string, file: File): firebase.storage.UploadTask =>
  storage.ref().child(path).put(file)

const deleteFile = async (path: string): Promise<void> => storage.ref().child(path).delete()

const updateProfile = async (payload: {
  displayName?: string
  photoURL?: string
}): Promise<void> => {
  const user = firebase.auth().currentUser
  await user.updateProfile(payload)
}

export {
  addBugReport,
  addFeatureRequest,
  addPlant,
  confirmNewPassword,
  createAccount,
  deleteFile,
  deletePlant,
  downloadFile,
  forgotPassword,
  getCollection,
  getRedirectResults,
  getStoragePath,
  getUserDoc,
  setTags,
  signInWithEmail,
  signInWithProvider,
  signOutUser,
  updatePlant,
  updateProfile,
  uploadFile,
  verifyPasswordResetCode,
}
