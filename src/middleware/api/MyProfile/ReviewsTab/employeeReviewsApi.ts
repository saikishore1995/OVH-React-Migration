import { employeeReviewsApiConfig, AllowedHttpMethods } from '../../apiList'
import { EmployeeReview } from '../../../../types/MyProfile/ReviewsTab/employeeReviewsTypes'
import axios from 'axios'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
const getEmployeeReviews = async (
  employeeId: number | string,
): Promise<EmployeeReview[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeReviewsApiConfig.getEmployeeReviews,
    method: AllowedHttpMethods.get,
    params: {
      employeeId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data
}
const employeeReviewsApi = {
  getEmployeeReviews,
}
export default employeeReviewsApi
