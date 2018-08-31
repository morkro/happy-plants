import { firestore, storage, app } from '@/api/firebase'

export default {
  install (Vue) {
    Vue.prototype.$firebase = app
    Vue.prototype.$firestore = firestore
    Vue.prototype.$storage = storage
  }
}
