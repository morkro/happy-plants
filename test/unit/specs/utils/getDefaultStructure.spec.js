import getDefaultStructure from '@/utils/getDefaultStructure'

describe('getDefaultStructure()', () => {
  it('returns expected default structure', () => {
    const structure = getDefaultStructure()
    expect(structure).to.deep.equal({
      guid: undefined,
      created: 0,
      modified: 0,
      blob: undefined,
      name: '',
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
        level: 0,
        notes: ''
      },
      sun: {
        level: 0,
        notes: ''
      }
    })
  })
})
