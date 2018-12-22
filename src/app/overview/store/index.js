import * as actions from './actions'
import mutations from './mutations'

export default {
  actions,
  mutations,
  state: {
    filterBy: 'all',
    orderBy: 'latest',
    viewMode: 'grid'
  }
}
