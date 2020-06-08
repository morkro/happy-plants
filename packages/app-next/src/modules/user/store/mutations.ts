import { UserState } from './state'

export type AssignDetailsPayload = Partial<UserState>

export default {
  assignDetails(state: UserState, payload: AssignDetailsPayload) {
    state.authenticated = true
    state.displayName = payload.displayName
    state.photoURL = payload.photoURL
    state.email = payload.email
    state.idToken = payload.idToken
    state.uid = payload.uid
  },
  resetState(state: UserState) {
    state.authenticated = false
    state.displayName = null
    state.email = null
    state.photoURL = null
    state.idToken = null
  },
}
