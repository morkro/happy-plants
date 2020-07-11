export const setSessionEntry = (namespace: string, data: string): void => {
  return window.sessionStorage.setItem(namespace, data)
}

export const getSessionEntry = (namespace: string): string => {
  return window.sessionStorage.getItem(namespace)
}

export const deleteSessionEntry = (namespace: string): void => {
  return window.sessionStorage.removeItem(namespace)
}
