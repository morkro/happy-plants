import firebase from 'firebase/app'
import 'firebase/auth'
import { Commit, Dispatch } from 'vuex'
import { setSessionEntry } from '@/services/sessionStorage'
import { AssignDetailsPayload } from '@/modules/user/store/mutations'
import logger from '@/utils/vueLogger'
import { RootState } from '@/store'

export type LoginType = 'email' | 'google' | 'github' | 'twitter'

export const createAccount = async (
  context: { commit: Commit },
  { email, password }: { email: string; password: string }
): Promise<void> => {
  const results = await firebase.auth().createUserWithEmailAndPassword(email, password)
  const idToken = await results.user.getIdToken()
  const details: AssignDetailsPayload = {
    displayName: results.user.displayName,
    photoURL: results.user.photoURL,
    email: results.user.email,
    idToken,
  }
  context.commit('assignDetails', details)
}

const _signInWithProvider = (loginType: LoginType): void => {
  setSessionEntry('USER_SIGNIN_PROGRESS', 'true')

  let provider
  switch (loginType) {
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

  firebase.auth().signInWithRedirect(provider)
}

export const signInUser = async (
  context: { dispatch: Dispatch },
  payload: { type: LoginType; email: string; password: string }
): Promise<void> => {
  if (payload.type === 'email') {
    await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
  } else {
    _signInWithProvider(payload.type)
  }
}

export const authRedirectResults = async (context: {
  commit: Commit
  dispatch: Dispatch
  rootState: RootState
}): Promise<void> => {
  if (context.rootState.user.authenticated) return
  try {
    const results = await firebase.auth().getRedirectResult()
    const idToken = await results.user.getIdToken()
    const details: AssignDetailsPayload = {
      displayName: results.user.displayName,
      photoURL: results.user.photoURL,
      email: results.user.email,
      idToken,
    }
    context.commit('assignDetails', details)
  } catch (error) {
    logger(error.message, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'There was an issue logging you in, please try again.',
      },
      { root: true }
    )
  }
}

export const signOutUser = async (context: { commit: Commit; dispatch: Dispatch }) => {
  try {
    await firebase.auth().signOut()
    context.commit('resetState')
  } catch (error) {
    logger(error.message, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'There was an issue logging you out, please refresh.',
      },
      { root: true }
    )
  }
}
