import { AllowedHttpMethods, categoriesApiConfig } from '../../apiList'

import { Category } from '../../../../types/MyProfile/Categories/categoryTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'

const getAllCategories = async (): Promise<Category[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.getAllCategories,
    method: AllowedHttpMethods.get,
  })

  const response = await axios(requestConfig)
  return response.data
}

const createCategory = async (categoryName: string): Promise<Category[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.addCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryName: categoryName,
    },
    data: {
      categoryName: categoryName,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const deleteCategory = async (categoryId: number): Promise<Category[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: categoriesApiConfig.deleteCategory,
    method: AllowedHttpMethods.get,
    params: {
      categoryId: categoryId,
    },
    data: {
      categoryId: categoryId,
    },
  })

  const response = await axios(requestConfig)
  return response.data
}

const categoryApi = {
  getAllCategories,
  createCategory,
  deleteCategory,
}

export default categoryApi
