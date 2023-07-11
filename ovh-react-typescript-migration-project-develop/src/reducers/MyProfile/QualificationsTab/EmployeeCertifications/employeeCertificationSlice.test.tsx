import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { EditEmployeeCertificate } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import employeeCertificationsSlice from '../../../../reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'

describe('Certification Section Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeCertificationsSlice(initialState, action)
    expect(result).toEqual({
      editCertificateDetails: {} as EditEmployeeCertificate,
      getAllTechnologies: [],
      typeOfCertificate: [],
      certificationDetails: [],
      selectedEmployeeCertifications: [],
      error: null,
      isLoading: ApiLoadingState.idle,
    })
  })
})
