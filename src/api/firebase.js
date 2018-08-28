import firebase from 'firebase/app'
import 'firebase/firestore'

export const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'happy-plants-app.firebaseapp.com',
  databaseURL: 'https://happy-plants-app.firebaseio.com',
  projectId: 'happy-plants-app',
  storageBucket: 'happy-plants-app.appspot.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID
}

export const app = firebase.initializeApp(firebaseConfig)
export const firestore = app.firestore()
// export const storage = firebase.storage()

firestore.settings({ timestampsInSnapshots: true })

export function firestoreQuery (commands = []) {
  let query = firestore

  for (const [collection, doc] of commands) {
    if (collection === undefined || collection === null) {
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
