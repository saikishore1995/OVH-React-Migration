import { ApiLoadingState } from '../../../../middleware/api/apiList'
import certificateTypeSliceReducer from './certificateTypeSlice'

describe('Certificate Type Slice Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = certificateTypeSliceReducer(initialState, action)
    expect(result).toEqual({
      certificateTypes: [],
      isLoading: ApiLoadingState.idle,
      error: null,
      editCertificateType: {
        certificateType: '',
        id: 0,
        technologyId: 0,
        technologyName: '',
      },
    })
  })
})
