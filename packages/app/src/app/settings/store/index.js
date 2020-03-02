import * as actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  actions,
  mutations,
  getters,
  state: {
    tags: {
      data: [],
      error: false,
      finished: false,
      loading: false
    }
  }
}
