import localforage from 'localforage'

export const getAllEntries = (loadEach = true) => {
  if (loadEach === false) {
    return localforage.keys()
  }

  return localforage.keys()
    .then(keys => Promise.all(keys.map(k => localforage.getItem(k))))
}

export const getEntry = namespace => {
  return localforage.startsWith(namespace)
}

// Without namespace
export const getEntryWN = data => {
  return localforage.getItem(data)
}

export const setEntry = (namespace, data) => {
  return localforage.setItem(namespace, data)
}

export const addEntry = setEntry
export const updateEntry = setEntry

export const deleteEntry = (namespace) => {
  return localforage.removeItem(namespace)
}
