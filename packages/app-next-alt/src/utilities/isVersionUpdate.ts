/**
 * @see https://stackoverflow.com/a/65687141/1724106
 */
export default function isVersionUpdate(newV: string, currentV: string) {
  const result = newV.localeCompare(currentV, undefined, { numeric: true, sensitivity: 'base' })
  if (result === 1) return true
  else if (result === -1) return false
  return null
}
