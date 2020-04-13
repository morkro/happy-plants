import firebase from 'firebase/app'
import 'firebase/auth'
import { Commit, Dispatch } from 'vuex'
import { setSessionEntry } from '@/services/sessionStorage'
import { AssignDetailsPayload } from '@/modules/user/store/mutations'
import logger from '@/utils/vueLogger'

type ProviderName = 'google' | 'github' | 'twitter'

export const signInUser = (
  context: { commit: Commit },
  providerName: ProviderName
): Promise<void> => {
  setSessionEntry('USER_SIGNIN_PROGRESS', 'true')

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

export const authRedirectResults = async (context: {
  commit: Commit
  dispatch: Dispatch
}): Promise<void> => {
  try {
    const results = await firebase.auth().getRedirectResult()
    const idToken = await results.user.getIdToken()
    const details: AssignDetailsPayload = {
      displayName: results.user.displayName,
      photoURL: results.user.photoURL,
      email: results.user.email,
      idToken,
    }
    context.commit('user/assignDetails', details, { root: true })
  } catch (error) {
    logger(error.message, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'error',
        message: 'There was an issue logging you in, please try again.',
      },
      { root: true }
    )
  }
}
