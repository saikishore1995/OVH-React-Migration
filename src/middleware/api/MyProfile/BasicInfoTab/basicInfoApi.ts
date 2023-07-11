import { AllowedHttpMethods, basicInfoApiConfig } from '../../apiList'

import { EmployeeGeneralInformation } from '../../../../types/MyProfile/GeneralTab/generalInformationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import {
  DownloadCVInterface,
  UploadCVInterface,
  UploadImageInterface,
} from '../../../../types/MyProfile/BasicInfoTab/basicInformationTypes'

const updateDefaultPicOnGenderChange = async (
  gender: string,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.defaultPicByGender,
    method: AllowedHttpMethods.post,
    params: {
      gender: gender,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const uploadEmployeeCV = async (
  prepareObject: UploadCVInterface,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.uploadEmployeeCV,
    method: AllowedHttpMethods.post,
    data: prepareObject.file,
    params: {
      personId: prepareObject.personId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const uploadEmployeeProfilePicture = async (
  prepareObject: UploadImageInterface,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.uploadEmployeeImage,
    method: AllowedHttpMethods.post,
    data: prepareObject.data,
    params: {
      empId: prepareObject.empId,
    },
    additionalHeaders: {
      'Content-Type': 'multipart/form-data',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const downloadEmployeeCV = async (
  prepareObject: DownloadCVInterface,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.downloadEmployeeCV,
    method: AllowedHttpMethods.get,
    params: {
      fileName: prepareObject.fileName,
      token: prepareObject.token,
      tenantKey: prepareObject.tenantKey,
    },
    responseType: 'blob',
  })
  const response = await axios(requestConfig)
  return response.data
}

const downloadSampleCV = async (fileName: string): Promise<File> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.downloadSampleCV,
    method: AllowedHttpMethods.get,
    additionalHeaders: {
      'Content-Type': 'application/json',
    },
    params: {
      fileName: fileName,
    },
    responseType: 'blob',
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateEmployeeBasicInformation = async (
  prepareObject: EmployeeGeneralInformation,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: basicInfoApiConfig.updateEmployeeDetails,
    method: AllowedHttpMethods.post,
    data: prepareObject,
  })
  const response = await axios(requestConfig)
  return response.data
}

const basicInfoApi = {
  updateDefaultPicOnGenderChange,
  updateEmployeeBasicInformation,
  uploadEmployeeCV,
  uploadEmployeeProfilePicture,
  downloadEmployeeCV,
  downloadSampleCV,
}
export default basicInfoApi
