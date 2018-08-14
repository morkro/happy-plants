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

describe('store/mutations/plants.js', () => {
  // it('LOAD_PLANTS', () => {
  //   const state = {
  //     plants: []
  //   }
  //   mutations.LOAD_PLANTS(state, {})
  //   expect(state).toBe()
  // })
  //
  // it('LOAD_PLANT_ITEM', () => {
  //   const state = {
  //     plants: []
  //   }
  //   mutations.LOAD_PLANT_ITEM(state, {})
  //   expect(state).toBe()
  // })

  it('ADD_PLANT', () => {
    const then = new Date('2018-06-25').getTime()
    const now = Date.now()
    const state = {
      plants: [{ name: 'Bar', created: then }],
      settings: {
        orderBy: 'alphabetical'
      }
    }

    // Add and sort alphabetical
    mutations.ADD_PLANT(state, { item: { name: 'Foo', created: now } })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { name: 'Bar', created: then },
      { name: 'Foo', created: now }
    ]))

    // Add and sort by date (latest)
    state.settings.orderBy = 'latest'
    state.plants.data = [{ name: 'Bar', created: then }]
    mutations.ADD_PLANT(state, { item: { name: 'Foo', created: now } })
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { name: 'Foo', created: now },
      { name: 'Bar', created: then }
    ]))
  })

  it('DELETE_PLANTS', () => {
    const state = {
      plants: [
        { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
        { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
        { guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' },
        { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
      ]
    }
    mutations.DELETE_PLANTS(state, { items: [
      { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
      { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
    ]})
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
      { guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' }
    ]))
  })

  it('UPDATE_PLANT', () => {
    const state = {
      plants: [{
        name: 'Bar',
        guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
      }]
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
      tags: []
    }
    expect(mutations.LOAD_TAGS(state, {})).toBeUndefined()
    mutations.LOAD_TAGS(state, { tags: [1, 2, 3] })
    expect(state.tags.data.length).toBeGreaterThan(1)
    expect(state.tags.data).toEqual(expect.arrayContaining([1, 2, 3]))
  })

  it('ADD_TAG', () => {
    const state = {
      tags: []
    }
    const name = 'Foo tag'

    // Adding a new tag works as expected
    mutations.ADD_TAG(state, { item: { name, plants: ['guid'] } })
    expect(state.tags.data).toEqual(expect.arrayContaining([{ name, plants: ['guid'] }]))

    // Adding the exact same tag again just returns and doesn't mutate
    expect(mutations.ADD_TAG(state, { item: { name, plants: ['guid'] } })).toBe(undefined)
    expect(state.tags.data).toEqual(expect.arrayContaining([{ name, plants: ['guid'] }]))

    // Adding a new plant ID to the same tag works
    mutations.ADD_TAG(state, { item: { name, plants: ['guid 2'] } })
    expect(state.tags.data).toEqual(expect.arrayContaining([
      { name, plants: ['guid', 'guid 2'] }
    ]))
  })

  it('DELETE_TAG', () => {
    const state = {
      tags: [
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

    // Force delete works as expected
    mutations.DELETE_TAG(state, { item: {
      tag: '6e7e20bc-436e-4267-ae59-07e6686b6a2d',
      forceDelete: true
    } })
    expect(state.tags.data.length).toEqual(1)
    expect(state.tags.data.find(t => t.guid === '6e7e20bc-436e-4267-ae59-07e6686b6a2d'))
      .toBeUndefined()

    // Delete just the plant
    mutations.DELETE_TAG(state, { item: {
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
    mutations.DELETE_TAG(state, { item: {
      tag: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf',
      plant: 'guid2'
    } })
    expect(state.tags.data.length).toEqual(0)
    expect(state.tags.data.find(t => t.guid === '6e7e20bc-436e-4267-ae59-07e6686b6a2d'))
      .toBeUndefined()
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
    expect(state.tags.data).toEqual(expect.arrayContaining([{
      name: 'awesome-tag',
      label: 'Awesome tag',
      guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d'
    }]))
  })
})
