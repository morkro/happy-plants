import { Plant } from '@/shared/types/plant'

export interface HomeState {
  plants: Plant[]
}

const state: HomeState = {
  plants: [],
}

export default state
