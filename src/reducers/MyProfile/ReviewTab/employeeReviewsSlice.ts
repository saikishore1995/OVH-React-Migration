import { AppDispatch, RootState } from '../../../stateStore'
import {
  EmployeeReview,
  ReviewsTabState as EmployeeReviewsState,
} from '../../../types/MyProfile/ReviewsTab/employeeReviewsTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import employeeReviewsApi from '../../../middleware/api/MyProfile/ReviewsTab/employeeReviewsApi'

const initialEmployeeReviewsState: EmployeeReviewsState = {
  employeeReviews: [],
  isLoading: false,
  error: 0,
}

const getEmployeeReviews = createAsyncThunk<
  EmployeeReview[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeReviews/getEmployeeReviews',
  async (employeeId: number | string, thunkApi) => {
    try {
      return await employeeReviewsApi.getEmployeeReviews(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeReviewSlice = createSlice({
  name: 'employeeReviews',
  initialState: initialEmployeeReviewsState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getEmployeeReviews.fulfilled, (state, action) => {
      state.isLoading = false
      state.employeeReviews = action.payload as EmployeeReview[]
    })
    builder.addCase(getEmployeeReviews.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getEmployeeReviews.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as ValidationError
    })
  },
})
const employeeReviews = (state: RootState): EmployeeReview[] =>
  state.employeeReviews.employeeReviews

const employeeReviewsThunk = {
  getEmployeeReviews,
}
const employeeReviewsSelectors = {
  employeeReviews,
}
export const employeeReviewsService = {
  ...employeeReviewsThunk,
  actions: employeeReviewSlice.actions,
  selectors: employeeReviewsSelectors,
}
export default employeeReviewSlice.reducer
