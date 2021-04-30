export function isValidHttpUrl(text: string) {
  let url

  try {
    url = new URL(text)
  } catch {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}
