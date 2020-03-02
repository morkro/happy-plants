import {
  updateEntry as updateEntryLF
} from '@/api/localforage'

import {
  storagePath,
  updateEntry as updateEntryFire,
  uploadFile
} from '@/api/firebase'

const namespace = 'plant-'
const folder = 'plants'
const fileName = 'cover.png'

export async function updatePlant (action, { state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit(action, { item: data, updated })

  if (state.storage.type === 'cloud') {
    const path = [['users', state.user.id], [folder, state.plants.selected.guid]]
    const { imageURL, blob, ...selected } = state.plants.selected

    if (action === 'UPDATE_PLANT_PHOTO') {
      await uploadFile(path.concat(fileName), data.blob)
    }

    await updateEntryFire(path, {
      ...selected,
      imageURL: selected.imageURL || `${storagePath(path)}/${fileName}`
    })
  }

  await updateEntryLF(namespace + state.plants.selected.guid, state.plants.selected)
}

export const updatePlantModules = (...args) =>
  updatePlant('UPDATE_PLANT_MODULES', ...args)

export const updateSeasonsModule = (...args) =>
  updatePlant('UPDATE_MODULE_SEASONS', ...args)

export const updateNotesModule = (...args) =>
  updatePlant('UPDATE_MODULE_NOTES', ...args)

export const updateWateringModule = (...args) =>
  updatePlant('UPDATE_MODULE_WATERING', ...args)

export const updateSunshineModule = (...args) =>
  updatePlant('UPDATE_MODULE_SUNSHINE', ...args)

export const updateGalleryModule = (context, payload) => {
  const module = context.state.plants.selected.modules.find(m => m.type === 'gallery')
  const data = {
    guid: payload.guid,
    gallery: {
      list: module.value.list
    }
  }

  if (payload.type === 'add') {
    data.gallery.list.unshift(payload.item)
  } else if (payload.type === 'delete') {
    data.gallery.list = data.gallery.list.filter(item => item !== payload.item)
  }

  return updatePlant('UPDATE_MODULE_GALLERY', context, data)
}
