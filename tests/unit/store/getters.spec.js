import getters from '@/store/getters'

describe('store/getters.js', () => {
  it('getPlantTags()', () => {
    const state = {
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
      }
    }
    const tags = getters.getPlantTags(state)('86636955-969a-41e7-9fa2-4a5fdefc4d97')
    expect(tags).toEqual(expect.arrayContaining([tags[0]]))
  })
})
