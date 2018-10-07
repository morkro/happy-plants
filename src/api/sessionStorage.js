export const setEntry = (namespace, data) => {
  return window.sessionStorage.setItem(namespace, data)
}

export const getEntry = namespace => {
  return window.sessionStorage.getItem(namespace)
}

export const deleteEntry = namespace => {
  return window.sessionStorage.removeItem(namespace)
}
