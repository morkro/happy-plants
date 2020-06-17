import { Plant, PlantTag } from '@/types/plant'

export interface HomeState {
  plants: {
    data: Plant[]
    loaded: boolean
  }
  tags: {
    data: PlantTag[]
    loaded: boolean
  }
}

const state: HomeState = {
  plants: {
    data: [],
    loaded: false,
  },
  tags: {
    data: [],
    loaded: false,
  },
}

export default state
