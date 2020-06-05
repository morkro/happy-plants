import Vue from 'vue'
import getModule from '@/store/utils/get-module'

export function updatePlantModule (moduleName, valueTypes, state, payload) {
  const { index, module } = getModule(moduleName, state)

  state.updated = payload.updated
  state.plants.selected.modified = payload.updated

  state.plants.selected.modules.splice(index, 1, {
    type: module.type,
    value: valueTypes.reduce((acc, current) => {
      acc[current] = payload.item[moduleName][current]
      return acc
    }, {})
  })
}

export default {
  UPDATE_PLANT (state, payload) {
    const itemIndex = state.plants.data.findIndex(p => p.guid === payload.plant.guid)
    state.updated = Date.now()
    Vue.set(state.plants.data, itemIndex, payload.plant)
  },

  UPDATE_PLANT_MODULES (state, payload) {
    state.updated = payload.updated
    state.plants.selected.modified = payload.updated

    state.plants.selected.modules = payload.item
      .filter(m => m.selected)
      .map(({ selected, ...rest }) => rest)
  },

  UPDATE_MODULE_SEASONS (state, payload) {
    const { index, module } = getModule('seasons', state)
    const seasonIndex = module.value.seasons.findIndex(s => s.month === payload.item.month)
    const season = module.value.seasons[seasonIndex]

    season.growth = !season.growth
    state.plants.selected.modified = payload.updated
    state.updated = payload.updated

    module.value.seasons.splice(seasonIndex, 1, season)
    state.plants.selected.modules.splice(index, 1, {
      type: module.type,
      value: {
        seasons: module.value.seasons
      }
    })
  },

  UPDATE_MODULE_NOTES (...args) {
    updatePlantModule('notes', ['notes'], ...args)
  },

  UPDATE_MODULE_WATERING (...args) {
    updatePlantModule('watering', ['amount', 'frequency'], ...args)
  },

  UPDATE_MODULE_FOOD (...args) {
    updatePlantModule('food', ['amount', 'frequency'], ...args)
  },

  UPDATE_MODULE_SUNSHINE (...args) {
    updatePlantModule('sunshine', ['level'], ...args)
  },

  UPDATE_MODULE_GALLERY (...args) {
    updatePlantModule('gallery', ['list'], ...args)
  }
}
