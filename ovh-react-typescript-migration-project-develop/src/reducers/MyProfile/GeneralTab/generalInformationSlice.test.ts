import employeeGeneralInformationSlice from './generalInformationSlice'

describe('General Information Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeGeneralInformationSlice(initialState, action)
    expect(result).toEqual({})
  })
})
