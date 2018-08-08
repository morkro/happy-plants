import firebase from 'firebase/app'

export const firebaseConfig = {
  apiKey: 'AIzaSyC3VstKVJc_m_ZvLLLGnxJyAp-8DfuNj-c',
  authDomain: 'happy-plants-172715.firebaseapp.com',
  databaseURL: 'https://happy-plants-172715.firebaseio.com',
  projectId: 'happy-plants-172715',
  storageBucket: 'happy-plants-172715.appspot.com',
  messagingSenderId: '695035316632'
}

export default {
  install (Vue) {
    Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig)
  }
}
