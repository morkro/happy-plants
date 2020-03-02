export default function mutationCreator (types = [], fn) {
  return types.reduce((acc, current) => {
    acc[current] = fn
    return acc
  }, {})
}
