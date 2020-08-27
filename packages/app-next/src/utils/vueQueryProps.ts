import { VueConstructor } from 'vue'

const hasProperty = (object: Record<string, unknown>, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(object, key)

export default {
  install(Vue: VueConstructor): void {
    Vue.prototype.$hasQuery = function (query: string): boolean {
      return hasProperty(this.$route.query, query)
    }
  },
}
