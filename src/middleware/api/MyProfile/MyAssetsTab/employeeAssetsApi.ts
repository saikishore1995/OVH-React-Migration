import { employeeAssetsApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeAsset } from '../../../../types/MyProfile/MyAssetsTab/employeeAssetsTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getEmployeeAssets = async (
  employeeId: number | string,
): Promise<EmployeeAsset[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAssetsApiConfig.getEmployeeAssets,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeAssetsApi = {
  getEmployeeAssets,
}

export default employeeAssetsApi
