import firebase from 'firebase/app'

export const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: 'happy-plants-172715.firebaseapp.com',
  databaseURL: 'https://happy-plants-172715.firebaseio.com',
  projectId: 'happy-plants-172715',
  storageBucket: 'happy-plants-172715.appspot.com',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID
}

export default {
  install (Vue) {
    Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig)
  }
}
