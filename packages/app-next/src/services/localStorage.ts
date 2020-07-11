export const setLocalEntry = (namespace: string, data: string): void => {
  return window.localStorage.setItem(namespace, data)
}

export const getLocalEntry = (namespace: string): string => {
  return window.localStorage.getItem(namespace)
}

export const deleteLocalEntry = (namespace: string): void => {
  return window.localStorage.removeItem(namespace)
}
