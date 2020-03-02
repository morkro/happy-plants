import { formatDate } from '@/utils/vue-format-date'

describe('utils/vue-format-date.js', () => {
  it('returns correctly formatted date', () => {
    const today = new Date(2018, 8, 21)
    expect(formatDate(today)).toEqual('9/21/2018')
  })
})
