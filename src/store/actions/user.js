import firebase from 'firebase/app'
import 'firebase/auth'

export const signInUser = ({ commit }) => {
  commit('USER_SIGNIN_PROGRESS')
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithRedirect(provider)
}

export const signOutUser = ({ commit }) => {
  commit('USER_SIGNOUT_PROGRESS')
  return firebase.auth().signOut()
    .then(() => commit('USER_SIGNOUT_SUCCESS'))
    .catch(error => commit('USER_SIGNOUT_FAILED', error))
}

export const authRedirectResults = ({ commit, state }) => {
  commit('USER_SIGNIN_PROGRESS')
  firebase.auth().getRedirectResult()
    .then(result => {
      commit('USER_SIGNIN_SUCCESS', result.user)
    })
    .catch(error => {
      if (state.user.authenticated) return
      commit('USER_SIGNIN_FAILED', error)
    })
}

export const authenticateUser = ({ commit, state }) => {
  commit('USER_SIGNIN_PROGRESS')
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(commit('USER_SIGNIN_SUCCESS', { user }))
      } else {
        reject(commit('USER_SIGNIN_FAILED'))
      }
    })
  })
}
