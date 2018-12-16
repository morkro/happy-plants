// https://vuejs.org/v2/guide/list.html#Caveats
import Vue from 'vue'

function getModule (moduleName, state) {
  const index = state.selected.modules.findIndex(m => m.type === moduleName)
  return {
    index,
    module: state.selected.modules[index]
  }
}

export function updatePlantModule (moduleName, valueTypes, state, payload) {
  const { index, module } = getModule(moduleName, state)

  state.updated = payload.updated
  state.selected.modified = payload.updated

  state.selected.modules.splice(index, 1, {
    type: module.type,
    value: valueTypes.reduce((acc, current) => {
      acc[current] = payload.item[moduleName][current]
      return acc
    }, {})
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
    const { index, module } = getModule('seasons', state)
    const seasonIndex = module.value.seasons.findIndex(s => s.month === payload.item.month)
    const season = module.value.seasons[seasonIndex]

    season.growth = !season.growth
    state.selected.modified = payload.updated
    state.updated = payload.updated

    module.value.seasons.splice(seasonIndex, 1, season)
    state.selected.modules.splice(index, 1, {
      type: module.type,
      value: {
        seasons: module.value.seasons
      }
    })
  },

  UPDATE_NOTES (...args) {
    updatePlantModule('notes', ['notes'], ...args)
  },

  UPDATE_WATERING (...args) {
    updatePlantModule('watering', ['amount', 'frequency'], ...args)
  },

  UPDATE_SUNSHINE (...args) {
    updatePlantModule('sunshine', ['level'], ...args)
  },

  UPDATE_GALLERY (state, payload) {
    const { index, module } = getModule('gallery', state)
    const galleryIndex = module.value.list.findIndex(g => g.guid === payload.item.guid)
    const galleryItem = module.value.list[galleryIndex]

    state.selected.modified = payload.updated
    state.updated = payload.updated

    if (galleryItem) {
      Vue.delete(module.value.list, galleryIndex)
    } else {
      module.value.list.push(payload.item)
    }

    state.selected.modules.splice(index, 1, {
      type: module.type,
      value: {
        list: module.value.list
      }
    })
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
