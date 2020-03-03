import mutations from '@/app/plant/store/mutations'
import { updatePlantModule } from '@/app/plant/store/mutations/update'
import getPlantStructure from '@/app/plant/utils/get-plant-structure'
import getPlantModules from '@/app/plant/utils/get-plant-modules'

describe('app/plant/mutations', () => {
  const then = new Date('2018-06-25').getTime()
  const now = Date.now()

  it('RESET_SELECTED_PLANT', () => {
    const defaultStructure = getPlantStructure()
    const state = {
      plants: {
        selected: {
          modified: then,
          name: 'Cool plant',
          guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
        }
      }
    }
    mutations.RESET_SELECTED_PLANT(state, { defaultState: defaultStructure })
    expect(state.plants.selected).toEqual(expect.objectContaining(defaultStructure))
  })

  it('UPDATE_PLANT_NAME', () => {
    const state = {
      updated: then,
      plants: {
        selected: {
          modified: then,
          name: 'Cool plant',
          guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
        }
      }
    }

    mutations.UPDATE_PLANT_NAME(state, {
      updated: now,
      item: {
        name: 'Super cool plant'
      }
    })
    expect(state.updated).toEqual(now)
    expect(state.plants.selected).toEqual(expect.objectContaining({
      modified: now,
      name: 'Super cool plant',
      guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
    }))
  })

  it('UPDATE_PLANT_PHOTO', () => {
    const state = {
      updated: then,
      plants: {
        selected: {
          modified: now,
          imageURL: '',
          blob: null
        }
      }
    }
    mutations.UPDATE_PLANT_PHOTO(state, {
      updated: now,
      item: {
        imageURL: 'data://foo',
        blob: true
      }
    })
    expect(state.plants.selected.imageURL).toEqual('data://foo')
    expect(state.plants.selected.blob).toBe(true)
  })

  it('UPDATE_PLANT_TAGS', () => {
    const state = {
      updated: then,
      plants: {
        selected: {
          tags: []
        }
      }
    }

    mutations.UPDATE_PLANT_TAGS(state, { updated: now, item: { show: false } })
    expect(state.updated).toEqual(now)
    expect(state.plants.selected.tags).toBe(false)

    mutations.UPDATE_PLANT_TAGS(state, { updated: now, item: { show: true } })
    expect(state.updated).toEqual(now)
    expect(state.plants.selected.tags).toEqual([])
  })
})

describe('app/plant/mutations/add.js', () => {
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
})

describe('app/plant/mutations/delete.js', () => {
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
    mutations.DELETE_PLANTS_SUCCESS(state, {
 items: [
      { guid: 'c05c08a7-552c-4895-a431-62455c6966df' },
      { guid: 'c0eb2d07-8504-40cf-ad63-efe3fc86fdbf' }
    ]
})
    expect(state.plants.data).toEqual(expect.arrayContaining([
      { guid: '526a9181-f84a-45c2-9a0a-7654979277c9' },
      { guid: '6e7e20bc-436e-4267-ae59-07e6686b6a2d' }
    ]))
  })
})

describe('app/plant/mutations/load.js', () => {
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
    const state = defaultState
    mutations.LOAD_PLANTS_TOTAL_COUNT(state, { total: 10 })
    expect(state.plants.loading).toBe(true)
    expect(state.plants.data).toHaveLength(10)
  })

  it('LOAD_PLANTS_PROGRESS', () => {
    const state = defaultState
    mutations.LOAD_PLANTS_PROGRESS(state)
    expect(state.plants.loading).toBe(true)
  })

  it('LOAD_PLANTS_FAILURE', () => {
    const state = defaultState
    mutations.LOAD_PLANTS_FAILURE(state)
    expect(state.plants.loading).toBe(false)
    expect(state.plants.finished).toBe(true)
    expect(state.plants.error).toBe(true)
  })
})

describe('app/plant/mutations/update.js', () => {
  const then = new Date('2018-06-25').getTime()
  const now = Date.now()

  it('UPDATE_PLANT', () => {
    const state = {
      plants: {
        data: [{
          name: 'Bar',
          guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
        }]
      }
    }
    mutations.UPDATE_PLANT(state, {
 plant: {
      name: 'New name',
      guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
    }
})
    expect(state.plants.data).toEqual(expect.arrayContaining([{
      name: 'New name',
      guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
    }]))
  })

  it('updatePlantModule()', () => {
    const state = {
      updated: then,
      plants: {
        selected: {
          modified: then,
          modules: getPlantModules()
        }
      }
    }
    const moduleType = 'watering'
    const expected = {
      amount: 2,
      frequency: 'daily'
    }

    updatePlantModule(moduleType, ['amount', 'frequency'], state, {
      updated: now,
      item: {
        [moduleType]: expected
      }
    })
    expect(state.plants.selected.modules[0].value).toEqual(expect.objectContaining(expected))
  })

  it('UPDATE_PLANT_MODULES', () => {
    const state = {
      updated: then,
      plants: {
        selected: {
          modified: then,
          modules: getPlantModules()
        }
      }
    }
    const expected = getPlantModules().map((module, index) => {
      if (index === 2) module.selected = true
      return module
    })

    mutations.UPDATE_PLANT_MODULES(state, {
      updated: now,
      item: expected
    })
    expect(state.plants.selected.modules.length).toBe(1)
    expect(state.plants.selected.modules)
      .toEqual(expect.arrayContaining(
        expected
          .filter(m => m.selected)
          .map(({ selected, ...rest }) => rest)))
  })

  // it('UPDATE_MODULE_SEASONS', () => {
  //   const state = {
  //     selected: {}
  //   }
  //   mutations.UPDATE_MODULE_SEASONS(state, {})
  //   expect()
  // })
})
