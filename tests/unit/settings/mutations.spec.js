import mutations from '@/app/settings/store/mutations'

describe('app/settings/mutations.js', () => {
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
