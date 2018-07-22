import { setEntry } from './localforage'

const namespace = 'updated'

export const updateStoreTimestamp = (data = {}) => {
  return setEntry(namespace, Date.now())
    .then(updated => ({ data, updated }))
}
