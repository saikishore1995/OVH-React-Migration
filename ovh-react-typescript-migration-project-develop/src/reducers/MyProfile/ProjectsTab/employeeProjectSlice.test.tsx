import employeeProjectSlice from './employeeProjectSlice'

describe('Employee Projects Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeProjectSlice(initialState, action)
    expect(result).toEqual({})
  })
})
