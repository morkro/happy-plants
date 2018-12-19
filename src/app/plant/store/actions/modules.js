import { updatePlant } from '@/app/plant/store/actions/update'

export const updatePlantModules = (...args) =>
  updatePlant('UPDATE_PLANT_MODULES', ...args)

export const updateSeasons = (...args) =>
  updatePlant('UPDATE_MODULE_SEASONS', ...args)

export const updateNotes = (...args) =>
  updatePlant('UPDATE_MODULE_NOTES', ...args)

export const updateWatering = (...args) =>
  updatePlant('UPDATE_MODULE_WATERING', ...args)

export const updateSunshine = (...args) =>
  updatePlant('UPDATE_MODULE_SUNSHINE', ...args)
