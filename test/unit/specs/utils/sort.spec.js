import { sortByDate, sortByAlphabet } from '@/utils/sort'

describe('utils/sort.js', () => {
  const mockData = [
    { name: 'B', created: 1515003396997 },
    { name: 'C', created: 1514571396997 },
    { name: 'A', created: 1514398596997 },
    { name: 'F', created: 1514139396997 }
  ]

  it('sortByDate() works as expected', () => {
    expect(mockData.sort(sortByDate)).toEqual(expect.arrayContaining([
      { name: 'F', created: 1514139396997 },
      { name: 'A', created: 1514398596997 },
      { name: 'C', created: 1514571396997 },
      { name: 'B', created: 1515003396997 }
    ]))
  })

  it('sortByAlphabet() works as expected', () => {
    expect(mockData.sort(sortByAlphabet)).toEqual(expect.arrayContaining([
      { name: 'A', created: 1514398596997 },
      { name: 'B', created: 1515003396997 },
      { name: 'C', created: 1514571396997 },
      { name: 'F', created: 1514139396997 }
    ]))
  })
})
