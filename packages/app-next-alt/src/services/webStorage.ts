export const setLocalEntry = (namespace: string, data: string) => {
  return window.localStorage.setItem(namespace, data)
}

export const getLocalEntry = (namespace: string) => {
  return window.localStorage.getItem(namespace)
}

export const deleteLocalEntry = (namespace: string) => {
  return window.localStorage.removeItem(namespace)
}

export const setSessionEntry = (namespace: string, data: string) => {
  return window.sessionStorage.setItem(namespace, data)
}

export const getSessionEntry = (namespace: string) => {
  return window.sessionStorage.getItem(namespace)
}

export const deleteSessionEntry = (namespace: string) => {
  return window.sessionStorage.removeItem(namespace)
}
