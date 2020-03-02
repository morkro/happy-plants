import uuid from 'uuid/v4'

import {
  getEntry as getEntryLF,
  addEntry as addEntryLF,
  updateEntry as updateEntryLF
} from '@/api/localforage'

import {
  addEntry as addEntryFire,
  getEntry as getEntryFire,
  updateEntry as updateEntryFire
} from '@/api/firebase'

const namespace = 'tags'

export async function importTags ({ state, commit }, data) {
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit('IMPORT_TAGS', { data, updated })

  if (state.storage.type === 'cloud') {
    await addEntryFire([['users', state.user.id]], { tags: state.tags.data })
  } else {
    await updateEntryLF('tags', state.tags.data)
  }
}

export async function loadTags ({ state, commit }, data = {}) {
  commit('LOAD_TAGS_PROGRESS')
  let tags = []

  if (state.storage.type === 'cloud' && state.user.id) {
    try {
      const data = await getEntryFire([['users', state.user.id]])
      if (data.exists) {
        tags = data.data()[namespace]
      }
    } catch (error) {
      commit('LOAD_TAGS_FAILURE')
    }
  } else {
    const data = await getEntryLF(namespace)
    tags = data.tags
  }

  commit('LOAD_TAGS_SUCCESS', { tags })
}

export async function addTag ({ state, commit }, data) {
  commit('ADD_TAG_PROGRESS')
  const meta = state.storage.migrationMode ? data : {
    ...data,
    guid: uuid(),
    created: Date.now(),
    modified: Date.now()
  }
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  if (!state.storage.migrationMode) {
    commit('ADD_TAG_SUCCESS', { item: meta, updated })
  }

  if (state.storage.type === 'cloud') {
    await addEntryFire([['users', state.user.id]], { tags: state.tags.data })
  } else {
    await addEntryLF(namespace, state.tags.data)
  }
}

export async function deleteTag ({ state, commit }, data) {
  commit('DELETE_TAG_PROGRESS')
  const updated = Date.now()
  await updateEntryLF('updated', updated)
  let tags = state.tags.data

  if (!state.storage.migrationMode) {
    commit('DELETE_TAG_SUCCESS', { item: data, updated })
  } else {
    tags = tags.filter(p => p.guid !== data.guid)
  }

  if (state.storage.type === 'cloud') {
    try {
      await updateEntryFire([['users', state.user.id]], { tags })
    } catch (error) {
      commit('DELETE_TAG_FAILURE')
    }
  } else {
    await addEntryLF(namespace, tags)
  }
}

export async function updateTag ({ state, commit }, data) {
  const item = state.tags.data.find(tag => tag.guid === data.guid)
  const meta = { ...item, ...data, modified: Date.now() }
  const updated = Date.now()
  await updateEntryLF('updated', updated)

  commit('UPDATE_TAG', { item: meta })

  if (state.storage.type === 'cloud') {
    await updateEntryFire([['users', state.user.id]], { tags: state.tags.data })
  } else {
    await addEntryLF(namespace, state.tags.data)
  }
}
