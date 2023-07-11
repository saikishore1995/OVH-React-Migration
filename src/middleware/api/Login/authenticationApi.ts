import { AllowedHttpMethods, authenticationApiConfig } from '../apiList'

import { AuthenticatedUser } from '../../../types/Login/authenticationTypes'
import axios from 'axios'
import { encode } from 'base-64'
import { getUnauthenticatedRequestConfig } from '../../../utils/apiUtils'

const authenticateUser = async (
  username: string,
  password: string,
  tenantKey: string,
): Promise<{ authenticatedUser: AuthenticatedUser } | undefined> => {
  const encodedCredentials = encode(`${username}:${password}`)

  const requestConfig = getUnauthenticatedRequestConfig({
    url: authenticationApiConfig.login,
    method: AllowedHttpMethods.get,
    additionalHeaders: {
      Authorization: `Basic ${encodedCredentials}`,
    },
    tenantKey,
  })

  const response = await axios(requestConfig)
  if (response.status === 200) {
    const data = {
      authenticatedUser: {
        employeeName: `${response.data.employeeDto.firstName} ${response.data.employeeDto.lastName}`,
        employeeId: response.data.employeeDto.id,
        userName: response.data.employeeDto.userName,
        role: response.data.employeeDto.role,
        tenantKey: response.data.tenantKey,
        token: response.data.employeeDto.token,
        designation: response.data.employeeDto.designation,
      },
    }

    localStorage.setItem('employeeName', data.authenticatedUser.employeeName)
    localStorage.setItem('employeeId', data.authenticatedUser.employeeId)
    localStorage.setItem('userName', data.authenticatedUser.userName)
    localStorage.setItem('role', data.authenticatedUser.role)
    localStorage.setItem('tenantKey', data.authenticatedUser.tenantKey)
    localStorage.setItem('token', data.authenticatedUser.token)
    localStorage.setItem('designation', data.authenticatedUser.designation)

    return data
  }
}

const authenticationApi = { authenticateUser }

export default authenticationApi
