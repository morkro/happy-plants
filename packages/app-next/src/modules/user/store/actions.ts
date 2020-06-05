import { Commit, Dispatch } from 'vuex'
import {
  createAccount as _createAccount,
  getRedirectResults,
  signInWithEmail,
  signInWithProvider,
  signOutUser as _signOutUser,
} from '@/services/firebase'
import logger from '@/utils/vueLogger'
import { RootState } from '@/store'
import { deleteLocalEntry } from '@/services/localStorage'

export type LoginType = 'email' | 'google' | 'github' | 'twitter'

const createAccount = async (
  context: { commit: Commit },
  { email, password, displayName }: { email: string; password: string; displayName?: string }
): Promise<void> => {
  const results = await _createAccount(email, password, displayName)
  context.commit('assignDetails', results)
}

const signInUser = async (
  context: { dispatch: Dispatch },
  payload: { type: LoginType; email: string; password: string }
): Promise<void> => {
  if (payload.type === 'email') {
    await signInWithEmail(payload.email, payload.password)
  } else {
    signInWithProvider(payload.type)
  }
}

const authRedirectResults = async (context: {
  commit: Commit
  dispatch: Dispatch
  rootState: RootState
}): Promise<void> => {
  if (context.rootState.user.authenticated) return
  try {
    const results = await getRedirectResults()
    context.commit('assignDetails', results)
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

const signOutUser = async (context: { commit: Commit; dispatch: Dispatch }) => {
  try {
    await _signOutUser()
    deleteLocalEntry('data-plant-count')
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

export { authRedirectResults, createAccount, signInUser, signOutUser }
