import qualificationSlice from './employeeQualificationSlice'

describe('Qualification Section Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = qualificationSlice(initialState, action)
    expect(result).toEqual({})
  })
})
