import {
  Employee,
  EmployeeListApiProps,
  EmployeeListSliceState,
  EmploymentStatus,
} from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import employeeListApi from '../../../middleware/api/EmployeeDirectory/EmployeesList/employeeListApi'

const getEmployees = createAsyncThunk(
  'category/getEmployees',
  async (props: EmployeeListApiProps, thunkApi) => {
    try {
      return await employeeListApi.getEmployees(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeListState: EmployeeListSliceState = {
  employees: [],
  selectedEmploymentStatus: EmploymentStatus.active,
  listSize: 0,
  isLoading: ApiLoadingState.idle,
}

const employeeListSlice = createSlice({
  name: 'employeeList',
  initialState: initialEmployeeListState,
  reducers: {
    clearEmployeeList: (state) => {
      state.employees = []
    },
    changeSelectedEmploymentStatus: (state, action) => {
      state.selectedEmploymentStatus = action.payload as EmploymentStatus
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getEmployees.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getEmployees.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employees = action.payload.emps as Employee[]
        state.listSize = action.payload.Empsize
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeList.isLoading
const employees = (state: RootState): Employee[] => state.employeeList.employees
const listSize = (state: RootState): number => state.employeeList.listSize
const selectedEmploymentStatus = (state: RootState): EmploymentStatus =>
  state.employeeList.selectedEmploymentStatus

const employeeListThunk = {
  getEmployees,
}

const employeeListSelectors = {
  isLoading,
  employees,
  listSize,
  selectedEmploymentStatus,
}

export const employeeListService = {
  ...employeeListThunk,
  actions: employeeListSlice.actions,
  selectors: employeeListSelectors,
}

export default employeeListSlice.reducer
