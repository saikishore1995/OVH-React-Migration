import { AllowedHttpMethods, personalInfoApiConfig } from '../../apiList'
import {
  EditFamilyDetailsState,
  EditVisaDetailsState,
  EmployeeFamilyData,
  EmployeeFamilyDetails,
  EmployeeVisaDetails,
  GetCountryDetails,
  VisaCountryDetails,
  VisaDetails,
} from '../../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeFamilyDetails = async (
  employeeId: number | string | undefined,
): Promise<EmployeeFamilyData[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.getFamilyDetails,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const addEmployeeFamilyMember = async (
  employeeFamily: EmployeeFamilyDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.addNewFamilyMember,
    method: AllowedHttpMethods.post,
    data: employeeFamily,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeFamilyMember = async (
  familyId: number,
): Promise<EditFamilyDetailsState> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.getFamilyInformation,
    method: AllowedHttpMethods.get,
    params: {
      familyId: familyId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateEmployeeFamilyMember = async (
  employeeFamily: EmployeeFamilyDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.updateFamilyInformation,
    method: AllowedHttpMethods.post,
    data: employeeFamily,
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteEmployeeFamilyMember = async (
  familyId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.deleteFamilyMember,
    method: AllowedHttpMethods.get,
    params: {
      familyId: familyId,
    },
    data: {
      familyId: familyId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeVisaDetails = async (
  employeeId: number | string | undefined,
): Promise<VisaDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.getVisaDetails,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeCountryDetails = async (): Promise<
  GetCountryDetails | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.getCountryDetails,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeVisaType = async (
  countryId: number | string,
): Promise<VisaCountryDetails[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.getVisaTypeDetails,
    method: AllowedHttpMethods.get,
    params: {
      id: countryId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const addEmployeeVisa = async (
  employeeVisaDetails: EmployeeVisaDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.addNewVisaMember,
    method: AllowedHttpMethods.post,
    data: employeeVisaDetails,
  })
  const responseVisa = await axios(requestConfig)
  return responseVisa.data
}

const getEmployeeVisa = async (id: number): Promise<EditVisaDetailsState> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.getVisaInformation,
    method: AllowedHttpMethods.get,
    params: {
      id: id,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateEmployeeVisa = async (
  employeeVisaDetails: EmployeeVisaDetails,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.updateVisaInformation,
    method: AllowedHttpMethods.put,
    data: employeeVisaDetails,
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteEmployeeVisa = async (
  visaId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.deleteVisaDetail,
    method: AllowedHttpMethods.get,
    params: {
      visaID: visaId,
    },
    data: {
      visaID: visaId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const uploadVisaImage = async (
  visaId: number,
  file: FormData,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: personalInfoApiConfig.fileUploadVisaImage,
    method: AllowedHttpMethods.post,
    data: file,
    params: {
      visaId: visaId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const personalInfoApi = {
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
  uploadVisaImage,
}
export default personalInfoApi
