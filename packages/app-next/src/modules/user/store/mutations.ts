import { UserState } from './state'

export type AssignDetailsPayload = Partial<UserState>

export default {
  assignDetails(state: UserState, payload: AssignDetailsPayload) {
    state.authenticated = true
    state.displayName = payload.displayName
    state.photoURL = payload.photoURL
  },
}
