export const setEntry = (namespace: string, data: string): void => {
  return window.sessionStorage.setItem(namespace, data)
}

export const getEntry = (namespace: string): string => {
  return window.sessionStorage.getItem(namespace)
}

export const deleteEntry = (namespace: string): void => {
  return window.sessionStorage.removeItem(namespace)
}
