import { updateEntry } from './localforage'

const namespace = 'tags'

export const updateTags = data => {
  return updateEntry(namespace, data)
}
