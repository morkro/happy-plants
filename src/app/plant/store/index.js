import * as actions from './actions'
import mutations from './mutations'

const state = {
  guid: '',
  name: '',
  scientific: '',
  location: '',
  blob: undefined,
  imageURL: '',
  seasons: [],
  notes: ''
}

export default {
  state,
  actions,
  mutations
}
