import { AccountState } from './state'

export type AssignDetailsPayload = Partial<AccountState>

export default {
  assignDetails(state: AccountState, payload: AssignDetailsPayload) {
    state.authenticated = true
    state.displayName = payload.displayName
    state.photoURL = payload.photoURL
    state.email = payload.email
    state.idToken = payload.idToken
    state.uid = payload.uid
  },
  updateProfile(state: AccountState, payload: { displayName?: string; photoURL?: string }) {
    state.displayName = payload.displayName
    state.photoURL = payload.photoURL
  },
  resetState(state: AccountState) {
    state.authenticated = false
    state.displayName = null
    state.email = null
    state.photoURL = null
    state.idToken = null
  },
}
