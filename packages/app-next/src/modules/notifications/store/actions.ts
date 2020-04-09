import { Commit } from 'vuex'
import { SetNotificationPayload } from './mutations'

export const show = (context: { commit: Commit }, payload: SetNotificationPayload): void => {
  context.commit('set', payload)
  setTimeout(() => {
    context.commit('clear')
  }, 3000)
}
