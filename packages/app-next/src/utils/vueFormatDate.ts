import { VueConstructor } from 'vue'

export const formatDate = (dateString: Date) =>
  new Date(dateString).toLocaleDateString(navigator && navigator.language)

export default {
  install(Vue: VueConstructor) {
    Vue.filter('formatDate', formatDate)
  },
}
