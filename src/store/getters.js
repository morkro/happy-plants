import { getPlantStructure } from '@/app/plant/utils'

export default {
  getPlantTags: state => guid => {
    return state.tags.data.filter(tag => tag.plants.includes(guid))
  },

  getPlantItem: state => guid => {
    const plant = state.plants.data.find(plant => plant.guid === guid)
    return plant || getPlantStructure()
  }
}
