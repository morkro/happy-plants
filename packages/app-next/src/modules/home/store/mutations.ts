import { HomeState } from './state'
import { Plant } from '@/types/plant'
import { PlantTag } from '@/types/tags'

export default {
  assignPlant(state: HomeState, payload: Plant): void {
    state.plants.push(payload)
  },
  assignPlants(state: HomeState, payload: Plant[]): void {
    state.plants = payload
  },
  assignTags(state: HomeState, payload: PlantTag[]): void {
    state.tags = payload
  },
  resetState(state: HomeState): void {
    state.plants = []
    state.tags = []
  },
}
