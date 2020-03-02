export default function isEmptyObject (entry) {
  return (
    Object.keys(entry).length === 0 &&
    entry.constructor === Object
  )
}
