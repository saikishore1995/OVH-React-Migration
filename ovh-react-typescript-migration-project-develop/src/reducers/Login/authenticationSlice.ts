import { AppDispatch, RootState } from '../../stateStore'
import {
  AuthenticatedUser,
  AuthenticationState,
  LoginCredentials,
} from '../../types/Login/authenticationTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { ValidationError } from '../../types/commonTypes'
import authenticationApi from '../../middleware/api/Login/authenticationApi'

const initialAuthenticationState = {
  isLoading: ApiLoadingState.idle,
} as AuthenticationState

const authenticateUser = createAsyncThunk<
  { authenticatedUser: AuthenticatedUser } | undefined,
  LoginCredentials,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'authentication/authenticateUser',
  async (userCredentials: LoginCredentials, thunkApi) => {
    try {
      return await authenticationApi.authenticateUser(
        userCredentials.username,
        userCredentials.password,
        userCredentials.tenantKey,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthenticationState,
  reducers: {
    setAuthentication: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearAuthentication: (state) => {
      return { ...state, ...initialAuthenticationState }
    },
    clearError: (state) => {
      state.error = null
    },
    clearLoading: (state) => {
      state.isLoading = ApiLoadingState.idle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoading: ApiLoadingState.succeeded,
        }
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const selectError = (state: RootState): ValidationError =>
  state.authentication.error
const selectToken = (state: RootState): string =>
  state.authentication.authenticatedUser?.token
const selectEmployeeId = (state: RootState): string =>
  state.authentication.authenticatedUser?.employeeId as string
const selectEmployeeRole = (state: RootState): string =>
  state.authentication.authenticatedUser?.role as string
const selectTenantKey = (state: RootState): string =>
  state.authentication.authenticatedUser?.tenantKey as string

const authenticationThunk = {
  authenticateUser,
}

const authenticationSelectors = {
  selectError,
  selectToken,
  selectEmployeeId,
  selectEmployeeRole,
  selectTenantKey,
}

export const authenticationService = {
  ...authenticationThunk,
  actions: authenticationSlice.actions,
  selectors: authenticationSelectors,
}

export default authenticationSlice.reducer
