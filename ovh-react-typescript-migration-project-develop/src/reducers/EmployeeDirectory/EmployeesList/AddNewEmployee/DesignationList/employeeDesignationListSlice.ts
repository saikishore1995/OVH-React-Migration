import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  EmployeeDepartment,
  DesignationListSliceState,
  EmployeeDesignation,
} from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../../../stateStore'
import employeeDesignationListApi from '../../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListApi'

const getEmployeeDepartments = createAsyncThunk(
  'designationList/getEmployeeDepartments',
  async (_, thunkApi) => {
    try {
      return await employeeDesignationListApi.getEmployeeDepartments()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeDesignations = createAsyncThunk<
  EmployeeDesignation[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'designationList/getEmployeeDesignations',
  async (deptId: number, thunkApi) => {
    try {
      return await employeeDesignationListApi.getEmployeeDesignations(deptId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addEmployeeDesignation = createAsyncThunk<
  EmployeeDesignation[] | undefined,
  EmployeeDesignation,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'designationList/addEmployeeDesignation',
  async ({ departmentId, name }: EmployeeDesignation, thunkApi) => {
    try {
      return await employeeDesignationListApi.addEmployeeDesignation({
        departmentId,
        name,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteEmployeeDesignation = createAsyncThunk<
  EmployeeDesignation[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'designationList/deleteEmployeeDesignation',
  async (designationId, thunkApi) => {
    try {
      return await employeeDesignationListApi.deleteEmployeeDesignation(
        designationId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialDesignationState: DesignationListSliceState = {
  employeeDepartments: [],
  refreshList: false,
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeDesignations: [],
}

const employeeDesignationListSlice = createSlice({
  name: 'designationList',
  initialState: initialDesignationState,
  reducers: {
    clearEmployeeDesignations: (state) => {
      state.employeeDesignations = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeDepartments.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeDepartments = action.payload as EmployeeDepartment[]
      })
      .addCase(getEmployeeDesignations.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeDesignations = action.payload as EmployeeDesignation[]
      })
      .addMatcher(
        isAnyOf(
          addEmployeeDesignation.fulfilled,
          deleteEmployeeDesignation.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeDepartments.pending,
          getEmployeeDesignations.pending,
          addEmployeeDesignation.pending,
          deleteEmployeeDesignation.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeDepartments.rejected,
          getEmployeeDesignations.rejected,
          addEmployeeDesignation.rejected,
          deleteEmployeeDesignation.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeDesignationList.isLoading
const refreshList = (state: RootState): boolean =>
  state.employeeDesignationList.refreshList

const employeeDepartments = (state: RootState): EmployeeDepartment[] =>
  state.employeeDesignationList.employeeDepartments

const employeeDesignations = (state: RootState): EmployeeDesignation[] =>
  state.employeeDesignationList.employeeDesignations

const designationListThunk = {
  getEmployeeDepartments,
  getEmployeeDesignations,
  addEmployeeDesignation,
  deleteEmployeeDesignation,
}

const employeeDesignationListSelectors = {
  isLoading,
  refreshList,
  employeeDepartments,
  employeeDesignations,
}

export const employeeDesignationListService = {
  ...designationListThunk,
  actions: employeeDesignationListSlice.actions,
  selectors: employeeDesignationListSelectors,
}

export default employeeDesignationListSlice.reducer
