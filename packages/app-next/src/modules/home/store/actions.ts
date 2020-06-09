import { Commit, Dispatch } from 'vuex'
import { RootState } from '@/store'
import { setLocalEntry } from '@/services/localStorage'
import logger from '@/utils/vueLogger'
import { getCollection, getUserDoc, FirestoreCollections, downloadFile } from '@/services/firebase'
import config from '@/config'

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
