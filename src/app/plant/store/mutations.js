
export default {
  UPDATE_SEASON (state, payload) {
    const index = state.plants.findIndex(p => p.guid === payload.item.guid)
    const item = state.plants[index]

    item.modified = Date.now()
    item.seasons.forEach(season => {
      if (season.month === payload.item.month) {
        season.growth = !season.growth
      }
    })

    state.updated = payload.updated
    state.plants[index] = item
  },

  UPDATE_NOTES (state, payload) {
    const index = state.plants.findIndex(p => p.guid === payload.item.guid)
    state.updated = payload.updated
    state.plants[index].notes = payload.item.notes
  },

  UPDATE_WATERING (state, payload) {
    const index = state.plants.findIndex(p => p.guid === payload.item.guid)
    state.updated = payload.updated
    state.plants[index].watering = payload.item.watering
  }
}
