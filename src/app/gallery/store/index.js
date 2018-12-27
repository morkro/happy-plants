import * as actions from './actions'
import mutations from './mutations'

export default {
  actions,
  mutations,
  state: {
    data: [],
    error: false,
    finished: false,
    loading: false
  }
}
