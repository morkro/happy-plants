import { getUrlFromBlob } from '@/utils/blob'
import { getEntry as getEntryLF, addEntry as addEntryLF } from '@/api/localforage'
import { firestoreQuery, downloadFile } from '@/api/firebase'

const namespace = 'plant-'
const folder = 'plants'
const orderMap = new Map([
  ['alphabetical', ['name', 'asc']],
  ['latest', ['created', 'desc']]
])

async function loadPlantsFirestore (state, commit) {
  const plants = []
  const [orderBy, sortBy] = orderMap.get(state.settings.orderBy)
  const snapshot = await firestoreQuery([['users', state.user.id], [folder]])
    .orderBy(orderBy, sortBy)
    .get()

  if (!state.plants.data.length) {
    commit('LOAD_PLANTS_TOTAL_COUNT', { total: snapshot.size })
  }

  for (const doc of snapshot.docs) {
    const plant = await firestoreQuery([
      ['users', state.user.id],
      [folder, doc.id]
    ]).get()
    const plantData = plant.data()
    const plantExists = state.plants.data.find(p => p.guid === plantData.guid)

    if (plantExists) {
      if (plantData.modified > plantExists.modified) {
        commit('UPDATE_PLANT', { plant: plantData })
      }
      continue
    }

    if (plantData.imageURL) {
      plantData.imageURL = await downloadFile(plantData.imageURL)

      if (state.storage.migrationMode) {
        const photo = await fetch(plantData.imageURL)
        plantData.blob = await photo.blob()
        plantData.imageURL = getUrlFromBlob(plantData.blob)
      }
    }

    if (!state.storage.migrationMode) {
      commit('LOAD_PLANTS_SINGLE', { plant: plantData })
      await addEntryLF(namespace + plantData.guid, plantData)
    }

    plants.push(plantData)
  }

  return plants
}

async function loadPlantsLocalforage (state) {
  const plants = []
  const values = await getEntryLF(namespace)
    .then(plantData => {
      const copy = plantData
      delete copy[namespace + 'undefined']
      return copy
    })
    .then(Object.values)

  for (const item of values) {
    plants.push(item)
  }

  return plants
}

export async function loadPlants ({ state, commit }) {
  commit('LOAD_PLANTS_PROGRESS')
  let plantsFromLocalforage = []

  try {
    plantsFromLocalforage = await loadPlantsLocalforage(state)
    commit('LOAD_PLANTS_LOCALSTORAGE', { plants: plantsFromLocalforage })
  } catch (error) {
    console.warn('Unable to load plants from storage: ', error.message)
    commit('LOAD_PLANTS_FAILURE')
  }

  if (state.storage.type === 'cloud' && state.user.id) {
    try {
      const plants = await loadPlantsFirestore(state, commit)
      commit('LOAD_PLANTS_FIREBASE', { plants })
    } catch (error) {
      console.warn('Unable to load plants from Firestore: ', error.message)
      commit('LOAD_PLANTS_FAILURE')
    }
  }

  commit('LOAD_PLANTS_SUCCESS')
}

export async function loadPlantItem ({ commit }, guid) {
  commit('LOAD_PLANT_ITEM', { guid })
}
