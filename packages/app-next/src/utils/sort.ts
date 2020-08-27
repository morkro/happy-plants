export function sortByDate(a: { created: number }, b: { created: number }): number {
  return new Date(a.created).getTime() - new Date(b.created).getTime()
}

export function sortByAlphabet(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name)
}
