import firebase from 'firebase/app'
import 'firebase/auth'
import { ActionContext } from 'vuex'
import { LoginState } from './state'
import { setEntry } from '@/services/sessionStorage'

export const signInUser = (
  context: ActionContext<LoginState, {}>,
  provider: firebase.auth.AuthProvider
): Promise<void> => {
  setEntry('USER_SIGNIN_PROGRESS', 'true')
  return firebase.auth().signInWithRedirect(provider)
}
