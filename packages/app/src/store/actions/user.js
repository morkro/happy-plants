import firebase from 'firebase/app'
import 'firebase/auth'
import { setEntry } from '@/api/sessionStorage'

export const signInUser = ({ commit }, providerName) => {
  commit('USER_SIGNIN_PROGRESS')
  setEntry('USER_SIGNIN_PROGRESS', true)

  let provider
  switch (providerName) {
    case 'google':
      provider = new firebase.auth.GoogleAuthProvider()
      break
    case 'github':
      provider = new firebase.auth.GithubAuthProvider()
      break
    case 'twitter':
      provider = new firebase.auth.TwitterAuthProvider()
      break
  }

  return firebase.auth().signInWithRedirect(provider)
}

export const signOutUser = ({ commit }) => {
  commit('USER_SIGNOUT_PROGRESS')
  return firebase.auth().signOut()
    .then(() => commit('USER_SIGNOUT_SUCCESS'))
    .catch(error => commit('USER_SIGNOUT_FAILED', error))
}

export const updateAuthMethod = ({ commit }) => {
  commit('USER_REDIRECT_RESULT')
}

export const authRedirectResults = ({ commit, state }) => {
  commit('USER_REDIRECT_RESULT_PROGRESS')
  return firebase.auth().getRedirectResult()
    .then(result => {
      commit('USER_REDIRECT_RESULT_SUCCESS', result)
    })
    .catch(error => {
      commit('USER_REDIRECT_RESULT_FAILED', error)
    })
}

export const authenticateUser = ({ commit, state }) => {
  commit('USER_AUTH_STATE_PROGRESS')
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        resolve(commit('USER_AUTH_STATE_SUCCESS', { user }))
      } else {
        reject(commit('USER_AUTH_STATE_FAILED'))
      }
    })
  })
}
