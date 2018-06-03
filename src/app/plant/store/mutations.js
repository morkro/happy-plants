// https://vuejs.org/v2/guide/list.html#Caveats

function updatePlantModule (moduleName, valueType, state, payload) {
  const moduleIndex = state.selected.modules.findIndex(m => m.type === moduleName)
  const module = state.selected.modules[moduleIndex]

  state.updated = payload.updated
  state.selected.modified = payload.updated

  state.selected.modules.splice(moduleIndex, 1, {
    type: module.type,
    value: {
      [valueType]: payload.item[moduleName][valueType]
    }
  })
}

export default {
  RESET_SELECTED_PLANT (state, payload) {
    state.selected = Object.assign({}, state.selected, payload.defaultState)
  },

  UPDATE_PLANT_MODULES (state, payload) {
    state.updated = payload.updated
    state.selected.modified = payload.updated

    state.selected.modules = payload.item
      .filter(m => m.selected)
      .map(({ selected, ...rest }) => rest)
  },

  UPDATE_SEASON (state, payload) {
    const moduleIndex = state.selected.modules.findIndex(m => m.type === 'seasons')
    const module = state.selected.modules[moduleIndex]
    const seasonIndex = module.value.seasons.findIndex(s => s.month === payload.item.month)
    const season = module.value.seasons[seasonIndex]

    season.growth = !season.growth
    state.selected.modified = payload.updated
    state.updated = payload.updated

    module.value.seasons.splice(seasonIndex, 1, season)
    state.selected.modules.splice(moduleIndex, 1, {
      type: module.type,
      value: {
        seasons: module.value.seasons
      }
    })
  },

  UPDATE_NOTES (...args) {
    updatePlantModule('notes', 'notes', ...args)
  },

  UPDATE_WATERING (...args) {
    updatePlantModule('watering', 'level', ...args)
  },

  UPDATE_SUNSHINE (...args) {
    updatePlantModule('sunshine', 'level', ...args)
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
  },

  UPDATE_PLANT_TAGS (state, payload) {
    state.updated = payload.updated
    state.selected.tags = payload.item.show ? [] : false
  }
}
