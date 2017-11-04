// https://vuejs.org/v2/guide/list.html#Caveats

export default {
  UPDATE_SEASON (state, payload) {
    const index = state.selected.seasons.findIndex(s => s.month === payload.item.month)
    const season = state.selected.seasons[index]
    season.growth = !season.growth

    state.selected.modified = payload.updated
    state.selected.seasons.splice(index, 1, season)
    state.updated = payload.updated
  },

  UPDATE_NOTES (state, payload) {
    state.updated = payload.updated
    state.selected.modified = payload.updated
    state.selected.notes = payload.item.notes
  },

  UPDATE_WATERING (state, payload) {
    state.updated = payload.updated
    state.selected.modified = payload.updated
    state.selected.watering.level = payload.item.watering.level
  },

  UPDATE_SUNSHINE (state, payload) {
    // The data structure has changed.
    // If a plant still has old data, it will fail to update.
    if (!state.selected.sunshine) {
      state.selected.sunshine = { intensity: 1 }
    }

    state.updated = payload.updated
    state.selected.modified = payload.updated
    state.selected.sunshine.intensity = payload.item.sunshine.level
  },

  UPDATE_NAME (state, payload) {
    state.updated = payload.updated
    state.selected.modified = payload.updated
    state.selected.name = payload.item.name
  },

  UPDATE_PHOTO (state, payload) {
    state.updated = payload.updated
    state.selected.modified = payload.updated
    state.selected.imageURL = payload.item.imageURL

    if (payload.item.blob) {
      state.selected.blob = payload.item.blob
    }
  }
}
