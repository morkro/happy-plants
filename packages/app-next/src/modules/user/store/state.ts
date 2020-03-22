import { UserInfo } from 'firebase'

export interface UserState extends Partial<UserInfo> {
  authenticated: boolean
}

const state: UserState = {
  authenticated: false,
  displayName: null,
  email: null,
  phoneNumber: null,
  photoURL: null,
}

export default state
