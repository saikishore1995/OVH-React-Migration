import { AppDispatch, RootState } from '../../../stateStore'
import {
  EditFamilyDetailsState,
  EditVisaDetailsState,
  EmployeeFamilyData,
  EmployeeFamilyDetails,
  EmployeeVisaDetails,
  GetCountryDetails,
  PersonalInfoTabState,
  VisaCountryDetails,
  VisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import personalInfoApi from '../../../middleware/api/MyProfile/PersonalInfoTab/personalInfoApi'

const initialPersonalInfoTabState: PersonalInfoTabState = {
  employeeFamilyDetails: [],
  employeeVisaDetails: [],
  SubCountries: {} as GetCountryDetails,
  SubVisa: [],
  editFamilyDetails: {} as EditFamilyDetailsState,
  editVisaDetails: {} as EditVisaDetailsState,
  isLoading: false,
  error: 0,
}

const getEmployeeFamilyDetails = createAsyncThunk<
  EmployeeFamilyData[] | undefined,
  number | string | undefined,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/getEmployeeFamilyDetails',
  async (employeeId: number | string | undefined, thunkApi) => {
    try {
      return await personalInfoApi.getEmployeeFamilyDetails(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeVisaDetails = createAsyncThunk<
  VisaDetails[] | undefined,
  string | number | undefined,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/getEmployeeVisaDetails',
  async (employeeId: string | number | undefined, thunkApi) => {
    try {
      return await personalInfoApi.getEmployeeVisaDetails(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeCountryDetails = createAsyncThunk<
  GetCountryDetails | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/getEmployeeCountryDetails', async (_, thunkApi) => {
  try {
    return await personalInfoApi.getEmployeeCountryDetails()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getEmployeeVisaType = createAsyncThunk<
  VisaCountryDetails[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/getEmployeeVisaType',
  async (countryId: string | number, thunkApi) => {
    try {
      return await personalInfoApi.getEmployeeVisaType(countryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addEmployeeVisa = createAsyncThunk<
  number | undefined,
  EmployeeVisaDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addEditFamilyDetails/addEmployeeVisa',
  async (employeeVisaDetails: EmployeeVisaDetails, thunkApi) => {
    try {
      return await personalInfoApi.addEmployeeVisa(employeeVisaDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeFamilyMember = createAsyncThunk<
  EditFamilyDetailsState | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/getEditFamilyMember', async (familyId: number, thunkApi) => {
  try {
    return await personalInfoApi.getEmployeeFamilyMember(familyId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const updateEmployeeFamilyMember = createAsyncThunk<
  number | undefined,
  EmployeeFamilyDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/getUpdateFamilyDetails',
  async (employeeFamily: EmployeeFamilyDetails, thunkApi) => {
    try {
      return await personalInfoApi.updateEmployeeFamilyMember(employeeFamily)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addEmployeeFamilyMember = createAsyncThunk<
  number | undefined,
  EmployeeFamilyDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/addEmployeeFamilyMember',
  async (employeeFamily: EmployeeFamilyDetails, thunkApi) => {
    try {
      return await personalInfoApi.addEmployeeFamilyMember(employeeFamily)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeVisa = createAsyncThunk<
  EditVisaDetailsState | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/getEmployeeVisa', async (id: number, thunkApi) => {
  try {
    return await personalInfoApi.getEmployeeVisa(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const updateEmployeeVisa = createAsyncThunk<
  number | undefined,
  EmployeeVisaDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'personalInfoTab/updateEmployeeVisa',
  async (employeeVisaDetails: EmployeeVisaDetails, thunkApi) => {
    try {
      return await personalInfoApi.updateEmployeeVisa(employeeVisaDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const deleteEmployeeFamilyMember = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/deleteEmployeeFamilyMember', async (familyId, thunkApi) => {
  try {
    return await personalInfoApi.deleteEmployeeFamilyMember(familyId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const deleteEmployeeVisa = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('personalInfoTab/deleteEmployeeVisa', async (visaId, thunkApi) => {
  try {
    return await personalInfoApi.deleteEmployeeVisa(visaId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const personalInfoTabSlice = createSlice({
  name: 'personalInfoTab',
  initialState: initialPersonalInfoTabState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeFamilyDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.employeeFamilyDetails = action.payload as EmployeeFamilyData[]
      })
      .addCase(getEmployeeVisaDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.employeeVisaDetails = action.payload as VisaDetails[]
      })
      .addCase(getEmployeeCountryDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.SubCountries = action.payload as GetCountryDetails
      })
      .addCase(getEmployeeVisaType.fulfilled, (state, action) => {
        state.isLoading = false
        state.SubVisa = action.payload as VisaCountryDetails[]
      })
      .addCase(getEmployeeFamilyMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.editFamilyDetails =
          action.payload as unknown as EditFamilyDetailsState
      })
      .addCase(getEmployeeVisa.fulfilled, (state, action) => {
        state.isLoading = false
        state.editVisaDetails =
          action.payload as unknown as EditVisaDetailsState
      })
      .addMatcher(
        isAnyOf(
          deleteEmployeeFamilyMember.fulfilled,
          deleteEmployeeVisa.fulfilled,
          updateEmployeeVisa.fulfilled,
          updateEmployeeFamilyMember.fulfilled,
          addEmployeeFamilyMember.fulfilled,
        ),
        (state) => {
          state.isLoading = false
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeFamilyDetails.pending,
          getEmployeeVisaDetails.pending,
          getEmployeeCountryDetails.pending,
          getEmployeeCountryDetails.pending,
          getEmployeeVisaType.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeFamilyDetails.rejected,
          getEmployeeVisaDetails.rejected,
          getEmployeeCountryDetails.rejected,
          getEmployeeCountryDetails.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})
const familyDetails = (state: RootState): EmployeeFamilyData[] =>
  state.personalInfoDetails.employeeFamilyDetails
const visaDetails = (state: RootState): VisaDetails[] =>
  state.personalInfoDetails.employeeVisaDetails

const countryDetails = (state: RootState): GetCountryDetails =>
  state.personalInfoDetails.SubCountries

const visaTypeDetails = (state: RootState): VisaCountryDetails[] =>
  state.personalInfoDetails.SubVisa

const employeeVisaDetails = (state: RootState): EditVisaDetailsState =>
  state.personalInfoDetails.editVisaDetails

const employeeFamilyMember = (state: RootState): EditFamilyDetailsState =>
  state.personalInfoDetails.editFamilyDetails

export const personalInfoThunk = {
  getEmployeeFamilyDetails,
  addEmployeeFamilyMember,
  getEmployeeFamilyMember,
  updateEmployeeFamilyMember,
  deleteEmployeeFamilyMember,
  getEmployeeVisaDetails,
  getEmployeeCountryDetails,
  getEmployeeVisaType,
  addEmployeeVisa,
  getEmployeeVisa,
  updateEmployeeVisa,
  deleteEmployeeVisa,
}
export const personalInfoSelectors = {
  familyDetails,
  visaDetails,
  countryDetails,
  visaTypeDetails,
  employeeVisaDetails,
  employeeFamilyMember,
}
export const personalInfoService = {
  ...personalInfoThunk,
  actions: personalInfoTabSlice.actions,
  selectors: personalInfoSelectors,
}
export default personalInfoTabSlice.reducer
