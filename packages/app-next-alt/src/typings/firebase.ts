import firebase from 'firebase/app'
import { PlantTag } from './plant'

export type FirebaseApp = firebase.app.App
export type FirebaseUser = firebase.User
export type FirestoreType = firebase.firestore.Firestore
export type FirestoreDocument = firebase.firestore.DocumentReference
export type FirestoreDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>
export type FirestoreCollection = firebase.firestore.CollectionReference
export type FirestoreOrderByDirection = firebase.firestore.OrderByDirection
export type StorageReference = firebase.storage.Reference

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
