import {
  updateEntry as updateEntryLF
} from '@/api/localforage'

import {
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
    const path = [['users', state.user.id], [folder, state.selected.guid]]
    const { imageURL, blob, ...selected } = state.selected

    if (action === 'UPDATE_PLANT_PHOTO') {
      await uploadFile(path.concat(fileName), data.blob)
    }

    await updateEntryFire(path, selected)
  } else {
    await updateEntryLF(namespace + state.selected.guid, state.selected)
  }
}
