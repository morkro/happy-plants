import { Commit, Dispatch } from 'vuex'
import { v4 as uuid } from 'uuid'
import { RootState } from '@/store'
import { setLocalEntry } from '@/services/localStorage'
import logger from '@/utils/vueLogger'
import { setTags, getCollection, getUserDoc, FirestoreCollections } from '@/services/firebase'
import config from '@/config'
import { PlantTag } from '@/types/plant'
import DownloadURLWorker from 'worker-loader!../../../workers/downloadURL.worker'

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

export const loadTags = async (context: {
  commit: Commit
  dispatch: Dispatch
  rootState: RootState
}) => {
  try {
    const userID = context.rootState.account.uid
    const snapshot = await getUserDoc(userID).get()
    if (snapshot.exists) {
      context.commit('assignTags', snapshot.data().tags)
    } else {
      context.commit('finishLoadingTags')
    }
  } catch (error) {
    logger(`loadTags() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to load tags.',
      },
      { root: true }
    )
  }
}

export const createTag = async (
  context: { commit: Commit; dispatch: Dispatch; rootState: RootState },
  payload: { label: string; plantID?: string }
) => {
  if (!payload.label) return

  try {
    const userID = context.rootState.account.uid
    const tags = context.rootState.home.tags.data
    const guid = uuid()
    const tag: PlantTag = {
      label: payload.label,
      name: payload.label.toLowerCase().replace(/\s/g, '-'),
      guid,
      created: Date.now(),
      modified: Date.now(),
      plants: payload.plantID ? [payload.plantID] : [],
    }

    await setTags(userID, [...tags, tag])
    context.commit('assignTag', tag)
  } catch (error) {
    logger(`createTag() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to create tags.',
      },
      { root: true }
    )
  }
}

export const updateTags = async (
  context: { commit: Commit; dispatch: Dispatch; rootState: RootState },
  tags: PlantTag[]
) => {
  try {
    const userID = context.rootState.account.uid
    const stateTags = context.rootState.home.tags.data
    const updated = stateTags.map(tag =>
      Object.assign(
        {},
        tag,
        tags.find(t => t.guid === tag.guid)
      )
    )
    context.commit('assignTags', updated)
    await setTags(userID, updated)
  } catch (error) {
    logger(`createTag() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to create tags.',
      },
      { root: true }
    )
  }
}

export const deleteTags = async (
  context: { commit: Commit; dispatch: Dispatch; rootState: RootState },
  tags: PlantTag[]
) => {
  try {
    const userID = context.rootState.account.uid
    const stateTags = context.rootState.home.tags.data
    await setTags(
      userID,
      stateTags.filter(tag => tags.find(t => t.guid !== tag.guid))
    )
  } catch (error) {
    logger(`createTag() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to create tags.',
      },
      { root: true }
    )
  }
}
