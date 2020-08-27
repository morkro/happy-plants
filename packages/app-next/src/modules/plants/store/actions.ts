import { Commit, Dispatch } from 'vuex'
import { setLocalEntry } from '@/services/localStorage'
import { RootState } from '@/store'
import config from '@/config'
import logger from '@/utils/vueLogger'
import { getCollection, FirestoreCollections } from '@/services/firebase'
import DownloadURLWorker from 'worker-loader!../downloadURL.worker'

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
