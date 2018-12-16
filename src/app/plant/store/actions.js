import { updatePlant } from '@/store/actions/plants'
import { getPlantStructure } from '../utils'

export const resetSelectedState = ({ commit }) => {
  commit('RESET_SELECTED_PLANT', { defaultState: getPlantStructure() })
}

export const updatePlantModules = (...args) =>
  updatePlant('UPDATE_PLANT_MODULES', ...args)

export const updateGallery = (...args) =>
  updatePlant('UPDATE_GALLERY', ...args)

export const updateSeason = (...args) =>
  updatePlant('UPDATE_SEASON', ...args)

export const updateNotes = (...args) =>
  updatePlant('UPDATE_NOTES', ...args)

export const updateWatering = (...args) =>
  updatePlant('UPDATE_WATERING', ...args)

export const updateSunshine = (...args) =>
  updatePlant('UPDATE_SUNSHINE', ...args)

export const updateName = (...args) =>
  updatePlant('UPDATE_NAME', ...args)

export const updatePhoto = (...args) =>
  updatePlant('UPDATE_PHOTO', ...args)

export const toggleTags = (...args) =>
  updatePlant('UPDATE_PLANT_TAGS', ...args)
