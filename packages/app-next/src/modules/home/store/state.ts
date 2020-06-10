import { Plant } from '@/types/plant'
import { PlantTag } from '@/types/tags'

export interface HomeState {
  plants: {
    data: Plant[]
    loaded: boolean
  }
  tags: PlantTag[]
}

const state: HomeState = {
  plants: {
    data: [],
    loaded: false,
  },
  tags: [],
}

export default state
