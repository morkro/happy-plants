import { app as firestoreApp } from '@/api/firebase'
import { getEntry } from '@/api/localforage'

export function getUser () {
  return firestoreApp.auth().currentUser
}

export async function hasUser () {
  const storage = await getEntry('storage')
  if (!storage) return

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
