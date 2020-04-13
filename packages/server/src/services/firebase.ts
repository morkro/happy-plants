import * as admin from 'firebase-admin'
import config from '@/config'

export enum FirestoreCollections {
  Users = 'users',
  Plants = 'plants',
}

export const app: admin.app.App = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: config.firebase.databaseURL,
})

export const firestore: FirebaseFirestore.Firestore = app.firestore()

export function getPlantCollection(userID: string): FirebaseFirestore.CollectionReference {
  return firestore
    .collection(FirestoreCollections.Users)
    .doc(userID)
    .collection(FirestoreCollections.Plants)
}
