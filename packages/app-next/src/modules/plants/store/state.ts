import { Plant } from '@/types/plant'

export interface PlantsState {
  data: Plant[]
  loaded: boolean
}

const state: PlantsState = {
  data: [],
  loaded: false,
}

export default state
