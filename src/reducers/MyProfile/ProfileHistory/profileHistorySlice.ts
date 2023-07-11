import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  ProfileHistoryState,
  ProfileUpdateData,
} from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import profileHistoryApi from '../../../middleware/api/MyProfile/ProfileHistory/profileHistoryApi'

const getProfileHistory = createAsyncThunk<
  ProfileUpdateData[] | undefined,
  string | undefined,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'profileHistory/getProfileHistory',
  async (employeeId: string | undefined, thunkApi) => {
    try {
      return await profileHistoryApi.getProfileHistory(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialProfileHistoryState: ProfileHistoryState = {
  profileHistoryList: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}

const profileHistorySlice = createSlice({
  name: 'profileHistory',
  initialState: initialProfileHistoryState,
  reducers: {
    clearProfileHistoryList: (state) => {
      state.profileHistoryList = []
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfileHistory.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getProfileHistory.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.profileHistoryList = action.payload as ProfileUpdateData[]
      })
      .addCase(getProfileHistory.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.profileHistory.isLoading

const profileHistoryData = (state: RootState): ProfileUpdateData[] =>
  state.profileHistory.profileHistoryList

const profileHistoryThunk = {
  getProfileHistory,
}
// export const setProfileHistory = profileHistorySlice.actions
const profileHistorySelectors = {
  isLoading,
  profileHistoryData,
}

export const profileHistoryService = {
  ...profileHistoryThunk,
  actions: profileHistorySlice.actions,
  selectors: profileHistorySelectors,
}
export default profileHistorySlice.reducer
