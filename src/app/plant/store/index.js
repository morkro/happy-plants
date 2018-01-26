import { getPlantStructure } from '../utils'
import * as actions from './actions'
import mutations from './mutations'

export default {
  state: getPlantStructure(),
  actions,
  mutations
}
