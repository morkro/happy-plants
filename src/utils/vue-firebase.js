import { db, app } from '@/api/firebase'

export default {
  install (Vue) {
    Vue.prototype.$firebase = app
    Vue.prototype.$db = db
  }
}
