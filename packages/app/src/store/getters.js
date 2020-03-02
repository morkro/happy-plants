import { getPlantStructure } from '@/app/plant/utils'
import { getGalleryStructure } from '@/app/gallery/utils/get-gallery-structure'

export default {
  getPlantTags: state => guid => {
    return state.tags.data.filter(tag => tag.plants.includes(guid))
  },

  getPlantItem: state => guid => {
    return Object.assign({}, getPlantStructure(),
      state.plants.data.find(plant => plant.guid === guid)
    )
  },

  getPlantGallery: state => guid => {
    return (
      state.gallery.data.find(gallery => gallery.guid === guid) ||
      getGalleryStructure()
    )
  }
}
