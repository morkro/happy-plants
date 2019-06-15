import firebase from 'firebase/app'
import 'firebase/auth'
import { app } from '@/api/firebase'

import { getEntry } from '@/api/localforage'

export function getUser () {
  return firebase.auth(app).currentUser
}

export async function hasUser () {
  const storage = await getEntry('storage')
  if (!storage || !storage.storage) {
    return false
  }

  switch (storage.storage.type) {
    case 'cloud':
      return !!getUser()
    case 'local': {
      const plants = await getEntry('plant-')
      const tags = await getEntry('tags')
      return (
        !!Object.keys(plants).length ||
        !!Object.keys(tags).length
      )
    }
  }
}
