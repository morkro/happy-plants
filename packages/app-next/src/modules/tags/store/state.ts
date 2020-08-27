import { PlantTag } from '@/types/plant'

export interface TagsState {
  data: PlantTag[]
  loaded: boolean
}

const state: TagsState = {
  data: [],
  loaded: false,
}

export default state
