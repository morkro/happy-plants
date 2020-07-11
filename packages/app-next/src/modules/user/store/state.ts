import { UserInfo } from 'firebase'

export interface UserState extends Partial<UserInfo> {
  authenticated: boolean
  idToken: string
}

const state: UserState = {
  authenticated: false,
  displayName: null,
  email: null,
  photoURL: null,
  idToken: null,
  uid: null,
}

export default state
