import { AppDispatch, RootState } from '../../../../stateStore'
import {
  CertificateType,
  CertificationSliceState,
  EditEmployeeCertificate,
  EmployeeCertification,
  Technology,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import employeeCertificationsApi from '../../../../middleware/api/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationsApi'

const initialCertificationState: CertificationSliceState = {
  editCertificateDetails: {} as EditEmployeeCertificate,
  getAllTechnologies: [],
  typeOfCertificate: [],
  certificationDetails: [],
  selectedEmployeeCertifications: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}

const getEmployeeCertificates = createAsyncThunk<
  EmployeeCertification[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeCertifications/getEmployeeCertificates', async (_, thunkApi) => {
  try {
    return await employeeCertificationsApi.getEmployeeCertificates()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getTechnologies = createAsyncThunk<
  Technology[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeCertifications/getTechnologies', async (_, thunkApi) => {
  try {
    return await employeeCertificationsApi.getTechnologies()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getCertificateByTechnologyName = createAsyncThunk<
  CertificateType[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getCertificateByTechnologyName',
  async (technologyName: string, thunkApi) => {
    try {
      return await employeeCertificationsApi.getCertificateByTechnologyName(
        technologyName,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const createEmployeeCertification = createAsyncThunk<
  number | undefined,
  EmployeeCertification,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/createEmployeeCertification',
  async (employeeCertificateDetails: EmployeeCertification, thunkApi) => {
    try {
      return await employeeCertificationsApi.createEmployeeCertification(
        employeeCertificateDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeCertificate = createAsyncThunk<
  EditEmployeeCertificate | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getEmployeeCertificate',
  async (id: number, thunkApi) => {
    try {
      return await employeeCertificationsApi.getEmployeeCertificate(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEmployeeCertificate = createAsyncThunk<
  number | undefined,
  EmployeeCertification,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/updateEmployeeCertificate',
  async (employeeCertificateDetails: EmployeeCertification, thunkApi) => {
    try {
      return await employeeCertificationsApi.updateEmployeeCertificate(
        employeeCertificateDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteEmployeeCertificate = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/deleteEmployeeCertificate',
  async (certificationId, thunkApi) => {
    try {
      return await employeeCertificationsApi.deleteEmployeeCertificate(
        certificationId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeCertificateById = createAsyncThunk<
  EmployeeCertification[] | undefined,
  string | number | undefined,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getEmployeeCertificateById',
  async (employeeId, thunkApi) => {
    try {
      return await employeeCertificationsApi.getEmployeeCertificateById(
        employeeId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeCertificationsSlice = createSlice({
  name: 'employeeCertifications',
  initialState: initialCertificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllTechnologies = action.payload as Technology[]
      })
      .addCase(getCertificateByTechnologyName.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.typeOfCertificate = action.payload as CertificateType[]
      })
      .addCase(getEmployeeCertificate.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editCertificateDetails =
          action.payload as unknown as EditEmployeeCertificate
      })
      .addCase(getEmployeeCertificateById.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.selectedEmployeeCertifications =
          action.payload as EmployeeCertification[]
      })
      .addMatcher(
        isAnyOf(
          getEmployeeCertificates.fulfilled,
          getEmployeeCertificate.fulfilled,
          updateEmployeeCertificate.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.certificationDetails = action.payload as EmployeeCertification[]
        },
      )
      .addMatcher(
        isAnyOf(
          createEmployeeCertification.fulfilled,
          deleteEmployeeCertificate.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getTechnologies.pending,
          getCertificateByTechnologyName.pending,
          getEmployeeCertificate.pending,
          updateEmployeeCertificate.pending,
          deleteEmployeeCertificate.pending,
          getEmployeeCertificateById.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeCertificates.rejected,
          getTechnologies.rejected,
          getCertificateByTechnologyName.rejected,
          getEmployeeCertificate.rejected,
          updateEmployeeCertificate.rejected,
          deleteEmployeeCertificate.rejected,
          getEmployeeCertificateById.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const listSize = (state: RootState): LoadingState =>
  state.employeeCertificates.isLoading
const employeeCertificates = (
  state: RootState,
  isViewingAnotherEmployee = false,
): EmployeeCertification[] =>
  isViewingAnotherEmployee
    ? state.employeeCertificates.selectedEmployeeCertifications
    : state.employeeCertificates.certificationDetails

const technologies = (state: RootState): Technology[] =>
  state.employeeCertificates.getAllTechnologies

const certificateByTechnology = (state: RootState): CertificateType[] =>
  state.employeeCertificates.typeOfCertificate

const certificateDetails = (state: RootState): EditEmployeeCertificate =>
  state.employeeCertificates.editCertificateDetails

export const employeeCertificationThunk = {
  getEmployeeCertificates,
  getTechnologies,
  getCertificateByTechnologyName,
  getEmployeeCertificate,
  createEmployeeCertification,
  updateEmployeeCertificate,
  deleteEmployeeCertificate,
  getEmployeeCertificateById,
}

export const employeeCertificationSelectors = {
  listSize,
  employeeCertificates,
  technologies,
  certificateByTechnology,
  certificateDetails,
}

export const employeeCertificateService = {
  ...employeeCertificationThunk,
  actions: employeeCertificationsSlice.actions,
  selectors: employeeCertificationSelectors,
}

export default employeeCertificationsSlice.reducer
