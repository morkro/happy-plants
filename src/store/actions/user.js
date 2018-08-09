import firebase from 'firebase/app'
import 'firebase/auth'

export const signInUser = ({ commit }) => {
  commit('USER_SIGNIN_PROGRESS')
  const provider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithPopup(provider)
    .then(user => commit('USER_SIGNIN_SUCCESS', user))
    .catch(error => commit('USER_SIGNIN_FAILED', error))
}

export const signOutUser = ({ commit }) => {
  commit('USER_SIGNOUT_PROGRESS')
  return firebase.auth().signOut()
    .then(() => commit('USER_SIGNOUT_SUCCESS'))
    .catch(error => commit('USER_SIGNOUT_FAILED', error))
}

export const authenticateUser = ({ commit, state }) => {
  if (state.storage.type === 'cloud') {
    commit('USER_SIGNIN_PROGRESS')
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        commit('USER_SIGNIN_SUCCESS', { user })
      } else {
        commit('USER_SIGNIN_FAILED')
      }
    })
  }
}