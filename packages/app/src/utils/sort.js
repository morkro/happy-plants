export function sortByDate (a, b) {
  return new Date(a.created) - new Date(b.created)
}

export function sortByAlphabet (a, b) {
  return a.name.localeCompare(b.name)
}
