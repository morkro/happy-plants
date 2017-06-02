import Vue from 'vue'

export function getElement (component, propsData) {
  const Ctor = Vue.extend(component)
  const vm = new Ctor({ propsData }).$mount()
  return vm.$el
}
