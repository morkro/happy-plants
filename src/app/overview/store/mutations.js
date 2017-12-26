import Vue from 'vue'
import { sortByDate, sortByAlphabet } from '@/utils/sort'

export default {
  UPDATE_FILTER (state, payload) {
    state.updated = Date.now()
    state.settings.filter = payload.filter

    switch (state.settings.filter) {
      case 'latest':
        state.plants = state.plants.sort(sortByDate).reverse()
        break
      case 'alphabetical':
        state.plants = state.plants.sort(sortByAlphabet)
        break
    }
  },

  UPDATE_PLANT_CATEGORY (state, payload) {
    const itemIndex = state.plants.findIndex(p => p.guid === payload.item.guid)
    const plant = state.plants[itemIndex]

    state.updated = payload.updated

    if (plant) {
      Vue.set(state.plants, itemIndex, Object.assign(plant, {
        categories: !Array.isArray(plant.categories)
          ? [payload.item.category.guid]
          : [...plant.categories, payload.item.category.guid]
      }))
    }
  },

  UPDATE_PLANT_OVERVIEW (state, payload) {
    const itemIndex = state.plants.findIndex(p => p.guid === payload.item.guid)

    state.updated = Date.now()

    if (state.plants[itemIndex]) {
      Vue.set(state.plants, itemIndex, Object.assign(state.plants[itemIndex], payload.item))
    }
  }
}
