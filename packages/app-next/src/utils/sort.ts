export function sortByDate(a: { created: number }, b: { created: number }) {
  return new Date(a.created).getTime() - new Date(b.created).getTime()
}

export function sortByAlphabet(a: { name: string }, b: { name: string }) {
  return a.name.localeCompare(b.name)
}
