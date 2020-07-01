import { formatDate } from '@/utils/vueFormatDate'

describe('utils/vueFormatDate.ts', () => {
  it('returns correctly formatted date', () => {
    const today = new Date(2018, 8, 21)
    expect(formatDate(today)).toEqual('9/21/2018')
  })
})
