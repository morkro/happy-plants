import Vue from 'vue'
import { HomeState } from './state'
import { Plant, PlantTag } from '@/types/plant'

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
  removePlant(state: HomeState, payload: Plant): void {
    Vue.delete(
      state.plants.data,
      state.plants.data.findIndex(p => p.guid === payload.guid)
    )
  },
  finishLoadingPlants(state: HomeState): void {
    state.plants.loaded = true
  },
  assignTags(state: HomeState, payload: PlantTag[]): void {
    state.tags.data = payload
    state.tags.loaded = true
  },
  assignTag(state: HomeState, payload: PlantTag): void {
    if (state.tags.data.find(p => p.guid === payload.guid)) {
      return
    }
    state.tags.data.push(payload)
  },
  finishLoadingTags(state: HomeState): void {
    state.tags.loaded = true
  },
  resetState(state: HomeState): void {
    state.plants.data = []
    state.plants.loaded = false
    state.tags.data = []
    state.tags.loaded = false
  },
}
