export default (Vue) => {
  Vue.prototype.$getComputedProperty = property =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(`--${property}`)
      .trim()
}
