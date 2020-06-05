// Credits to https://github.com/bevacqua/fuzzysearch/blob/master/index.js
// This is just TypeScript-ified

export default function fuzzySearch(needle: string, haystack: string): boolean {
  const hlen = haystack.length
  const nlen = needle.length

  if (nlen > hlen) return false
  if (nlen === hlen) return needle === haystack

  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needle.charCodeAt(i)
    while (j < hlen) {
      if (haystack.charCodeAt(j++) === nch) {
        continue outer
      }
    }
    return false
  }
  return true
}
