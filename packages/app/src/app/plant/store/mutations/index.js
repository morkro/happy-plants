// https://vuejs.org/v2/guide/list.html#Caveats
import add from './add'
import load from './load'
import update from './update'
import deleteM from './delete'

export default {
  ...add,
  ...deleteM,
  ...load,
  ...update,

  RESET_SELECTED_PLANT (state, payload) {
    state.plants.selected = Object.assign({}, state.plants.selected, payload.defaultState)
  },

  UPDATE_PLANT_NAME (state, payload) {
    state.updated = payload.updated
    state.plants.selected.modified = payload.updated
    state.plants.selected.name = payload.item.name
  },

  UPDATE_PLANT_PHOTO (state, payload) {
    state.updated = payload.updated
    state.plants.selected.modified = payload.updated
    state.plants.selected.imageURL = payload.item.imageURL

    if (payload.item.blob) {
      state.plants.selected.blob = payload.item.blob
    }
  },

  UPDATE_PLANT_TAGS (state, payload) {
    state.updated = payload.updated
    state.plants.selected.tags = payload.item.show ? [] : false
  }
}
