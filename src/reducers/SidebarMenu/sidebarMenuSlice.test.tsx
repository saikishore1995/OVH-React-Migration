import sidebarMenuSliceReducer from './sidebarMenuSlice'

describe('Sidebar Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = sidebarMenuSliceReducer(initialState, action)
    expect(result).toEqual({})
  })
})
