export const setSessionEntry = (namespace: string, data: string) => {
  return window.sessionStorage.setItem(namespace, data)
}

export const getSessionEntry = (namespace: string) => {
  return window.sessionStorage.getItem(namespace)
}

export const deleteSessionEntry = (namespace: string) => {
  return window.sessionStorage.removeItem(namespace)
}
