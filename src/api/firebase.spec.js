import { storagePath } from '@/api/firebase'

describe('api/firebase.js', () => {
  it('storagePath', () => {
    const path = [
      ['users', 'foo'],
      ['plants', 'guid'],
      ['gallery', 'guid2']
    ]
    expect(storagePath(path)).toEqual('users/foo/plants/guid/gallery/guid2')
  })
})
