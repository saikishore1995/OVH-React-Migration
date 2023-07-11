import { AppDispatch, RootState } from '../../../stateStore'
import {
  CreateUserRole,
  UserFeaturesUnderRole,
  UserRole,
  UserRoleSubFeatures,
  UserRolesAndPermissionsState,
  UtilsRenderPermissionSwitchReturn,
} from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import userRolesAndPermissionsApi from '../../../middleware/api/Settings/UserRolesConfiguration/userRolesAndPermissionsApi'

// fetch user roles action creator
const getUserRoles = createAsyncThunk<
  UserRole[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userRolesAndPermissions/getUserRoles', async (_, thunkApi) => {
  try {
    return await userRolesAndPermissionsApi.getUserRoles()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

// get Is Role Exists action creator is to check whether the role exists in database
const checkIsRoleExists = createAsyncThunk<
  boolean | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/checkIsRoleExists',
  async (roleInput: string, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.checkIsRoleExists(roleInput)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

// add new user role action creator
const createUserRole = createAsyncThunk<
  number | undefined,
  CreateUserRole,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/createUserRole',
  async ({ roleInput, reportingManagerFlag }: CreateUserRole, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.createUserRole({
        roleInput,
        reportingManagerFlag,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
// delete role action creator
const deleteUserRole = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userRolesAndPermissions/deleteUserRole', async (id: number, thunkApi) => {
  try {
    return await userRolesAndPermissionsApi.deleteUserRole(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

// fetch user role sub features action creator
const getUserRoleSubFeatures = createAsyncThunk<
  UserRoleSubFeatures[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userRolesAndPermissions/getUserRoleSubFeatures', async (_, thunkApi) => {
  try {
    return await userRolesAndPermissionsApi.getUserRoleSubFeatures()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

// fetch features under role action creator
const getUserFeaturesUnderRole = createAsyncThunk<
  UserFeaturesUnderRole[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/getUserFeaturesUnderRole',
  async (selectedRoleId: string, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.getUserFeaturesUnderRole(
        selectedRoleId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

// assign role permissions
const updateAssignPermission = createAsyncThunk<
  number | undefined,
  UtilsRenderPermissionSwitchReturn,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'userRolesAndPermissions/updateAssignPermission',
  async (prepareObject: UtilsRenderPermissionSwitchReturn, thunkApi) => {
    try {
      return await userRolesAndPermissionsApi.updateAssignPermissions(
        prepareObject,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialUserRolesPermissionsState: UserRolesAndPermissionsState = {
  roles: [],
  subFeatures: [],
  featuresUnderRole: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}

const userRolesAndPermissionsSlice = createSlice({
  name: 'userRolesAndPermissions',
  initialState: initialUserRolesPermissionsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserRoles.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.roles = action.payload as UserRole[]
      })
      .addCase(getUserRoleSubFeatures.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.subFeatures = action.payload as UserRoleSubFeatures[]
      })
      .addCase(getUserFeaturesUnderRole.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.featuresUnderRole = action.payload as UserFeaturesUnderRole[]
      })
      .addMatcher(
        isAnyOf(
          checkIsRoleExists.fulfilled,
          createUserRole.fulfilled,
          deleteUserRole.fulfilled,
          updateAssignPermission.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getUserRoles.pending,
          checkIsRoleExists.pending,
          createUserRole.pending,
          deleteUserRole.pending,
          getUserRoleSubFeatures.pending,
          getUserFeaturesUnderRole.pending,
          updateAssignPermission.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getUserRoles.rejected,
          checkIsRoleExists.rejected,
          createUserRole.rejected,
          deleteUserRole.rejected,
          getUserRoleSubFeatures.rejected,
          getUserFeaturesUnderRole.rejected,
          updateAssignPermission.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const userRoles = (state: RootState): UserRole[] =>
  state.userRolesAndPermissions.roles

const userRoleSubFeatures = (state: RootState): UserRoleSubFeatures[] =>
  state.userRolesAndPermissions.subFeatures

const userFeaturesUnderRole = (state: RootState): UserFeaturesUnderRole[] =>
  state.userRolesAndPermissions.featuresUnderRole

export const userRolesAndPermissionsThunk = {
  getUserRoles,
  checkIsRoleExists,
  createUserRole,
  deleteUserRole,
  getUserRoleSubFeatures,
  getUserFeaturesUnderRole,
  updateAssignPermission,
}

export const userRolesAndPermissionsSelectors = {
  userRoles,
  userRoleSubFeatures,
  userFeaturesUnderRole,
}

export const userRolesAndPermissionsService = {
  ...userRolesAndPermissionsThunk,
  actions: userRolesAndPermissionsSlice.actions,
  selectors: userRolesAndPermissionsSelectors,
}

export default userRolesAndPermissionsSlice.reducer
