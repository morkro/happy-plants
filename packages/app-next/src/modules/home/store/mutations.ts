import { HomeState } from './state'
import { Plant } from '@/types/plant'

export default {
  assignPlant(state: HomeState, payload: Plant): void {
    state.plants.push(payload)
  },
  assignPlants(state: HomeState, payload: Plant[]): void {
    state.plants = payload
  },
  resetState(state: HomeState): void {
    state.plants = []
  },
}
