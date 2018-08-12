import { updateEntry as updateEntryLF } from '@/api/localforage'
import { updateEntry as updateEntryFire } from '@/api/firebase'
import { getPlantStructure } from '../utils'

const namespace = 'plant-'
const folder = 'plants'

async function updatePlant (action, { state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit(action, { item: data, updated })

  if (state.storage.type === 'cloud') {
    await updateEntryFire({
      userId: state.user.id,
      folder,
      fileName: state.selected.guid,
      data: state.selected
    })
  }

  await updateEntryLF(namespace + state.selected.guid, state.selected)
}

export const resetSelectedState = ({ commit }) => {
  commit('RESET_SELECTED_PLANT', { defaultState: getPlantStructure() })
}

export const updatePlantModules = (...args) =>
  updatePlant('UPDATE_PLANT_MODULES', ...args)

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
