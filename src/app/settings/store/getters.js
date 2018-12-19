export default {
  getAllData: state => {
    return {
      version: state.version,
      settings: state.settings,
      plants: state.plants,
      tags: state.tags,
      storage: state.storage
    }
  }
}
