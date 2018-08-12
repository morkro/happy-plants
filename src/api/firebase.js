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

function getDoc ({ base = 'users', userId, folder, fileName }) {
  return db.collection(base)
    .doc(userId)
    .collection(folder)
    .doc(fileName)
}

export const addEntry = ({ base = 'users', userId, folder, fileName, data }) => {
  return getDoc({ base, userId, folder, fileName })
    .set(data)
}

export const updateEntry = ({ base = 'users', userId, folder, fileName, data }) => {
  const ref = getDoc({ base, userId, folder, fileName })
  return ref.get().then(doc => {
    if (doc.exists) {
      ref.set({ ...doc.data(), ...data })
    } else {
      ref.set(data)
    }
  })
}

export const deleteEntry = ({ base = 'users', userId, folder, fileName }) => {
  return getDoc({ base, userId, folder, fileName })
    .delete()
}
