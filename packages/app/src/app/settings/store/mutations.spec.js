import mutations from '@/app/settings/store/mutations'

describe('app/settings/mutations/data.js', () => {
  it('DELETE_ALL_DATA', () => {
    const state = {
      updated: new Date('2018-06-25').getTime(),
      tags: [
        { label: 'tag' },
        { label: 'super-tag' }
      ],
      plants: [
        { name: 'Foo' },
        { name: 'Bar' }
      ]
    }
    const now = Date.now()

    mutations.DELETE_ALL_DATA(state, { updated: now })
    expect(state.updated).toEqual(now)
    expect(state.tags.data).toEqual([])
    expect(state.plants.data).toEqual([])
  })

  it('IMPORT_PLANTS', () => {
    const state = {
      updated: Date.now(),
      plants: [
        { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' }
      ]
    }

    // Import type 'overwrite'
    mutations.IMPORT_PLANTS(state, {
      importType: 'overwrite',
      data: [
        { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
        { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
      ]
    })
    expect(state.plants.data).toEqual([
      { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
      { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
    ])

    // Import type 'merge'
    state.plants.data = [
      { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
      { guid: 'c05c08a7-552c-4895-a431-62455c6966df' }
    ]
    mutations.IMPORT_PLANTS(state, {
      importType: 'merge',
      data: [
        { guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' },
        { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
      ]
    })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
      { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
      { guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' },
      { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
    ]))
  })
})

describe('app/settings/mutations/tags.js', () => {
  it('IMPORT_TAGS', () => {
    const state = {
      updated: new Date('2018-06-25').getTime(),
      tags: []
    }
    const now = Date.now()

    mutations.IMPORT_TAGS(state, {
      updated: now,
      data: [
        { label: 'tag' },
        { label: 'super-tag' }
      ]
    })
    expect(state.updated).toEqual(now)
    expect(state.tags.data).toEqual(expect.arrayContaining([
      { label: 'tag' },
      { label: 'super-tag' }
    ]))
  })

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

describe('app/settings/mutations/settings.js', () => {
  it('IMPORT_SETTINGS', () => {
    const state = {
      updated: new Date('2018-06-25').getTime(),
      settings: {}
    }
    const now = Date.now()

    mutations.IMPORT_SETTINGS(state, {
      updated: now,
      data: {
        orderBy: 'latest',
        viewMode: 'grid'
      }
    })
    expect(state.updated).toEqual(now)
    expect(state.settings).toEqual(expect.objectContaining({
      orderBy: 'latest',
      viewMode: 'grid'
    }))
  })

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
