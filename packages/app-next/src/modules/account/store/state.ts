import { UserInfo } from 'firebase'

export interface AccountState extends Partial<UserInfo> {
  authenticated: boolean
  idToken: string
}

const state: AccountState = {
  authenticated: false,
  displayName: null,
  email: null,
  photoURL: null,
  idToken: null,
  uid: null,
}

export default state
