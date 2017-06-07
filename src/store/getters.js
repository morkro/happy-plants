export default {
  getPlantItem: (state, getters) => guid => {
    return state.plants.find(p => p.guid === guid)
  }
}
