import {
  getGalleryStructure,
  getGalleryItemStructure
} from '@/app/gallery/utils/get-gallery-structure'

describe('app/gallery/utils/get-gallery-structure.js', () => {
  it('getGalleryStructure', () => {
    let structure = getGalleryStructure()
    expect(typeof structure).toEqual('object')
    expect(structure.guid).toEqual(null)
    structure = getGalleryStructure('123')
    expect(structure.guid).toEqual('123')
  })

  it('getGalleryItemStructure', () => {
    expect(typeof getGalleryItemStructure()).toEqual('object')
  })
})
