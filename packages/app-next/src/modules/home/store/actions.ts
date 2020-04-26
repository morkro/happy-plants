import { Commit, Dispatch } from 'vuex'
import { RootState } from '@/store'
import logger from '@/utils/vueLogger'

export const loadPlants = async (context: {
  commit: Commit
  dispatch: Dispatch
  rootState: RootState
}): Promise<void> => {
  try {
    const response = await fetch('/api/plants', {
      headers: new Headers({ Authorization: context.rootState.user.idToken }),
    })
    const plants = await response.json()
    context.commit('assignPlants', plants)
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
