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

  it('HAS_SEEN_NEW_RELEASE', () => {
    const state = {
      settings: {
        hasNewRelease: false
      }
    }
    mutations.HAS_SEEN_NEW_RELEASE(state)
    expect(state.settings.hasNewRelease).toBe(false)
  })

  it('UPDATE_THEME', () => {
    const state = {
      settings: {
        theme: 'light'
      }
    }
    mutations.UPDATE_THEME(state, { theme: 'dark' })
    expect(state.settings.theme).toEqual('dark')
  })
})

describe('store/mutations/plants.js', () => {
  let defaultState
  beforeEach(() => {
    defaultState = {
      plants: {
        loading: false,
        finished: false,
        error: false,
        data: []
      }
    }
  })

  it('LOAD_PLANTS_TOTAL_COUNT', () => {
    let state = defaultState
    mutations.LOAD_PLANTS_TOTAL_COUNT(state, { total: 10 })
    expect(state.plants.loading).toBe(true)
    expect(state.plants.data).toHaveLength(10)
  })

  it('LOAD_PLANTS_PROGRESS', () => {
    let state = defaultState
    mutations.LOAD_PLANTS_PROGRESS(state)
    expect(state.plants.loading).toBe(true)
  })

  it('LOAD_PLANTS_FAILURE', () => {
    let state = defaultState
    mutations.LOAD_PLANTS_FAILURE(state)
    expect(state.plants.loading).toBe(false)
    expect(state.plants.finished).toBe(true)
    expect(state.plants.error).toBe(true)
  })

  it('ADD_PLANT_SUCCESS', () => {
    const then = new Date('2018-06-25').getTime()
    const now = Date.now()
    const state = {
      plants: {
        data: [{ name: 'Bar', created: then }]
      },
      settings: {
        orderBy: 'alphabetical'
      }
    }

    // Add and sort alphabetical
    mutations.ADD_PLANT_SUCCESS(state, { item: { name: 'Foo', created: now } })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { name: 'Bar', created: then },
      { name: 'Foo', created: now }
    ]))

    // Add and sort by date (latest)
    state.settings.orderBy = 'latest'
    state.plants.data = [{ name: 'Bar', created: then }]
    mutations.ADD_PLANT_SUCCESS(state, { item: { name: 'Foo', created: now } })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { name: 'Foo', created: now },
      { name: 'Bar', created: then }
    ]))
  })

  it('ADD_PLANT_FAILURE, DELETE_PLANTS_FAILURE', () => {
    let state = defaultState
    mutations.ADD_PLANT_FAILURE(state)
    expect(state.plants.error).toBe(true)
    state = defaultState
    mutations.DELETE_PLANTS_FAILURE(state)
    expect(state.plants.error).toBe(true)
  })

  it('DELETE_PLANTS_SUCCESS', () => {
    const state = {
      plants: {
        data: [
          { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
          { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
          { guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' },
          { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
        ]
      }
    }
    mutations.DELETE_PLANTS_SUCCESS(state, { items: [
      { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
      { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
    ] })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
      { guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' }
    ]))
  })

  it('UPDATE_PLANT', () => {
    const state = {
      plants: {
        data: [{
          name: 'Bar',
          guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
        }]
      }
    }
    mutations.UPDATE_PLANT(state, { data: {
      name: 'New name',
      guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
    } })
    expect(state.plants.data).toEqual(expect.arrayContaining([{
      name: 'New name',
      guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
    }]))
  })
})

describe('store/mutations/tags.js', () => {
  it('LOAD_TAGS', () => {
    const state = {
      tags: {
        loading: false,
        data: []
      }
    }
    mutations.LOAD_TAGS_PROGRESS(state)
    expect(state.tags.loading).toBe(true)
    expect(mutations.LOAD_TAGS_SUCCESS(state, {})).toBeUndefined()
    mutations.LOAD_TAGS_SUCCESS(state, { tags: [1, 2, 3] })
    expect(state.tags.data.length).toBeGreaterThan(1)
    expect(state.tags.data).toEqual(expect.arrayContaining([1, 2, 3]))
  })

  it('ADD_TAG_SUCCESS', () => {
    const state = {
      tags: { data: [] }
    }
    const name = 'Foo tag'

    // Adding a new tag works as expected
    mutations.ADD_TAG_SUCCESS(state, { item: { name, plants: ['guid'] } })
    expect(state.tags.data).toEqual(expect.arrayContaining([{ name, plants: ['guid'] }]))

    // Adding the exact same tag again just returns and doesn't mutate
    expect(mutations.ADD_TAG_SUCCESS(state, { item: { name, plants: ['guid'] } })).toBe(undefined)
    expect(state.tags.data).toEqual(expect.arrayContaining([{ name, plants: ['guid'] }]))

    // Adding a new plant ID to the same tag works
    mutations.ADD_TAG_SUCCESS(state, { item: { name, plants: ['guid 2'] } })
    expect(state.tags.data).toEqual(expect.arrayContaining([
      { name, plants: ['guid', 'guid 2'] }
    ]))
  })

  it('DELETE_TAG_SUCCESS', () => {
    const state = {
      tags: {
        data: [
          {
            name: 'super-tag',
            label: 'Super tag',
            guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d',
            plants: ['guid']
          },
          {
            name: 'awesome-tag',
            label: 'Awesome tag',
            guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf',
            plants: ['guid', 'guid2']
          }
        ]
      }
    }

    // Force delete works as expected
    mutations.DELETE_TAG_SUCCESS(state, { item: {
      tag: '6e7e20bc-436e-4267-ae59-07e6686b6a2d',
      forceDelete: true
    } })
    expect(state.tags.data.length).toEqual(1)
    expect(state.tags.data.find(t => t.guid === '6e7e20bc-436e-4267-ae59-07e6686b6a2d'))
      .toBeUndefined()

    // Delete just the plant
    mutations.DELETE_TAG_SUCCESS(state, { item: {
      tag: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf',
      plant: 'guid'
    } })
    expect(state.tags.data).toEqual(expect.arrayContaining([{
      name: 'awesome-tag',
      label: 'Awesome tag',
      guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf',
      plants: ['guid2']
    }]))

    // Delete tag if no plants anymore
    mutations.DELETE_TAG_SUCCESS(state, { item: {
      tag: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf',
      plant: 'guid2'
    } })
    expect(state.tags.data.length).toEqual(0)
    expect(state.tags.data.find(t => t.guid === '6e7e20bc-436e-4267-ae59-07e6686b6a2d'))
      .toBeUndefined()
  })

  it('UPDATE_TAG', () => {
    const state = {
      tags: {
        data: [{
          name: 'super-tag',
          label: 'Super tag',
          guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d'
        }]
      }
    }
    mutations.UPDATE_TAG(state, {
      item: {
        guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d',
        name: 'awesome-tag',
        label: 'Awesome tag'
      }
    })
    expect(state.tags.data).toEqual(expect.arrayContaining([{
      name: 'awesome-tag',
      label: 'Awesome tag',
      guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d'
    }]))
  })
})

describe('store/mutations/version.js', () => {
  it('LOAD_VERSION', () => {
    const state = {
      firstTimeUser: false,
      version: undefined
    }
    mutations.LOAD_VERSION(state, {})
    expect(state.firstTimeUser).toBe(true)
    mutations.LOAD_VERSION(state, { version: '1.0.0' })
    expect(state.version).toEqual('1.0.0')
    mutations.LOAD_VERSION(state, { version: '0.9.0' })
    expect(state.version).toEqual('1.0.0')
  })
})

describe('store/mutations/storage.js', () => {
  it('LOAD_STORAGE', () => {
    const state = {
      storage: {
        type: 'local',
        migrationMode: false
      }
    }
    mutations.LOAD_STORAGE(state, { storage: { type: 'cloud' } })
    expect(state.storage.type).toEqual('cloud')
    expect(state.storage.migrationMode).toBe(false)
  })

  it('UPDATE_STORAGE', () => {
    const state = {
      storage: {
        type: 'local',
        migrationMode: false
      }
    }
    mutations.UPDATE_STORAGE(state, { type: 'cloud' })
    expect(state.storage.type).toEqual('cloud')
    expect(state.storage.migrationMode).toBe(false)
  })

  it('DATA_MIGRATION_START, DATA_MIGRATION_FINISHED', () => {
    const state = {
      storage: {
        migrationMode: false
      }
    }
    mutations.DATA_MIGRATION_START(state)
    expect(state.storage.migrationMode).toBe(true)
    mutations.DATA_MIGRATION_FINISHED(state)
    expect(state.storage.migrationMode).toBe(false)
  })
})

describe('store/mutations/user.js', () => {
  const payload = { user: { displayName: 'Foo', email: 'foo@bar.plant', uid: '0' } }
  let defaultState

  beforeEach(() => {
    defaultState = {
      user: {
        authFromRedirect: false,
        authenticated: false,
        error: false,
        loading: false,
        name: null,
        id: null
      }
    }
  })

  it('USER_SIGNIN_PROGRESS, USER_REDIRECT_RESULT_PROGRESS, USER_AUTH_STATE_PROGRESS', () => {
    let state = defaultState
    const mutationTypes = [
      'USER_SIGNIN_PROGRESS',
      'USER_REDIRECT_RESULT_PROGRESS',
      'USER_AUTH_STATE_PROGRESS'
    ]

    for (const type of mutationTypes) {
      mutations[type](state)
      expect(state.user.authenticated).toBe(false)
      expect(state.user.loading).toBe(true)
      state = defaultState
    }
  })

  it('USER_REDIRECT_RESULT_SUCCESS, USER_AUTH_STATE_SUCCESS', () => {
    let state = defaultState
    const mutationTypes = [
      'USER_REDIRECT_RESULT_SUCCESS',
      'USER_AUTH_STATE_SUCCESS'
    ]

    for (const type of mutationTypes) {
      mutations[type](state, payload)
      expect(state.user.authenticated).toBe(true)
      expect(state.user.error).toBe(false)
      expect(state.user.loading).toBe(false)
      expect(state.user.name).toEqual(payload.user.displayName)
      expect(state.user.email).toEqual(payload.user.email)
      expect(state.user.id).toEqual(payload.user.uid)
      state = defaultState
    }
  })

  it('USER_REDIRECT_RESULT_FAILED, USER_AUTH_STATE_FAILED', () => {
    let state = defaultState
    const mutationTypes = [
      'USER_REDIRECT_RESULT_FAILED',
      'USER_AUTH_STATE_FAILED'
    ]

    for (const type of mutationTypes) {
      mutations[type](state)
      if (state.user.authenticated) {
        expect(mutations[type](state)).toBeUndefined()
      }
      expect(state.user.authenticated).toBe(false)
      expect(state.user.error).toBe(true)
      expect(state.user.loading).toBe(false)
      state = defaultState
    }
  })

  it('USER_REDIRECT_RESULT', () => {
    let state = defaultState
    mutations.USER_REDIRECT_RESULT(state)
    expect(state.user.authFromRedirect).toBe(true)
  })

  it('USER_SIGNOUT_PROGRESS', () => {
    let state = defaultState
    mutations.USER_SIGNOUT_PROGRESS(state)
    expect(state.user.loading).toBe(true)
  })

  it('USER_SIGNOUT_SUCCESS', () => {
    let state = defaultState
    mutations.USER_SIGNOUT_SUCCESS(state)
    expect(state.user.authenticated).toEqual(defaultState.user.authenticated)
    expect(state.user.error).toEqual(defaultState.user.error)
    expect(state.user.loading).toEqual(defaultState.user.loading)
    expect(state.user.name).toEqual(defaultState.user.name)
  })

  it('USER_SIGNOUT_FAILED', () => {
    let state = defaultState
    mutations.USER_SIGNOUT_FAILED(state)
    expect(state.user.error).toBe(true)
    expect(state.user.loading).toBe(false)
  })
})
