import { HomeState } from './state'
import { Plant } from '@/shared/types/plant'

export default {
  assignPlants(state: HomeState, payload: Plant[]): void {
    state.plants = payload
  },
}
