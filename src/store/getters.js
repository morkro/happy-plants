export default {
  getPlantTags: state => guid => {
    return state.tags.filter(tag => tag.plants.includes(guid))
  }
}
