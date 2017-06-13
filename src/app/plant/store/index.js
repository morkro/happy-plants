import getDefaultStructure from '@/utils/getDefaultStructure'
import * as actions from './actions'
import mutations from './mutations'

export default {
  state: getDefaultStructure(),
  actions,
  mutations
}
