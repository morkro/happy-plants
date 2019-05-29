import * as actions from './actions'
import mutations from './mutations'

export default {
  actions,
  mutations,
  state: {
    authenticated: false,
    authFromRedirect: false,
    error: false,
    firstTimeUser: false,
    id: null,
    loading: false,
    name: null
  }
}
