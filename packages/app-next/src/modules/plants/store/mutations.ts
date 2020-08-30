import Vue from 'vue'
import { PlantsState } from './state'
import { Plant } from '@/types/plant'
import deepMerge from '@/utils/merge'

export default {
  assignPlant(state: PlantsState, payload: Plant): void {
    if (state.data.find((p) => p.guid === payload.guid)) {
      return
    }
    state.data.push(payload)
  },
  updatePlant(state: PlantsState, payload: Plant): void {
    const plant = state.data.find((p) => p.guid === payload.guid)
    if (!plant) {
      return
    }
    state.data.splice(
      state.data.findIndex((p) => p.guid === payload.guid),
      1,
      deepMerge(plant, payload) as Plant
    )
  },
  removePlant(state: PlantsState, payload: Plant): void {
    Vue.delete(
      state.data,
      state.data.findIndex((p) => p.guid === payload.guid)
    )
  },
  finishLoadingPlants(state: PlantsState): void {
    state.loaded = true
  },
  resetState(state: PlantsState): void {
    state.data = []
    state.loaded = false
  },
}
