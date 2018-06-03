import uuid from 'uuid/v4'
import { fetchCategories, updateCategories } from '@/api/categories'
import { updateStoreTimestamp } from '@/api/store'

export const loadCategories = ({ state, commit }, data = {}) => {
  if (!state.plants || state.plants.length === 0 || !!data.force) {
    return fetchCategories()
      .then(categories => commit('LOAD_CATEGORIES', categories))
  }
  return Promise.resolve()
}

export const addCategory = ({ state, commit }, data) => {
  const meta = {
    ...data,
    guid: uuid(),
    created: Date.now(),
    modified: Date.now()
  }
  updateStoreTimestamp(meta)
    .then(config =>
      commit('ADD_CATEGORY', { item: meta, updated: config.updated }))
    .then(() => updateCategories(state.categories))
}

export const deleteCategory = ({ state, commit }, data) => {
  updateStoreTimestamp(data)
    .then(config =>
      commit('DELETE_CATEGORY', { item: config.data, updated: config.updated }))
    .then(() => updateCategories(state.categories))
}

export const updateCategory = ({ state, commit }, data) => {
  const item = state.categories.find(c => c.guid === data.guid)
  const meta = { ...item, ...data, modified: Date.now() }
  updateStoreTimestamp(meta)
    .then(config =>
      commit('UPDATE_CATEGORY', { item: meta }))
    .then(() => updateCategories(state.categories))
}
