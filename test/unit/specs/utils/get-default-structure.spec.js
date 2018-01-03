import getDefaultStructure from '@/utils/get-default-structure'

describe('utils/get-default-structure.js', () => {
  it('getDefaultStructure() returns expected default structure', () => {
    const structure = getDefaultStructure()
    expect(structure).to.deep.to.equal({
      guid: undefined,
      created: 0,
      modified: 0,
      blob: undefined,
      imageURL: '',
      name: '',
      categories: [],
      componentOrder: [
        'watering',
        'sunshine',
        'seasons',
        'notes'
      ],
      seasons: [
        { month: 'January', growth: false },
        { month: 'February', growth: false },
        { month: 'March', growth: false },
        { month: 'April', growth: false },
        { month: 'Mai', growth: false },
        { month: 'June', growth: false },
        { month: 'July', growth: false },
        { month: 'August', growth: false },
        { month: 'September', growth: false },
        { month: 'October', growth: false },
        { month: 'November', growth: false },
        { month: 'December', growth: false }
      ],
      notes: '',
      watering: {
        level: 1
      },
      sunshine: {
        intensity: 1
      }
    })
  })
})
