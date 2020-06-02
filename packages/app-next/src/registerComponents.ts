import Vue from 'vue'

/**
 * Register all base components globally, as they will be used all over the
 * codebase. This file loads all files from the 'src/components/' directory
 * and normalizes their filename to become the components name.
 * Examples:
 *    fileName               => componentName
 *    ./AuthProviderList.vue => auth-provider-list
 *    ./Button.vue           => v-button
 */

const requireComponent = require.context('./components', false, /\.vue$/)
const fileNameToComponentName = (file: string) => file.substr(2).replace(/\.vue/, '')
const pascalToKebab = (name: string) => name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
const addPrefix = (name: string) => (name.includes('-') ? name : `v-${name}`)

for (const fileName of requireComponent.keys()) {
  const componentConfig = requireComponent(fileName)
  const componentName = addPrefix(pascalToKebab(fileNameToComponentName(fileName)))
  Vue.component(componentName, componentConfig.default || componentConfig)
}
