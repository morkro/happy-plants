import { updatePlant } from '@/app/plant/store/actions/update'
import { getPlantStructure } from '@/app/plant/utils'

export * from './add'
export * from './delete'
export * from './load'
export * from './update'

export const resetSelectedState = ({ commit }) => {
  commit('RESET_SELECTED_PLANT', { defaultState: getPlantStructure() })
}

export const updateName = (...args) =>
  updatePlant('UPDATE_PLANT_NAME', ...args)

export const updatePhoto = (...args) =>
  updatePlant('UPDATE_PLANT_PHOTO', ...args)

export const toggleTags = (...args) =>
  updatePlant('UPDATE_PLANT_TAGS', ...args)
