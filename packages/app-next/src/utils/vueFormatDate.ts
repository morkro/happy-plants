import { VueConstructor } from 'vue'

export const formatDate = (dateString: Date): string =>
  new Date(dateString).toLocaleDateString(navigator && navigator.language)

export default {
  install(Vue: VueConstructor): void {
    Vue.filter('formatDate', formatDate)
  },
}
