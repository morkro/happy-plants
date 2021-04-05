import firebase from 'firebase/app'

export type FirebaseApp = firebase.app.App
export type FirebaseUser = firebase.User
export type FirestoreType = firebase.firestore.Firestore
export type FirestoreDocument = firebase.firestore.DocumentReference
export type FirestoreCollection = firebase.firestore.CollectionReference

export enum FirestoreCollections {
  Users = 'users',
  Plants = 'plants',
  Tags = 'tags',
  BugReports = 'bugReports',
  FeatureRequests = 'featureRequests',
}

export type FirestoreLoginProvider = 'email' | 'google' | 'github' | 'twitter'
