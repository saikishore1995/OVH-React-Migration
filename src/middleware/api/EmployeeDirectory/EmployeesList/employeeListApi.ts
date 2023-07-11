import { AllowedHttpMethods, employeeListConfig } from '../../apiList'
import {
  EmployeeListApiProps,
  EmploymentStatus,
  GetEmployeeResponse,
} from '../../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployees = async (
  props: EmployeeListApiProps,
): Promise<GetEmployeeResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeListConfig.getEmployeeList,
    method: AllowedHttpMethods.get,
    params: {
      endIndex: props.endIndex ?? 20,
      startIndex: props.startIndex ?? 0,
      searchStr: props.searchStr ?? '',
      selectionStatus: props.selectionStatus ?? EmploymentStatus.active,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const exportEmployeeData = async (
  props: EmployeeListApiProps,
): Promise<Blob | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeListConfig.exportEmployeeData,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: props.searchStr ?? '',
      selectionStatus: props.selectionStatus ?? EmploymentStatus.active,
      token: localStorage.getItem('token') ?? '',
      tenantKey: localStorage.getItem('token') ?? '',
    },
    responseType: 'blob',
  })

  const response = await axios(requestConfig)
  return response.data
}

const employeeListApi = {
  getEmployees,
  exportEmployeeData,
}

export default employeeListApi
