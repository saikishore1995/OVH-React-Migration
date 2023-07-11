import { AppDispatch, RootState } from '../../../stateStore'

import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import {
  EmployeeProjects,
  EmployeeProjectsSliceState,
  ProjectDetails,
} from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import projectsTabApi from '../../../middleware/api/MyProfile/ProjectsTab/projectsTabApi'

const initialProjectsState = {} as EmployeeProjectsSliceState

const getEmployeeProjects = createAsyncThunk<
  EmployeeProjects | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeProjects/getEmployeeProjects',
  async (employeeId: string, thunkApi) => {
    try {
      return await projectsTabApi.getEmployeeProjects(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProjectDetails = createAsyncThunk<
  ProjectDetails[] | unknown,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeProjects/getProjectDetails', async (projectId: number, thunkApi) => {
  try {
    return await projectsTabApi.getProjectDetails(projectId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const employeeProjectsSlice = createSlice({
  name: 'employeeProjects',
  initialState: initialProjectsState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getEmployeeProjects.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeProjects = action.payload as EmployeeProjects
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectDetails = action.payload as ProjectDetails[]
      })
      .addMatcher(
        isAnyOf(getEmployeeProjects.pending, getProjectDetails.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getEmployeeProjects.fulfilled, getProjectDetails.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(getEmployeeProjects.rejected, getProjectDetails.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const employeeProjects = (state: RootState): EmployeeProjects =>
  state.employeeProjects.employeeProjects

const projectDetails = (state: RootState): ProjectDetails[] =>
  state.employeeProjects.projectDetails

const isLoading = (state: RootState): LoadingState =>
  state.employeeProjects.isLoading

const employeeProjectsThunk = {
  getEmployeeProjects,
  getProjectDetails,
}

const employeeProjectsSelectors = {
  isLoading,
  employeeProjects,
  projectDetails,
}

export const employeeProjectsService = {
  ...employeeProjectsThunk,
  actions: employeeProjectsSlice.actions,
  selectors: employeeProjectsSelectors,
}

export default employeeProjectsSlice.reducer
