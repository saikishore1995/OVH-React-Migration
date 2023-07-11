import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeReportee,
  ReporteesState,
  EmployeeReporteesKRA,
  EmployeeReporteesKPI,
} from '../../../types/MyProfile/ReporteesTab/employeeReporteesType'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeReporteesApi from '../../../middleware/api/MyProfile/ReporteesTab/employeeReporteesApi'

const initialEmployeeReporteesState: ReporteesState = {
  employeeReportees: [],
  employeeReporteesKRAs: [],
  employeeReporteesKPIs: [],
  isLoading: ApiLoadingState.idle,
  error: 0,
}

const getEmployeeReportees = createAsyncThunk<
  EmployeeReportee[] | undefined,
  number | string | undefined,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReportees/getEmployeeReportees',
  async (empID: number | string | undefined, thunkApi) => {
    try {
      return await employeeReporteesApi.getEmployeeReportees(empID)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeReporteesKRAs = createAsyncThunk<
  EmployeeReporteesKRA[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReportees/getEmployeeReporteesKRAs',
  async (personId: string | number, thunkApi) => {
    try {
      return await employeeReporteesApi.getEmployeeReporteesKRAs(personId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeReporteesKPIs = createAsyncThunk<
  EmployeeReporteesKPI[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReportees/getEmployeeReporteesKPIs',
  async (kraId: string | number, thunkApi) => {
    try {
      return await employeeReporteesApi.getEmployeeReporteesKPIs(kraId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeReporteesSlice = createSlice({
  name: 'employeeReportees',
  initialState: initialEmployeeReporteesState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeReportees.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeReportees = action.payload as EmployeeReportee[]
    })
    builder.addCase(getEmployeeReporteesKRAs.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.employeeReporteesKRAs = action.payload as EmployeeReporteesKRA[]
    })
    builder
      .addCase(getEmployeeReporteesKPIs.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.loading
        state.employeeReporteesKPIs = action.payload as EmployeeReporteesKPI[]
      })
      .addMatcher(
        isAnyOf(
          getEmployeeReportees.pending,
          getEmployeeReporteesKRAs.pending,
          getEmployeeReporteesKPIs.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const employeeReportees = (state: RootState): EmployeeReportee[] =>
  state.employeeReportees.employeeReportees

const employeeReporteesKRAs = (state: RootState): EmployeeReporteesKRA[] =>
  state.employeeReportees.employeeReporteesKRAs

const employeeReporteesKPIs = (state: RootState): EmployeeReporteesKPI[] =>
  state.employeeReportees.employeeReporteesKPIs

const employeeReporteesThunk = {
  getEmployeeReportees,
  getEmployeeReporteesKRAs,
  getEmployeeReporteesKPIs,
}

const employeeReporteesSelectors = {
  employeeReportees,
  employeeReporteesKRAs,
  employeeReporteesKPIs,
}

export const employeeReporteesService = {
  ...employeeReporteesThunk,
  actions: employeeReporteesSlice.actions,
  selectors: employeeReporteesSelectors,
}
export default employeeReporteesSlice.reducer
