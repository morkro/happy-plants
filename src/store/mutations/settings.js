export default {
  LOAD_SETTINGS (state, payload) {
    if (!payload.settings || !Object.keys(payload.settings).length) {
      return
    }

    // Migration to new data schema.
    let migrate = {}
    if (payload.settings.filter) {
      const filter = payload.settings.filter
      migrate = {
        filter: undefined,
        viewMode: filter === 'categories' ? filter : state.settings.viewMode,
        orderBy: ['latest', 'alphabetical'].some(item => item === filter)
          ? filter
          : state.settings.orderBy
      }
    }

    state.updated = Date.now()
    state.settings = Object.assign(
      {},
      state.settings,
      payload.settings,
      migrate
    )
  }
}
