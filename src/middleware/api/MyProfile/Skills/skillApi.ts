import { AllowedHttpMethods, skillsApiConfig } from '../../apiList'

import { Skill } from '../../../../types/MyProfile/Skills/skillTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getAllSkills = async (categoryId: number): Promise<Skill[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.getSkillListForCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId: categoryId },
    data: { categoryId: categoryId },
  })

  const response = await axios(requestConfig)
  return response.data
}

const createSkill = async (
  categoryId: number,
  skillName: string,
): Promise<Skill[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.addNewSkillForCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryId: categoryId,
      skillName: skillName,
    },
    data: {
      categoryId: categoryId,
      skillName: skillName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteSkill = async (skillId: number): Promise<Skill[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: skillsApiConfig.deleteSkillForCategory,
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

const skillApi = { getAllSkills, createSkill, deleteSkill }

export default skillApi
