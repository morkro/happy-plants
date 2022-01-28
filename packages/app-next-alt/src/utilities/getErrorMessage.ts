import { FirebaseError } from 'firebase/app'

export interface FormErrorObject {
  type: 'email' | 'password' | 'unknown'
  message: string
}

/**
 * Returns an error object for handling forms.
 * Its default switch case has a side-effect:
 * dispatch the error via Vuex to global notification component
 */
export default function getErrorMessage(error: FirebaseError): FormErrorObject {
  const _error: FormErrorObject = {
    type: 'unknown',
    message: 'Something went wrong, please try again.',
  }

  switch (error.code) {
    case 'auth/email-already-in-use':
    case 'auth/invalid-email':
    case 'auth/user-not-found':
      _error.type = 'email'
      _error.message = error.message
      break
    case 'auth/weak-password':
      _error.type = 'password'
      _error.message = error.message
      break
    case 'auth/wrong-password':
      _error.type = 'password'
      _error.message = 'Your password seems wrong. Please re-check.'
      break
  }

  return _error
}
