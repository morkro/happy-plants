import getters from '@/store/getters'

const localState = {
  tags: {
    data: [
      {
        guid: '91a85345-c108-43fd-ace5-97831c900ebc',
        plants: [
          '86636955-969a-41e7-9fa2-4a5fdefc4d97',
          'c05c08a7-552c-4895-a431-62455c6966df',
          '526a9181-f84a-45c2-9a0a-7654979277c9'
        ]
      },
      {
        guid: 'f6d4f18b-0642-4f33-9999-245058e09da',
        plants: [
          '526a9181-f84a-45c2-9a0a-7654979277c9'
        ]
      }
    ]
  },
  plants: {
    data: [
      {
        'blob': null,
        'created': 1510936448969,
        'guid': '9ef74253-e66f-423b-8107-130975070d5b',
        'imageURL': '',
        'modified': 1529960811305,
        'modules': [],
        'name': '× Citrofortunella microcarpa',
        'tags': []
      },
      {
        'blob': null,
        'created': 1510936811778,
        'guid': 'c8e37088-5d0b-4887-979c-8e172a23de53',
        'imageURL': '',
        'modified': 1530101431198,
        'modules': [],
        'name': 'Adenium obesum',
        'tags': []
      }
    ]
  }
}

describe('store/getters.js', () => {
  it('getPlantTags()', () => {
    const tags = getters.getPlantTags(localState)('86636955-969a-41e7-9fa2-4a5fdefc4d97')
    expect(tags).toEqual(expect.arrayContaining([tags[0]]))
  })

  it('getPlantItem()', () => {
    const item = getters.getPlantItem(localState)('9ef74253-e66f-423b-8107-130975070d5b')
    expect(item).toEqual(expect.objectContaining(localState.plants.data[0]))
  })
})
