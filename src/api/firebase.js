import firebase from 'firebase/app'
import 'firebase/firestore'

export const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'happy-plants-172715.firebaseapp.com',
  databaseURL: 'https://happy-plants-172715.firebaseio.com',
  projectId: 'happy-plants-172715',
  storageBucket: 'happy-plants-172715.appspot.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID
}

export const app = firebase.initializeApp(firebaseConfig)
export const db = app.firestore()

db.settings({ timestampsInSnapshots: true })
console.log(db)

export function firestoreQuery (commands = []) {
  let query = db

  for (const [collection, doc] of commands) {
    if (collection === undefined) {
      query = query.doc(doc)
    } else if (doc === undefined) {
      query = query.collection(collection)
    } else {
      query = query.collection(collection).doc(doc)
    }
  }

  return query
}

export const getEntry = (commands = []) => {
  return firestoreQuery(commands)
    .get()
}

export const addEntry = (commands = [], data) => {
  return firestoreQuery(commands)
    .set(data)
}

export const updateEntry = (commands = [], data) => {
  const ref = firestoreQuery(commands)
  return ref.get().then(doc => {
    if (doc.exists) {
      ref.set({ data }, { merge: true })
    } else {
      ref.add(data)
    }
  })
}

export const deleteEntry = (commands = []) => {
  return firestoreQuery(commands)
    .delete()
}
