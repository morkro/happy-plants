import { Commit, Dispatch } from 'vuex'
import { v4 as uuid } from 'uuid'
import { RootState } from '@/store'
import logger from '@/utils/vueLogger'
import { setTags, getUserDoc } from '@/services/firebase'
import { PlantTag } from '@/types/plant'

export const loadTags = async (context: {
  commit: Commit
  dispatch: Dispatch
  rootState: RootState
}): Promise<void> => {
  try {
    const userID = context.rootState.account.uid
    const snapshot = await getUserDoc(userID).get()
    if (snapshot.exists) {
      context.commit('assignTags', snapshot.data().tags)
    } else {
      context.commit('finishLoadingTags')
    }
  } catch (error) {
    logger(`loadTags() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to load tags.',
      },
      { root: true }
    )
  }
}

export const createTag = async (
  context: { commit: Commit; dispatch: Dispatch; rootState: RootState },
  payload: { label: string; plantID?: string }
): Promise<void> => {
  if (!payload.label) return

  try {
    const userID = context.rootState.account.uid
    const tags = context.rootState.tags.data
    const guid = uuid()
    const tag: PlantTag = {
      label: payload.label,
      name: payload.label.toLowerCase().replace(/\s/g, '-'),
      guid,
      created: Date.now(),
      modified: Date.now(),
      plants: payload.plantID ? [payload.plantID] : [],
    }

    await setTags(userID, [...tags, tag])
    context.commit('assignTag', tag)
  } catch (error) {
    logger(`createTag() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to create tags.',
      },
      { root: true }
    )
  }
}

export const updateTags = async (
  context: { commit: Commit; dispatch: Dispatch; rootState: RootState },
  tags: PlantTag[]
): Promise<void> => {
  try {
    const userID = context.rootState.account.uid
    const stateTags = context.rootState.tags.data
    const updated = stateTags.map((tag) =>
      Object.assign(
        {},
        tag,
        tags.find((t) => t.guid === tag.guid)
      )
    )
    context.commit('assignTags', updated)
    await setTags(userID, updated)
  } catch (error) {
    logger(`createTag() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to create tags.',
      },
      { root: true }
    )
  }
}

export const deleteTags = async (
  context: { commit: Commit; dispatch: Dispatch; rootState: RootState },
  tags: PlantTag[]
): Promise<void> => {
  try {
    const userID = context.rootState.account.uid
    const stateTags = context.rootState.tags.data
    await setTags(
      userID,
      stateTags.filter((tag) => tags.find((t) => t.guid !== tag.guid))
    )
  } catch (error) {
    logger(`createTag() => ${error.message}`, true)
    context.dispatch(
      'notifications/show',
      {
        type: 'alert',
        message: 'Unable to create tags.',
      },
      { root: true }
    )
  }
}
