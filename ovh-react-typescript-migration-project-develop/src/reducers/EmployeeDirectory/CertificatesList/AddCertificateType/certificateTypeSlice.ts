import { AppDispatch, RootState } from '../../../../stateStore'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  CertificateType,
  CertificateTypeSliceState,
} from '../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'
import certificateTypesApi from '../../../../middleware/api/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeApi'

const getCertificateTypes = createAsyncThunk<
  CertificateType[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('certificateType/getCertificateTypes', async (_, thunkApi) => {
  try {
    return await certificateTypesApi.getCertificateTypes()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const checkIsCertificateTypeExists = createAsyncThunk<
  boolean | undefined,
  CertificateType,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'certificateType/checkIsCertificateTypeExists',
  async ({ technologyId, certificateType }: CertificateType, thunkApi) => {
    try {
      return await certificateTypesApi.checkIsCertificateTypeExists({
        technologyId,
        certificateType,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addCertificateType = createAsyncThunk<
  CertificateType[] | undefined,
  CertificateType,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'certificateType/addCertificateType',
  async ({ technologyId, certificateType }: CertificateType, thunkApi) => {
    try {
      return await certificateTypesApi.addCertificateType({
        technologyId,
        certificateType,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteCertificateType = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('certificateType/deleteCertificateType', async (certificateId, thunkApi) => {
  try {
    return await certificateTypesApi.deleteCertificateType(certificateId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getCertificateType = createAsyncThunk<
  CertificateType | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'certificateType/getCertificateType',
  async (certificateId: number, thunkApi) => {
    try {
      return await certificateTypesApi.getCertificateType(certificateId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateCertificateType = createAsyncThunk<
  number | undefined,
  CertificateType,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'certificateType/updateCertificateType',
  async (certificateTypeDetails, thunkApi) => {
    try {
      return await certificateTypesApi.updateCertificateType(
        certificateTypeDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCertificateTypeState: CertificateTypeSliceState = {
  certificateTypes: [],
  isLoading: ApiLoadingState.idle,
  error: null,
  editCertificateType: {
    certificateType: '',
    id: 0,
    technologyId: 0,
    technologyName: '',
  },
}
const certificateTypeSlice = createSlice({
  name: 'certificateType',
  initialState: initialCertificateTypeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCertificateType.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editCertificateType = action.payload as CertificateType
      })
      .addCase(getCertificateTypes.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.certificateTypes = action.payload as CertificateType[]
      })
      .addMatcher(
        isAnyOf(
          addCertificateType.fulfilled,
          deleteCertificateType.fulfilled,
          checkIsCertificateTypeExists.fulfilled,
          updateCertificateType.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCertificateTypes.pending,
          checkIsCertificateTypeExists.pending,
          addCertificateType.pending,
          deleteCertificateType.pending,
          getCertificateType.pending,
          updateCertificateType.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCertificateTypes.rejected,
          checkIsCertificateTypeExists.rejected,
          addCertificateType.rejected,
          deleteCertificateType.rejected,
          getCertificateType.rejected,
          updateCertificateType.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.certificateType.isLoading

const certificateTypes = (state: RootState): CertificateType[] =>
  state.certificateType.certificateTypes

const editCertificateType = (state: RootState): CertificateType =>
  state.certificateType.editCertificateType

const isError = (state: RootState): ValidationError =>
  state.certificateType.error

const certificateTypeThunk = {
  getCertificateTypes,
  addCertificateType,
  checkIsCertificateTypeExists,
  deleteCertificateType,
  getCertificateType,
  updateCertificateType,
}

const certificateTypeSelectors = {
  isLoading,
  certificateTypes,
  editCertificateType,
  isError,
}

export const certificateTypeService = {
  ...certificateTypeThunk,
  actions: certificateTypeSlice.actions,
  selectors: certificateTypeSelectors,
}

export default certificateTypeSlice.reducer
