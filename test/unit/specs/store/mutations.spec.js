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

  it('ADD_TAG', () => {
    const state = {
      tags: []
    }
    const name = 'Foo tag'

    // Adding a new tag works as expected
    mutations.ADD_TAG(state, { item: { name, plants: ['guid'] } })
    expect(state.tags).toEqual(expect.arrayContaining([{ name, plants: ['guid'] }]))

    // Adding the exact same tag again just returns and doesn't mutate
    expect(mutations.ADD_TAG(state, { item: { name, plants: ['guid'] } })).toBe(undefined)
    expect(state.tags).toEqual(expect.arrayContaining([{ name, plants: ['guid'] }]))

    // Adding a new plant ID to the same tag works
    mutations.ADD_TAG(state, { item: { name, plants: ['guid 2'] } })
    expect(state.tags).toEqual(expect.arrayContaining([
      { name, plants: ['guid', 'guid 2'] }
    ]))
  })

  it('DELETE_TAG', () => {
    const state = {
      tags: []
    }
    mutations.DELETE_TAG(state)
    expect()
  })

  it('UPDATE_TAG', () => {
    const state = {
      tags: [{
        name: 'super-tag',
        label: 'Super tag',
        guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d'
      }]
    }
    mutations.UPDATE_TAG(state, {
      item: {
        guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d',
        name: 'awesome-tag',
        label: 'Awesome tag'
      }
    })
    expect(state.tags).toEqual(expect.arrayContaining([{
      name: 'awesome-tag',
      label: 'Awesome tag',
      guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d'
    }]))
  })
})
