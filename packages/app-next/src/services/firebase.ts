import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import config from '@/config'

export const app = firebase.initializeApp(config.firebase)
export const firestore = app.firestore()
export const storage = firebase.storage()
export default firebase

export const downloadFile = (path: string): Promise<string> =>
  storage
    .ref()
    .child(path)
    .getDownloadURL()
