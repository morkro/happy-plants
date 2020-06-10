import { HomeState } from './state'
import { Plant } from '@/types/plant'
import { PlantTag } from '@/types/tags'

export default {
  assignPlant(state: HomeState, payload: Plant): void {
    if (state.plants.data.find(p => p.guid === payload.guid)) {
      return
    }
    state.plants.data.push(payload)
  },
  assignPlants(state: HomeState, payload: Plant[]): void {
    state.plants.data = payload
  },
  finishLoadingPlants(state: HomeState): void {
    state.plants.loaded = true
  },
  assignTags(state: HomeState, payload: PlantTag[]): void {
    state.tags = payload
  },
  resetState(state: HomeState): void {
    state.plants.data = []
    state.plants.loaded = false
    state.tags = []
  },
}
