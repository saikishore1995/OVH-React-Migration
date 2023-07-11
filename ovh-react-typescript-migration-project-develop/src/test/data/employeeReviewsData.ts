import { EmployeeReview } from '../../types/MyProfile/ReviewsTab/employeeReviewsTypes'
export const mockReviewDetails: EmployeeReview[] = [
  {
    id: 3,
    empId: 1000,
    employeeName: 'Admin Rbt',
    formStatus: 'COMPLETED',
    formStatusvalue: 5,
    appraisalFormStatus: null,
    overallAvgRating: 7.52,
    finalRating: null,
    pendingWith: null,
    empDepartmentName: 'Development',
    empDesignationName: 'Associate Software Engineer',
    empAvgRating: 8.42,
    manager1Name: 'Ajay Gupta',
    cycleStartDate: 'Jan 2016-Dec 2016',
  },
  {
    id: 216,
    empId: 1000,
    employeeName: 'Admin Rbt',
    formStatus: 'COMPLETED',
    formStatusvalue: 5,
    appraisalFormStatus: null,
    overallAvgRating: NaN,
    finalRating: null,
    pendingWith: null,
    empDepartmentName: 'Development',
    empDesignationName: 'Associate Software Engineer',
    empAvgRating: 9.73,
    manager1Name: 'Ajay Gupta',
    cycleStartDate: 'May 2017',
  },
]