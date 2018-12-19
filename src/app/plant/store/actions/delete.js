import { isBlobbable } from '@/utils/blob'

import {
  deleteEntry as deleteEntryLF
} from '@/api/localforage'

import {
  deleteEntry as deleteEntryFire,
  deleteFile
} from '@/api/firebase'

const namespace = 'plant-'
const folder = 'plants'
const fileName = 'cover.png'

export async function deletePlants ({ state, commit }, items) {
  commit('DELETE_PLANT_PROGRESS')

  if (state.storage.type === 'cloud') {
    try {
      await Promise.all(items.map(async item => {
        const path = [['users', state.user.id], [folder, item.guid]]
        await deleteEntryFire(path)
        if (item.blob && isBlobbable(item.blob)) {
          await deleteFile(path.concat(fileName))
        }
      }))
    } catch (error) {
      commit('DELETE_PLANTS_FAILURE')
    }
  } else {
    await Promise.all(items.map(item => deleteEntryLF(namespace + item.guid, item)))
  }

  if (!state.storage.migrationMode) {
    commit('DELETE_PLANTS_SUCCESS', { items })
  }
}
