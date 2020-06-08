import { Commit, Dispatch } from 'vuex'
import { RootState } from '@/store'
import { setLocalEntry } from '@/services/localStorage'
import logger from '@/utils/vueLogger'
import { getCollection, FirestoreCollections, downloadFile } from '@/services/firebase'

export const loadPlants = async (context: {
  commit: Commit
  dispatch: Dispatch
  rootState: RootState
}): Promise<void> => {
  try {
    const userID = context.rootState.user.uid
    const snapshot = await getCollection(userID, FirestoreCollections.Plants).get()

    setLocalEntry('plant-data-count', String(snapshot.docs.length))

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
    logger(error.message, true)
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
