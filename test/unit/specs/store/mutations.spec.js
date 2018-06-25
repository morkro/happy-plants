import mutations from '@/store/mutations'

describe('store/mutations/appheader.js', () => {
  it('UPDATE_APPHEADER', () => {
    const state = {
      appheader: {
        transparent: false,
        title: '',
        backBtn: true
      }
    }
    mutations.UPDATE_APPHEADER(state, {
      transparent: true,
      title: 'Happy Plants',
      backBtn: false
    })
    expect(state.appheader.transparent).toBe(true)
    expect(state.appheader.title).toEqual('Happy Plants')
    expect(state.appheader.backBtn).toBe(false)
  })
})

describe('store/mutations/notifications.js', () => {
  it('SHOW_NOTIFICATION', () => {
    const state = {
      notification: {
        message: false
      }
    }
    mutations.SHOW_NOTIFICATION(state, { message: 'Show notification' })
    expect(state.notification.message).toEqual('Show notification')
  })

  it('HIDE_NOTIFICATION', () => {
    const state = {
      notification: {
        message: 'Message'
      }
    }
    mutations.HIDE_NOTIFICATION(state)
    expect(state.notification.message).toBe(false)
  })
})

describe('store/mutations/settings.js', () => {
  it('LOAD_SETTINGS', () => {
    const state = {
      settings: {
        viewMode: 'grid',
        orderBy: 'latest'
      }
    }
    expect(mutations.LOAD_SETTINGS(state, {})).toBeUndefined()
    mutations.LOAD_SETTINGS(state, { settings: { viewMode: 'list' } })
    expect(state.settings.viewMode).toEqual('list')
  })
})

describe('store/mutations/tags.js', () => {
  it('LOAD_TAGS', () => {
    const state = {
      tags: []
    }
    expect(mutations.LOAD_TAGS(state, {})).toBeUndefined()
    mutations.LOAD_TAGS(state, { tags: [1, 2, 3] })
    expect(state.tags.length).toBeGreaterThan(1)
    expect(state.tags).toEqual(expect.arrayContaining([1, 2, 3]))
  })
})
