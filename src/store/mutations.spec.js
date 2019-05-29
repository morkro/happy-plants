import mutations from '@/store/mutations'

describe('store/mutations/appheader.js', () => {
  it('UPDATE_APPHEADER', () => {
    const state = {
      appheader: {
        transparent: false,
        title: '',
        backBtn: true
      }
    }
    mutations.UPDATE_APPHEADER(state, {
      transparent: true,
      title: 'Happy Plants',
      backBtn: false
    })
    expect(state.appheader.transparent).toBe(true)
    expect(state.appheader.title).toEqual('Happy Plants')
    expect(state.appheader.backBtn).toBe(false)
  })
})

describe('store/mutations/notifications.js', () => {
  it('SHOW_NOTIFICATION', () => {
    const state = {
      notification: {
        message: false
      }
    }
    mutations.SHOW_NOTIFICATION(state, { message: 'Show notification' })
    expect(state.notification.message).toEqual('Show notification')
  })

  it('HIDE_NOTIFICATION', () => {
    const state = {
      notification: {
        message: 'Message'
      }
    }
    mutations.HIDE_NOTIFICATION(state)
    expect(state.notification.message).toBe(false)
  })
})

describe('store/mutations/version.js', () => {
  it('LOAD_VERSION', () => {
    const state = {
      version: undefined
    }
    mutations.LOAD_VERSION(state, { version: '1.0.0' })
    expect(state.version).toEqual('1.0.0')
    mutations.LOAD_VERSION(state, { version: '0.9.0' })
    expect(state.version).toEqual('1.0.0')
  })
})
