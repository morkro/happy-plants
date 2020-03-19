export default {
  sentry: {
    dsn: process.env.VUE_APP_SENTRY_DSN,
  },
  firebase: {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: 'happy-plants-app.firebaseapp.com',
    databaseURL: 'https://happy-plants-app.firebaseio.com',
    projectId: 'happy-plants-app',
    storageBucket: 'happy-plants-app.appspot.com',
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSENGER_ID,
  },
}
