import { AppDispatch, RootState } from '../../../stateStore'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import {
  BasicInformationState,
  UploadCVInterface,
  UploadImageInterface,
} from '../../../types/MyProfile/BasicInfoTab/basicInformationTypes'
import { EmployeeGeneralInformation } from '../../../types/MyProfile/GeneralTab/generalInformationTypes'
import { ValidationError } from '../../../types/commonTypes'
import basicInfoApi from '../../../middleware/api/MyProfile/BasicInfoTab/basicInfoApi'

const updateEmployeeDefaultPicOnGenderChange = createAsyncThunk<
  number | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'basicInformation/updateEmployeeDefaultPic',
  async (gender: string, thunkApi) => {
    try {
      return await basicInfoApi.updateDefaultPicOnGenderChange(gender)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const updateEmployeeBasicInformation = createAsyncThunk<
  number | undefined,
  EmployeeGeneralInformation,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'basicInformation/updateEmployeeDefaultPic',
  async (prepareObject: EmployeeGeneralInformation, thunkApi) => {
    try {
      return await basicInfoApi.updateEmployeeBasicInformation(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadEmployeeCV = createAsyncThunk<
  number | undefined,
  UploadCVInterface,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'basicInformation/uploadRBTCv',
  async (prepareObject: UploadCVInterface, thunkApi) => {
    try {
      return await basicInfoApi.uploadEmployeeCV(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialBasicInformationState: BasicInformationState = {
  isLoading: false,
}

const uploadEmployeeProfilePicture = createAsyncThunk<
  number | undefined,
  UploadImageInterface,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'basicInformation/uploadEmployeeProfilePicture',
  async (prepareObject: UploadImageInterface, thunkApi) => {
    try {
      return await basicInfoApi.uploadEmployeeProfilePicture(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const basicInformationSlice = createSlice({
  name: 'basicInformation',
  initialState: initialBasicInformationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          updateEmployeeDefaultPicOnGenderChange.pending,
          updateEmployeeBasicInformation.pending,
          uploadEmployeeCV.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          updateEmployeeDefaultPicOnGenderChange.fulfilled,
          updateEmployeeBasicInformation.fulfilled,
          uploadEmployeeCV.fulfilled,
        ),
        (state) => {
          state.isLoading = false
        },
      )
  },
})

export const employeeBasicInformationThunk = {
  updateEmployeeDefaultPicOnGenderChange,
  updateEmployeeBasicInformation,
  uploadEmployeeProfilePicture,
  uploadEmployeeCV,
}
export const basicInformationService = {
  ...employeeBasicInformationThunk,
  actions: basicInformationSlice.actions,
}

export default basicInformationSlice.reducer
