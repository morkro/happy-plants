export default (Vue) => {
  Vue.prototype.$getProperty = property =>
    getComputedStyle(document.documentElement)
      .getPropertyValue(`--${property}`)
      .trim()
}
