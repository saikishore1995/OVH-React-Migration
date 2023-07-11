import { AppDispatch, RootState } from '../../../../../stateStore'
import {
  EmployeeShiftDetails,
  ShiftConfigurationState,
} from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../../../types/commonTypes'
import shiftConfigurationApi from '../../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationApi'

// fetch employee shifts action creator
const getEmployeeShifts = createAsyncThunk<
  EmployeeShiftDetails[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('shiftConfiguration/getEmployeeShifts', async (_, thunkApi) => {
  try {
    return await shiftConfigurationApi.getEmployeeShifts()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

// create employee time slot action creator
const createEmployeeTimeSlot = createAsyncThunk<
  number | undefined,
  EmployeeShiftDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'shiftConfiguration/createEmployeeTimeSlot',
  async (employeeShiftDetails, thunkApi) => {
    try {
      return await shiftConfigurationApi.createEmployeeTimeSlot(
        employeeShiftDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

// update employee shift detail action creator
const updateEmployeeShiftDetail = createAsyncThunk<
  number | undefined,
  EmployeeShiftDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'shiftConfiguration/updateEmployeeShiftDetail',
  async (employeeShiftDetails, thunkApi) => {
    try {
      return await shiftConfigurationApi.updateEmployeeShiftDetail(
        employeeShiftDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
// delete employee shift detail action creator
const deleteEmployeeShiftDetail = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('shiftConfiguration/deleteEmployeeShiftDetail', async (shiftId, thunkApi) => {
  try {
    return await shiftConfigurationApi.deleteEmployeeShiftDetail(shiftId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialShiftConfigurationState: ShiftConfigurationState = {
  employeeShifts: [],
  isLoading: ApiLoadingState.idle,
}

const shiftConfigurationSlice = createSlice({
  name: 'shiftConfiguration',
  initialState: initialShiftConfigurationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeShifts.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeShifts = action.payload as EmployeeShiftDetails[]
      })
      .addMatcher(
        isAnyOf(
          createEmployeeTimeSlot.fulfilled,
          updateEmployeeShiftDetail.fulfilled,
          deleteEmployeeShiftDetail.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeShifts.pending,
          createEmployeeTimeSlot.pending,
          updateEmployeeShiftDetail.pending,
          deleteEmployeeShiftDetail.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeShifts.rejected,
          createEmployeeTimeSlot.rejected,
          updateEmployeeShiftDetail.rejected,
          deleteEmployeeShiftDetail.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const employeeShifts = (state: RootState): EmployeeShiftDetails[] =>
  state.shiftConfiguration.employeeShifts

export const shiftConfigurationThunk = {
  getEmployeeShifts,
  createEmployeeTimeSlot,
  updateEmployeeShiftDetail,
  deleteEmployeeShiftDetail,
}

export const shiftConfigurationSelectors = {
  employeeShifts,
}

export const shiftConfigurationService = {
  ...shiftConfigurationThunk,
  actions: shiftConfigurationSlice.actions,
  selectors: shiftConfigurationSelectors,
}

export default shiftConfigurationSlice.reducer
