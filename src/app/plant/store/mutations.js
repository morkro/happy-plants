// https://vuejs.org/v2/guide/list.html#Caveats

export default {
  UPDATE_SEASON (state, payload) {
    const index = state.active.seasons.findIndex(s => s.month === payload.item.month)
    const season = state.active.seasons[index]

    season.growth = !season.growth
    state.active.modified = Date.now()
    state.active.seasons.splice(index, 1, season)
    state.updated = payload.updated
  },

  UPDATE_NOTES (state, payload) {
    state.updated = payload.updated
    state.active.notes = payload.item.notes
  },

  UPDATE_WATERING (state, payload) {
    state.updated = payload.updated
    state.active.watering = payload.item.watering
  }
}
