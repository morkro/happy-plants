import Vue from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { sync } from 'vuex-router-sync'
import { createRouter } from './router'
import { createStore, RootState } from './store'
import App from './components/App.vue'

export function createApp(): {
  create: () => Vue
  router: VueRouter
  store: Store<RootState>
} {
  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const create = () =>
    new Vue({
      router,
      store,
      render: (h) => h(App),
    })

  return { create, router, store }
}
