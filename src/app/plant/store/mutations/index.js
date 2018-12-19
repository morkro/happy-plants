// https://vuejs.org/v2/guide/list.html#Caveats
import add from './add'
import load from './load'
import modules from './modules'
import update from './update'
import deleteM from './delete'

export default {
  ...add,
  ...deleteM,
  ...load,
  ...modules,
  ...update,

  RESET_SELECTED_PLANT (state, payload) {
    state.selected = Object.assign({}, state.selected, payload.defaultState)
  },

  UPDATE_PLANT_NAME (state, payload) {
    state.updated = payload.updated
    state.selected.modified = payload.updated
    state.selected.name = payload.item.name
  },

  UPDATE_PLANT_PHOTO (state, payload) {
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
