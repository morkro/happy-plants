export default {
  getPlantCategories: state => categories => {
    return categories.map(guid => state.categories.find(category => category.guid === guid))
  }
}
