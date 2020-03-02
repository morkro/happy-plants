export const formatDate = (dateString, locale = 'en-EN') =>
  new Date(dateString)
    .toLocaleDateString(navigator && navigator.language)

export default {
  install (Vue) {
    Vue.filter('formatDate', formatDate)
  }
}
