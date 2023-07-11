import {
  AllowedHttpMethods,
  employeeGeneralInformationApiConfig,
} from '../../apiList'

import { EmployeeGeneralInformation } from '../../../../types/MyProfile/GeneralTab/generalInformationTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeGeneralInformation = async (
  employeeId: string,
): Promise<{ generalInformation: EmployeeGeneralInformation } | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeGeneralInformationApiConfig.getLoggedInEmployeeData,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeGeneralInformationApi = {
  getEmployeeGeneralInformation,
}
export default employeeGeneralInformationApi
