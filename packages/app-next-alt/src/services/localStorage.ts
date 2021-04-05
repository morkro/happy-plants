export const setLocalEntry = (namespace: string, data: string) => {
  return window.localStorage.setItem(namespace, data)
}

export const getLocalEntry = (namespace: string) => {
  return window.localStorage.getItem(namespace)
}

export const deleteLocalEntry = (namespace: string) => {
  return window.localStorage.removeItem(namespace)
}
