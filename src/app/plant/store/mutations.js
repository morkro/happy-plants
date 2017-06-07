export default {
  UPDATE_SEASON (state, payload) {
    const index = state.plants.findIndex(p => p.guid === payload.guid)
    const item = state.plants[index]

    item.modified = Date.now()
    item.seasons.forEach(season => {
      if (season.month === payload.month) {
        season.growth = !season.growth
      }
    })

    state.plants[index] = item
  },

  UPDATE_NOTES (state, payload) {
    const index = state.plants.findIndex(p => p.guid === payload.guid)
    state.plants[index].notes = payload.notes
  }
}
