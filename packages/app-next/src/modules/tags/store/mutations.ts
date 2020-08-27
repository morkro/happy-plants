import { TagsState } from './state'
import { PlantTag } from '@/types/plant'

export default {
  assignTags(state: TagsState, payload: PlantTag[]): void {
    state.data = payload
    state.loaded = true
  },
  assignTag(state: TagsState, payload: PlantTag): void {
    if (state.data.find((p) => p.guid === payload.guid)) {
      return
    }
    state.data.push(payload)
  },
  finishLoadingTags(state: TagsState): void {
    state.loaded = true
  },
  resetState(state: TagsState): void {
    state.data = []
    state.loaded = false
  },
}
