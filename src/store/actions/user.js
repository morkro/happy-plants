import firebase from 'firebase/app'
import 'firebase/auth'

export const signInUser = ({ commit }) => {
  commit('USER_SIGNIN_PROGRESS')
  const provider = new firebase.auth.GoogleAuthProvider()

  return firebase.auth().signInWithPopup(provider)
    .then(user => commit('USER_SIGNIN_SUCCESS', user))
    .catch(error => commit('USER_SIGNIN_FAILED', error))
}
