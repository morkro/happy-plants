import uuid from 'uuid/v4'
import { fetchTags, updateTags } from '@/api/tags'
import { updateStoreTimestamp } from '@/api/store'

export const loadTags = ({ state, commit }, data = {}) => {
  if (!state.plants || state.plants.length === 0 || !!data.force) {
    return fetchTags()
      .then(tags => commit('LOAD_TAGS', tags))
  }
  return Promise.resolve()
}

export const addTag = ({ state, commit }, data) => {
  const meta = {
    ...data,
    guid: uuid(),
    created: Date.now(),
    modified: Date.now()
  }
  updateStoreTimestamp(meta)
    .then(config =>
      commit('ADD_TAG', { item: meta, updated: config.updated }))
    .then(() => updateTags(state.tags))
}

export const deleteTag = ({ state, commit }, data) => {
  updateStoreTimestamp(data)
    .then(config =>
      commit('DELETE_TAG', { item: config.data, updated: config.updated }))
    .then(() => updateTags(state.tags))
}

export const updateTag = ({ state, commit }, data) => {
  const item = state.tags.find(tag => tag.guid === data.guid)
  const meta = { ...item, ...data, modified: Date.now() }
  updateStoreTimestamp(meta)
    .then(config =>
      commit('UPDATE_TAG', { item: meta }))
    .then(() => updateTags(state.tags))
}
