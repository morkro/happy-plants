import mutations from '@/app/overview/store/mutations'

describe('app/overview/mutations.js', () => {
  const then = new Date('2018-06-25').getTime()
  const now = Date.now()

  it('UPDATE_VIEWMODE', () => {
    const state = {
      plants: [
        { name: 'Foo', created: now },
        { name: 'Bar', created: then }
      ],
      settings: {
        viewMode: 'grid',
        orderBy: 'latest'
      }
    }
    mutations.UPDATE_VIEWMODE(state, {
      viewMode: 'list',
      orderBy: 'alphabetical'
    })
    expect(state.settings.viewMode).toEqual('list')
    expect(state.settings.orderBy).toEqual('alphabetical')
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { name: 'Bar', created: then },
      { name: 'Foo', created: now }
    ]))
  })

  it('UPDATE_PLANT_OVERVIEW', () => {
    const state = {
      plants: [
        { name: 'Baz', created: now, guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
        { name: 'Foo', created: now, guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
        { name: 'Bar', created: then, guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' }
      ],
      settings: {
        viewMode: 'grid',
        orderBy: 'latest'
      }
    }

    mutations.UPDATE_PLANT_OVERVIEW(state, {
      item: {
        guid: 'c05c08a7-552c-4895-a431-62455c6966df',
        name: 'New foo'
      }
    })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { name: 'Baz', created: now, guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
      { name: 'New foo', created: now, guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
      { name: 'Bar', created: then, guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' }
    ]))

    // If plant doesn't exist, do nothing
    mutations.UPDATE_PLANT_OVERVIEW(state, { item: { guid: 'guid-doesnt-exist' } })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { name: 'Baz', created: now, guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
      { name: 'New foo', created: now, guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
      { name: 'Bar', created: then, guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' }
    ]))
  })
})
