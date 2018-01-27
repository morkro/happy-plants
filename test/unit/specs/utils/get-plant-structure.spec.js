import getPlantStructure from '@/app/plant/utils/get-plant-structure'

describe('app/plant/utils/get-default-structure.js', () => {
  it('getPlantStructure() returns expected default structure', () => {
    const structure = getPlantStructure()
    expect(structure).to.deep.to.equal({
      guid: undefined,
      created: 0,
      modified: 0,
      blob: undefined,
      imageURL: '',
      name: '',
      categories: [],
      modules: []
    })
  })
})
