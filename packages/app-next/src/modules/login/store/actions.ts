import firebase from 'firebase/app'
import 'firebase/auth'
import { ActionContext } from 'vuex'
import { setSessionEntry } from '@/services/sessionStorage'
import { RootState } from '@/store'

type ProviderName = 'google' | 'github' | 'twitter'

export const signInUser = (
  context: ActionContext<{}, RootState>,
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
