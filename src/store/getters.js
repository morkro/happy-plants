import { getPlantStructure } from '@/app/plant/utils'

export default {
  getPlantTags: state => guid => {
    return state.tags.data.filter(tag => tag.plants.includes(guid))
  },

  getPlantItem: state => guid => {
    return Object.assign({}, getPlantStructure(),
      state.plants.data.find(plant => plant.guid === guid)
    )
  }
}
