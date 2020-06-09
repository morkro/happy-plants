import { Plant } from '@/types/plant'
import { PlantTag } from '@/types/tags'

export interface HomeState {
  plants: Plant[]
  tags: PlantTag[]
}

const state: HomeState = {
  plants: [],
  tags: [],
}

export default state
