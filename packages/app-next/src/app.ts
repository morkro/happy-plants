import Vue from 'vue'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { sync } from 'vuex-router-sync'
import { createRouter } from './router'
import { createStore, RootState } from './store'
import App from './modules/App.vue'

interface CreateApp {
  hold?: boolean
}

export function createApp({ hold = false }: CreateApp = {}): {
  app: Vue
  router: VueRouter
  store: Store<RootState>
  create: () => Vue
} {
  const router = createRouter()
  const store = createStore()
  const create = () =>
    new Vue({
      router,
      store,
      render: h => h(App),
    })

  sync(store, router)

  let app
  if (hold === false) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    })
  }

  return { app, router, store, create }
}
