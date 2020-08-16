export function isValidURL(url: string) {
  try {
    new URL(url)
  } catch {
    return false
  }

  return true
}
