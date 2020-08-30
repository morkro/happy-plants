import { Commit, Dispatch } from 'vuex'
import { setLocalEntry } from '@/services/localStorage'
import { RootState } from '@/store'
import config from '@/config'
import logger from '@/utils/vueLogger'
import {
  getCollection,
  FirestoreCollections,
  updatePlant as _updatePlant,
} from '@/services/firebase'
import DownloadURLWorker from 'worker-loader!../downloadURL.worker'
import { Plant } from '@/types/plant'
import deepMerge from '@/utils/merge'

const orderMap = new Map<string, [string, firebase.firestore.OrderByDirection]>([
  ['alphabetically', ['name', 'asc']],
  ['latest', ['created', 'desc']],
])
const downloadURLWorker = new DownloadURLWorker()

interface DownloadWorkerEvent {
  data: {
    error: boolean
    guid: string
    message: string
    imageURL?: string
  }
}

export const loadPlants = async (
  context: {
    commit: Commit
    dispatch: Dispatch
    rootState: RootState
  },
  payload: { orderBy: string } = { orderBy: 'latest' }
): Promise<void> => {
  try {
    const userID = context.rootState.account.uid
    const [_orderBy, sortBy] = orderMap.get(payload.orderBy)
    const snapshot = await getCollection(userID, FirestoreCollections.Plants)
      .orderBy(_orderBy, sortBy)
      .get()

    setLocalEntry(config.localStorage.plantCount, String(snapshot.docs.length))

    downloadURLWorker.onmessage = (event: DownloadWorkerEvent) => {
      if (event.data.error) {
        logger(
          `[Worker] Failed to load plant (${event.data.guid}) photo ${event.data.message}`,
          true
        )
      } else {
        context.commit('updatePlant', { guid: event.data.guid, imageURL: event.data.imageURL })
      }
    }

    for (const doc of snapshot.docs) {
      const plantData = doc.data()
      context.commit('assignPlant', plantData)

      if (plantData.imageURL) {
        logger(`[Worker] Fetching plant image ${plantData.guid}`)
        downloadURLWorker.postMessage(plantData)
      }
    }

    context.commit('finishLoadingPlants')
  } catch (error) {
    logger(`loadPlants() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to load plants.',
      },
      { root: true }
    )
  }
}

export const updatePlant = async (
  context: {
    commit: Commit
    dispatch: Dispatch
    rootState: RootState
  },
  plant: Plant
): Promise<void> => {
  try {
    const userID = context.rootState.account.uid
    await _updatePlant(userID, plant)
    context.commit('updatePlant', plant)
  } catch (error) {
    logger(`updatePlant() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Failed to update plant. Please try again.',
      },
      { root: true }
    )
  }
}
