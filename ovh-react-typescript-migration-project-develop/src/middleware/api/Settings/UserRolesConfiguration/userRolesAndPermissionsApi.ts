import {
  AllowedHttpMethods,
  userRolesConfigurationApiConfig,
} from '../../apiList'
import {
  CreateUserRole,
  UserFeaturesUnderRole,
  UserRole,
  UserRoleSubFeatures,
  UtilsRenderPermissionSwitchReturn,
} from '../../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getUserRoles = async (): Promise<UserRole[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.getUserRoles,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const checkIsRoleExists = async (
  roleInput: string,
): Promise<boolean | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.isUserRoleExists,
    method: AllowedHttpMethods.get,
    params: {
      roleName: roleInput,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const createUserRole = async ({
  roleInput,
  reportingManagerFlag,
}: CreateUserRole): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.createUserRole,
    method: AllowedHttpMethods.post,
    params: {
      roleName: roleInput,
      reportingManagerFlag: reportingManagerFlag,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteUserRole = async (roleId: number): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.deleteUserRole,
    method: AllowedHttpMethods.post,
    params: {
      roleId: roleId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getUserRoleSubFeatures = async (): Promise<
  UserRoleSubFeatures[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.getSubFeatures,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getUserFeaturesUnderRole = async (
  selectedRoleId: string,
): Promise<UserFeaturesUnderRole[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.featuresUnderRole,
    method: AllowedHttpMethods.get,
    params: {
      roleId: selectedRoleId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const updateAssignPermissions = async (
  prepareObject: UtilsRenderPermissionSwitchReturn,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: userRolesConfigurationApiConfig.assignPermission,
    method: AllowedHttpMethods.post,
    data: prepareObject,
  })
  const response = await axios(requestConfig)
  return response.data
}

const userRolesAndPermissionsApi = {
  getUserRoles,
  checkIsRoleExists,
  createUserRole,
  deleteUserRole,
  getUserRoleSubFeatures,
  getUserFeaturesUnderRole,
  updateAssignPermissions,
}
export default userRolesAndPermissionsApi
