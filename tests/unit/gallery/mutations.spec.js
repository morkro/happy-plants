import mutations from '@/app/gallery/store/mutations'

describe('app/gallery/mutations/add.js', () => {
  it('ADD_GALLERY_ITEM_FAILURE', () => {
    const state = {
      gallery: {
        error: false
      }
    }
    mutations.ADD_GALLERY_ITEM_FAILURE(state)
    expect(state.gallery.error).toEqual(true)
  })
})
