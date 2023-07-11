import {
  Country,
  GetVisaListApiProps,
  VisaListItem,
  VisaListSliceState,
  VisaType,
} from '../../../types/EmployeeDirectory/VisaList/visaListTypes'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import visaListApi from '../../../middleware/api/EmployeeDirectory/VisaList/visaListApi'

const getVisaList = createAsyncThunk(
  'visaList/getVisaList',
  async (props: GetVisaListApiProps, thunkApi) => {
    try {
      return await visaListApi.getVisaList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getCountries = createAsyncThunk(
  'visaList/getCountries',
  async (_, thunkApi) => {
    try {
      return await visaListApi.getCountries()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getVisaTypes = createAsyncThunk(
  'visaList/getVisaTypes',
  async (countryId: number, thunkApi) => {
    try {
      return await visaListApi.getVisaTypes(countryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialVisaListState: VisaListSliceState = {
  visaList: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  countries: [],
  visaTypes: [],
}

const visaListSlice = createSlice({
  name: 'visaList',
  initialState: initialVisaListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getVisaList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.visaList = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload
      })
      .addCase(getVisaTypes.fulfilled, (state, action) => {
        state.visaTypes = action.payload
      })
      .addMatcher(
        isAnyOf(getVisaList.pending, getCountries.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const visaList = (state: RootState): VisaListItem[] => state.visaList.visaList
const listSize = (state: RootState): number => state.visaList.listSize
const isLoading = (state: RootState): LoadingState => state.visaList.isLoading
const countries = (state: RootState): Country[] => state.visaList.countries
const visaTypes = (state: RootState): VisaType[] => state.visaList.visaTypes

const visaListThunk = {
  getVisaList,
  getCountries,
  getVisaTypes,
}

const visaListSelectors = {
  visaList,
  listSize,
  isLoading,
  countries,
  visaTypes,
}

export const visaListService = {
  ...visaListThunk,
  actions: visaListSlice.actions,
  selectors: visaListSelectors,
}

export default visaListSlice.reducer
