import { employeeReporteesApiConfig, AllowedHttpMethods } from '../../apiList'
import {
  EmployeeReportee,
  EmployeeReporteesKRA,
  EmployeeReporteesKPI,
} from '../../../../types/MyProfile/ReporteesTab/employeeReporteesType'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeReportees = async (
  empID: number | string | undefined,
): Promise<EmployeeReportee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReportees,
    method: AllowedHttpMethods.get,
    params: {
      empID: empID,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeReporteesKRAs = async (
  personId: number | string,
): Promise<EmployeeReporteesKRA[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReporteesKRAs,
    method: AllowedHttpMethods.get,
    params: {
      personId: personId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeReporteesKPIs = async (
  kraId: number | string,
): Promise<EmployeeReporteesKPI[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReporteesApiConfig.getEmployeeReporteesKPIs,
    method: AllowedHttpMethods.get,
    params: {
      kraId: kraId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeReporteesApi = {
  getEmployeeReportees,
  getEmployeeReporteesKRAs,
  getEmployeeReporteesKPIs,
}
export default employeeReporteesApi
