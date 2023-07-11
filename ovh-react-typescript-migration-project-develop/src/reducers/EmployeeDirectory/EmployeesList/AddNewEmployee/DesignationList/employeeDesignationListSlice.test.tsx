import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { EmployeeDesignations } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'
import employeeDesignationListSliceReducer from './employeeDesignationListSlice'

describe('Employee Designation Slice Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeDesignationListSliceReducer(initialState, action)
    expect(result).toEqual({
      employeeDepartments: [],
      refreshList: false,
      isLoading: ApiLoadingState.idle,
      error: null,
      employeeDesignations: [],
    })
  })
})
