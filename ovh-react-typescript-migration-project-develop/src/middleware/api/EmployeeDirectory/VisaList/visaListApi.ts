import { AllowedHttpMethods, visaListApiConfig } from '../../apiList'
import {
  Country,
  GetVisaListApiProps,
  GetVisaListResponse,
  VisaType,
} from '../../../../types/EmployeeDirectory/VisaList/visaListTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getVisaList = async (
  props: GetVisaListApiProps,
): Promise<GetVisaListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: visaListApiConfig.getVisaList,
    method: AllowedHttpMethods.get,
    params: {
      startIndex: props.startIndex ?? 0,
      endIndex: props.endIndex ?? 20,
      multipleSearch: props.multipleSearch ?? '',
      countryId: props.countryId ?? '',
      visaTypeId: props.visaTypeId ?? '',
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const getCountries = async (): Promise<Country[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: visaListApiConfig.getCountries,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const getVisaTypes = async (countryId: number): Promise<VisaType[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: visaListApiConfig.getVisaTypes,
    method: AllowedHttpMethods.get,
    params: {
      id: countryId,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const exportVisaList = async (
  props: GetVisaListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: visaListApiConfig.exportVisaList,
    method: AllowedHttpMethods.get,
    params: {
      countryId: props.countryId ?? '',
      visaTypeId: props.visaTypeId ?? '',
      multipleSearch: props.multipleSearch ?? '',
      token: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await axios(requestConfig)
  return response.data
}

const visaListApi = {
  getVisaList,
  getCountries,
  getVisaTypes,
  exportVisaList,
}

export default visaListApi
