import { AppDispatch, RootState } from '../../../../stateStore'
import {
  EmployeeQualification,
  EmployeeQualificationSliceState,
  PostGraduationAndGraduationList,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import employeeQualificationsApi from '../../../../middleware/api/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationsApi'

const initialQualificationState = {} as EmployeeQualificationSliceState

const getEmployeeQualifications = createAsyncThunk<
  EmployeeQualification | undefined,
  string | number | undefined,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getEmployeeQualifications',
  async (employeeId: string | number | undefined, thunkApi) => {
    try {
      return await employeeQualificationsApi.getEmployeeQualifications(
        employeeId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addEmployeeQualifications = createAsyncThunk<
  EmployeeQualification | undefined,
  EmployeeQualification,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/addEmployeeQualifications',
  async (addQualification: EmployeeQualification, thunkApi) => {
    try {
      return await employeeQualificationsApi.addEmployeeQualifications(
        addQualification,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEmployeeQualifications = createAsyncThunk<
  EmployeeQualification | undefined,
  EmployeeQualification,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/updateEmployeeQualifications',
  async (addQualification: EmployeeQualification, thunkApi) => {
    try {
      return await employeeQualificationsApi.updateEmployeeQualifications(
        addQualification,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getPgLookUpAndGraduationLookUpItems = createAsyncThunk<
  PostGraduationAndGraduationList | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getPgLookUpAndGraduationLookUpItems',
  async (_, thunkApi) => {
    try {
      return await employeeQualificationsApi.getPgLookUpAndGraduationLookUpItems()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeQualificationsSlice = createSlice({
  name: 'employeeQualifications',
  initialState: initialQualificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getPgLookUpAndGraduationLookUpItems.fulfilled,
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.pgLookUpAndGraduationLookUpDetails =
            action.payload as PostGraduationAndGraduationList
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeQualifications.pending,
          updateEmployeeQualifications.pending,
          addEmployeeQualifications.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeQualifications.fulfilled,
          updateEmployeeQualifications.fulfilled,
          addEmployeeQualifications.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.qualificationDetails = action.payload as EmployeeQualification
        },
      )
      .addMatcher(
        isAnyOf(
          getPgLookUpAndGraduationLookUpItems.rejected,
          getEmployeeQualifications.rejected,
          updateEmployeeQualifications.rejected,
          addEmployeeQualifications.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeQualificationsDetails.isLoading

const employeeQualifications = (state: RootState): EmployeeQualification =>
  state.employeeQualificationsDetails.qualificationDetails

export const employeeQualificationsThunk = {
  getPgLookUpAndGraduationLookUpItems,
  getEmployeeQualifications,
  updateEmployeeQualifications,
  addEmployeeQualifications,
}

export const employeeQualificationSelectors = {
  isLoading,
  employeeQualifications,
}

export const employeeQualificationService = {
  ...employeeQualificationsThunk,
  actions: employeeQualificationsSlice.actions,
  selectors: employeeQualificationSelectors,
}
export default employeeQualificationsSlice.reducer
