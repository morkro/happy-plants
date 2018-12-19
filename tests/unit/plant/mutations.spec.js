import mutations, { updatePlantModule } from '@/app/plant/store/mutations'
import getPlantStructure from '@/app/plant/utils/get-plant-structure'
import getPlantModules from '@/app/plant/utils/get-plant-modules'

describe('app/plant/mutations.js', () => {
  const then = new Date('2018-06-25').getTime()
  const now = Date.now()

  it('updatePlantModule()', () => {
    const state = {
      updated: then,
      selected: {
        modified: then,
        modules: getPlantModules()
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
    expect(state.selected.modules[0].value).toEqual(expect.objectContaining(expected))
  })

  it('UPDATE_PLANT_MODULES', () => {
    const state = {
      updated: then,
      selected: {
        modified: then,
        modules: getPlantModules()
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
    expect(state.selected.modules.length).toBe(1)
    expect(state.selected.modules)
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

  it('RESET_SELECTED_PLANT', () => {
    const defaultStructure = getPlantStructure()
    const state = {
      selected: {
        modified: then,
        name: 'Cool plant',
        guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
      }
    }
    mutations.RESET_SELECTED_PLANT(state, { defaultState: defaultStructure })
    expect(state.selected).toEqual(expect.objectContaining(defaultStructure))
  })

  it('UPDATE_PLANT_NAME', () => {
    const state = {
      updated: then,
      selected: {
        modified: then,
        name: 'Cool plant',
        guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
      }
    }

    mutations.UPDATE_PLANT_NAME(state, {
      updated: now,
      item: {
        name: 'Super cool plant'
      }
    })
    expect(state.updated).toEqual(now)
    expect(state.selected).toEqual(expect.objectContaining({
      modified: now,
      name: 'Super cool plant',
      guid: '526a9181-f84a-45c2-9a0a-7654979277c9'
    }))
  })

  it('UPDATE_PLANT_PHOTO', () => {
    const state = {
      updated: then,
      selected: {
        modified: now,
        imageURL: '',
        blob: null
      }
    }
    mutations.UPDATE_PLANT_PHOTO(state, {
      updated: now,
      item: {
        imageURL: 'data://foo',
        blob: true
      }
    })
    expect(state.selected.imageURL).toEqual('data://foo')
    expect(state.selected.blob).toBe(true)
  })

  it('UPDATE_PLANT_TAGS', () => {
    const state = {
      updated: then,
      selected: {
        tags: []
      }
    }

    mutations.UPDATE_PLANT_TAGS(state, { updated: now, item: { show: false } })
    expect(state.updated).toEqual(now)
    expect(state.selected.tags).toBe(false)

    mutations.UPDATE_PLANT_TAGS(state, { updated: now, item: { show: true } })
    expect(state.updated).toEqual(now)
    expect(state.selected.tags).toEqual([])
  })
})
