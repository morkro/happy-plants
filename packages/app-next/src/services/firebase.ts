import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '@/config'
import { AssignDetailsPayload } from '@/modules/user/store/mutations'
import { setSessionEntry } from './sessionStorage'
import { Plant } from '@/types/plant'

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

  if (!user.emailVerified) {
    await user.sendEmailVerification({
      url: `https://happyplants.garden/onboarding/success?email=${user.email}`,
    })
  }

  return {
    displayName: results.user.displayName,
    photoURL: results.user.photoURL,
    email: results.user.email,
    idToken,
  }
}

const forgotPassword = (email: string) => firebase.auth().sendPasswordResetEmail(email)

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

const getStoragePath = (userID: string, guid: string): string =>
  `${FirestoreCollections.Users}/${userID}/${FirestoreCollections.Plants}/${guid}/cover.png`

const addPlant = async (userID: string, data: Plant): Promise<void> =>
  getUserDoc(userID)
    .collection(FirestoreCollections.Plants)
    .doc(data.guid)
    .set(data)

const signInWithEmail = async (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password)

const signInWithProvider = async (loginType: string) => {
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

const signOutUser = async () => firebase.auth().signOut()

const downloadFile = (path: string): Promise<string> =>
  storage
    .ref()
    .child(path)
    .getDownloadURL()

const uploadFile = (path: string, file: File) =>
  storage
    .ref()
    .child(path)
    .put(file)

const updateProfile = async (payload: { displayName?: string; photoURL?: string }) => {
  const user = firebase.auth().currentUser
  await user.updateProfile(payload)
}

export {
  addPlant,
  createAccount,
  downloadFile,
  forgotPassword,
  getCollection,
  getRedirectResults,
  getStoragePath,
  getUserDoc,
  signInWithEmail,
  signInWithProvider,
  signOutUser,
  updateProfile,
  uploadFile,
}
