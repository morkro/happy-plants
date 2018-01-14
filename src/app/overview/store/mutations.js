import Vue from 'vue'
import { sortByDate, sortByAlphabet } from '@/utils/sort'

export default {
  UPDATE_VIEWMODE (state, payload) {
    state.updated = Date.now()
    state.settings = Object.assign({}, state.settings, payload)

    switch (state.settings.orderBy) {
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
      let list = !Array.isArray(plant.categories) ? [] : plant.categories

      if (payload.item.type === 'add' && !list.includes(payload.item.category.guid)) {
        list.push(payload.item.category.guid)
      }

      if (payload.item.type === 'remove') {
        list = list.filter(cat => cat !== payload.item.category.guid)
      }

      Vue.set(state.plants, itemIndex, Object.assign(plant, {
        categories: list
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
