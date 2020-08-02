import { Commit, Dispatch } from 'vuex'
import {
  createAccount as _createAccount,
  getRedirectResults,
  signInWithEmail,
  signInWithProvider,
  signOutUser as _signOutUser,
  updateProfile as _updateProfile,
} from '@/services/firebase'
import logger from '@/utils/vueLogger'
import { RootState } from '@/store'
import { deleteLocalEntry } from '@/services/localStorage'
import config from '@/config'

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
  if (context.rootState.account.authenticated) return
  try {
    const results = await getRedirectResults()
    context.commit('assignDetails', results)
  } catch (error) {
    logger(`authRedirectResults() => ${error.message}`, true)
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
    deleteLocalEntry(config.localStorage.plantCount)
    context.commit('resetState')
  } catch (error) {
    logger(`signOutUser() => ${error.message}`, true)
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

const updateProfile = async (
  context: { commit: Commit },
  payload: { displayName?: string; photoURL?: string }
) => {
  await _updateProfile(payload)
  context.commit('updateProfile', payload)
}

export { authRedirectResults, createAccount, signInUser, signOutUser, updateProfile }
