import mutations from '@/app/user/store/mutations'

describe('store/mutations/user.js', () => {
  const payload = { user: { displayName: 'Foo', email: 'foo@bar.plant', uid: '0' } }
  let defaultState

  beforeEach(() => {
    defaultState = {
      user: {
        authFromRedirect: false,
        authenticated: false,
        error: false,
        loading: false,
        name: null,
        id: null
      }
    }
  })

  it('USER_SIGNIN_PROGRESS, USER_REDIRECT_RESULT_PROGRESS, USER_AUTH_STATE_PROGRESS', () => {
    let state = defaultState
    const mutationTypes = [
      'USER_SIGNIN_PROGRESS',
      'USER_REDIRECT_RESULT_PROGRESS',
      'USER_AUTH_STATE_PROGRESS'
    ]

    for (const type of mutationTypes) {
      mutations[type](state)
      expect(state.user.authenticated).toBe(false)
      expect(state.user.loading).toBe(true)
      state = defaultState
    }
  })

  it('USER_REDIRECT_RESULT_SUCCESS, USER_AUTH_STATE_SUCCESS', () => {
    let state = defaultState
    const mutationTypes = [
      'USER_REDIRECT_RESULT_SUCCESS',
      'USER_AUTH_STATE_SUCCESS'
    ]

    for (const type of mutationTypes) {
      mutations[type](state, payload)
      expect(state.user.authenticated).toBe(true)
      expect(state.user.error).toBe(false)
      expect(state.user.loading).toBe(false)
      expect(state.user.name).toEqual(payload.user.displayName)
      expect(state.user.email).toEqual(payload.user.email)
      expect(state.user.id).toEqual(payload.user.uid)
      state = defaultState
    }
  })

  it('USER_REDIRECT_RESULT_FAILED, USER_AUTH_STATE_FAILED', () => {
    let state = defaultState
    const mutationTypes = [
      'USER_REDIRECT_RESULT_FAILED',
      'USER_AUTH_STATE_FAILED'
    ]

    for (const type of mutationTypes) {
      mutations[type](state)
      if (state.user.authenticated) {
        expect(mutations[type](state)).toBeUndefined()
      }
      expect(state.user.authenticated).toBe(false)
      expect(state.user.error).toBe(true)
      expect(state.user.loading).toBe(false)
      state = defaultState
    }
  })

  it('USER_REDIRECT_RESULT', () => {
    let state = defaultState
    mutations.USER_REDIRECT_RESULT(state)
    expect(state.user.authFromRedirect).toBe(true)
  })

  it('USER_SIGNOUT_PROGRESS', () => {
    let state = defaultState
    mutations.USER_SIGNOUT_PROGRESS(state)
    expect(state.user.loading).toBe(true)
  })

  it('USER_SIGNOUT_SUCCESS', () => {
    let state = defaultState
    mutations.USER_SIGNOUT_SUCCESS(state)
    expect(state.user.authenticated).toEqual(defaultState.user.authenticated)
    expect(state.user.error).toEqual(defaultState.user.error)
    expect(state.user.loading).toEqual(defaultState.user.loading)
    expect(state.user.name).toEqual(defaultState.user.name)
  })

  it('USER_SIGNOUT_FAILED', () => {
    let state = defaultState
    mutations.USER_SIGNOUT_FAILED(state)
    expect(state.user.error).toBe(true)
    expect(state.user.loading).toBe(false)
  })
})
