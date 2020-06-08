import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '@/config'
import { AssignDetailsPayload } from '@/modules/user/store/mutations'
import { setSessionEntry } from './sessionStorage'

export const app = firebase.initializeApp(config.firebase)
export const firestore = app.firestore()
export const storage = firebase.storage()
export default firebase

export enum FirestoreCollections {
  Users = 'users',
  Plants = 'plants',
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

function getCollection(userID: string, collection: string): firebase.firestore.CollectionReference {
  return firestore
    .collection(FirestoreCollections.Users)
    .doc(userID)
    .collection(collection)
}

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

export {
  createAccount,
  forgotPassword,
  getRedirectResults,
  getCollection,
  downloadFile,
  signInWithEmail,
  signInWithProvider,
  signOutUser,
}
