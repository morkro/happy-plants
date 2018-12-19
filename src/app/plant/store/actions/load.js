import { getUrlFromBlob } from '@/utils/blob'
import { getEntry as getEntryLF } from '@/api/localforage'
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
  commit('LOAD_PLANTS_TOTAL_COUNT', { total: snapshot.size })

  for (const doc of snapshot.docs) {
    const plant = await firestoreQuery([
      ['users', state.user.id],
      [folder, doc.id]
    ]).get()
    const plantData = plant.data()

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
    }

    plants.push(plantData)
  }

  return plants
}

async function loadPlantsLocalforage () {
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
  let plants = []

  if (state.storage.type === 'cloud' && state.user.id) {
    try {
      plants = await loadPlantsFirestore(state, commit)
    } catch (error) {
      commit('LOAD_PLANTS_FAILURE')
    }
   } else {
    plants = await loadPlantsLocalforage()
  }

  commit('LOAD_PLANTS_SUCCESS', { plants })
}

export function loadPlantItem ({ state, commit }, guid) {
  commit('LOAD_PLANT_ITEM', { guid })
}
