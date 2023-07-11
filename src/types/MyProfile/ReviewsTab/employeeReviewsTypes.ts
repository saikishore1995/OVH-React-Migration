import { ValidationError } from '../../commonTypes'
export type EmployeeReview = {
  id: number
  empId: number
  employeeName: string
  formStatus: string
  formStatusvalue: number
  appraisalFormStatus: null
  overallAvgRating: number
  finalRating: null
  pendingWith: null
  empDepartmentName: string
  empDesignationName: string
  empAvgRating: number
  manager1Name: string
  cycleStartDate: string
}

export type ReviewsTabState = {
  employeeReviews: EmployeeReview[]
  isLoading: boolean
  error: ValidationError
}
