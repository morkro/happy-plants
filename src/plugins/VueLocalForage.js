import localforage from 'localforage'

export default function install (Vue, options) {
  localforage.config({
    name: options.name,
    driver: options.driver.map(driver => localforage[driver])
  })
  Vue.prototype.$localforage = localforage
}
