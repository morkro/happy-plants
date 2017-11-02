function mergeObectArray (arr1 = [], arr2 = []) {
  const hash = new Map()

  arr1.concat(arr2).forEach(object =>
    hash.set(object.guid,
      Object.assign(hash.get(object.guid) || {}, object)))

  return Array
    .from(hash.values())
    .filter(values => Object.keys(values).length)
}

export default {
  DELETE_ALL_PLANTS (state, payload) {
    state.updated = payload.updated
    state.plants = []
  },

  IMPORT_PLANT_DATA (state, payload) {
    const data = Array.isArray(payload.data) ? payload.data : [payload.data]
    state.updated = payload.updated

    switch (payload.importType) {
      case 'overwrite':
        state.plants = data.filter(values => Object.keys(values).length)
        break
      case 'merge':
      default:
        state.plants = mergeObectArray(state.plants, data)
        break
    }
  }
}
