import { HomeState } from './state'

export default {
  assignPlants(state: HomeState, payload: unknown[]): void {
    state.plants = payload
  },
}
