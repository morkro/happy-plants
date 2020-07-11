import { Commit, Dispatch } from 'vuex'
import { v4 as uuid } from 'uuid'
import { RootState } from '@/store'
import { setLocalEntry } from '@/services/localStorage'
import logger from '@/utils/vueLogger'
import {
  setTags,
  getCollection,
  getUserDoc,
  FirestoreCollections,
  downloadFile,
} from '@/services/firebase'
import config from '@/config'
import { PlantTag } from '@/types/plant'

const orderMap = new Map<string, [string, firebase.firestore.OrderByDirection]>([
  ['alphabetically', ['name', 'asc']],
  ['latest', ['created', 'desc']],
])

export const loadPlants = async (
  context: {
    commit: Commit
    dispatch: Dispatch
    rootState: RootState
  },
  payload: { orderBy: string } = { orderBy: 'latest' }
): Promise<void> => {
  try {
    const userID = context.rootState.user.uid
    const [_orderBy, sortBy] = orderMap.get(payload.orderBy)
    const snapshot = await getCollection(userID, FirestoreCollections.Plants)
      .orderBy(_orderBy, sortBy)
      .get()

    setLocalEntry(config.localStorage.plantCount, String(snapshot.docs.length))

    for (const doc of snapshot.docs) {
      const plant = await getCollection(userID, FirestoreCollections.Plants)
        .doc(doc.id)
        .get()
      const plantData = plant.data()

      if (plantData.imageURL) {
        plantData.imageURL = await downloadFile(plantData.imageURL)
      }

      context.commit('assignPlant', plantData)
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
    const userID = context.rootState.user.uid
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
    const userID = context.rootState.user.uid
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
    const userID = context.rootState.user.uid
    const stateTags = context.rootState.home.tags.data
    await setTags(
      userID,
      stateTags.map(tag =>
        Object.assign(
          {},
          tag,
          tags.find(t => t.guid === tag.guid)
        )
      )
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
