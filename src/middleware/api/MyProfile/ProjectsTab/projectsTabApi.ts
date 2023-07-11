import { AllowedHttpMethods, employeeProjectsApiConfig } from '../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import { EmployeeProjects } from '../../../../types/MyProfile/ProjectsTab/employeeProjectTypes'

const getEmployeeProjects = async (
  employeeid: string,
): Promise<EmployeeProjects> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProjectsApiConfig.getEmployeeProjects,
    method: AllowedHttpMethods.get,
    params: {
      employeeid: employeeid,
      endIndex: 20,
      firstIndex: 0,
      projectStatus: 'All',
      type: 'All',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getProjectDetails = async (
  projectId: number,
): Promise<EmployeeProjects> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeProjectsApiConfig.getProjectDetails,
    method: AllowedHttpMethods.get,
    params: {
      projectId: projectId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const projectsTabApi = {
  getEmployeeProjects,
  getProjectDetails,
}

export default projectsTabApi
