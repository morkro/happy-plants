import { FirebaseError } from 'firebase'
import store from '@/store'

export interface FormErrorObject {
  el: string | null
  message: string | null
}

/**
 * Returns an error object for handling forms.
 * Its default switch case has a side-effect:
 * dispatch the error via Vuex to global notification component
 */
export default function setErrorMessage(error: FirebaseError): FormErrorObject {
  const _error: FormErrorObject = { el: null, message: null }
  console.log(error)

  switch (error.code) {
    case 'auth/email-already-in-use':
    case 'auth/invalid-email':
    case 'auth/user-not-found':
      _error.el = 'email'
      _error.message = error.message
      break
    case 'auth/weak-password':
      _error.el = 'password'
      _error.message = error.message
      break
    case 'auth/wrong-password':
      _error.el = 'password'
      _error.message = 'Your password seems wrong. Please re-check.'
      break
    default:
      store.dispatch('notifications/show', {
        type: 'alert',
        error: error.message,
      })
  }

  return _error
}
