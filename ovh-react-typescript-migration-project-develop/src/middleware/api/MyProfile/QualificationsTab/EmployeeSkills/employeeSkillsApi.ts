import {
  AddUpdateEmployeeSkill,
  CategorySkillListItem,
  EditEmployeeSkills,
  EmployeeSkills,
} from '../../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import {
  AllowedHttpMethods,
  employeeSkillsApiConfig,
  skillsApiConfig,
} from '../../../apiList'

import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../../utils/apiUtils'

const getEmployeeSkills = async (): Promise<EmployeeSkills[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.getEmployeeSkills,
    method: AllowedHttpMethods.get,
  })
  const response = await axios(requestConfig)
  return response.data
}

const getCategorySkills = async (
  categoryType: number | string,
): Promise<CategorySkillListItem[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.getSkillListForCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId: categoryType },
  })
  const response = await axios(requestConfig)
  return response.data
}

const addEmployeeSkill = async (
  employeeSkill: AddUpdateEmployeeSkill,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.addEmployeeSkill,
    method: AllowedHttpMethods.post,
    data: employeeSkill,
  })
  const response = await axios(requestConfig)
  return response.data
}
const getEmployeeSkillInformation = async (
  skillId: number,
): Promise<EditEmployeeSkills> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.getEmployeeSkillInformation,
    method: AllowedHttpMethods.get,
    params: {
      skillId: skillId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateEmployeeSkill = async (
  employeeSkill: AddUpdateEmployeeSkill,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.updateEmployeeSkillInformation,
    method: AllowedHttpMethods.post,
    data: employeeSkill,
  })
  const response = await axios(requestConfig)
  return response.data
}

const deleteEmployeeSkill = async (
  skillId: number,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.deleteEmployeeSkill,
    method: AllowedHttpMethods.get,
    params: {
      skillId: skillId,
    },
    data: {
      skillId: skillId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const getEmployeeSkillsById = async (
  employeeId: string | number | undefined,
): Promise<EmployeeSkills[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeSkillsApiConfig.getEmployeeSkillsById,
    method: AllowedHttpMethods.get,
    params: {
      empId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeSkillApi = {
  getEmployeeSkills,
  getCategorySkills,
  addEmployeeSkill,
  getEmployeeSkillInformation,
  updateEmployeeSkill,
  deleteEmployeeSkill,
  getEmployeeSkillsById,
}

export default employeeSkillApi
