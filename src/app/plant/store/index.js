import getDefaultStructure from '@/utils/get-default-structure'
import * as actions from './actions'
import mutations from './mutations'

export default {
  state: getDefaultStructure(),
  actions,
  mutations
}
