import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import AddNewQualificationCategory from './AddNewQualificationCategory'
import { AddUpdateEmployeeQualificationProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'
import QualificationCategoryListTable from './QualificationCategoryListTable'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const QualificationCategoryList = ({
  backButtonHandler,
}: AddUpdateEmployeeQualificationProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const isLoading = useTypedSelector(
    reduxServices.employeeQualificationCategory.selectors.isLoading,
  )

  useEffect(() => {
    dispatch(
      reduxServices.employeeQualificationCategory.getQualificationCategories(),
    )
  }, [dispatch])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CCardHeader>
            <h4 className="h4">Qualification Detail List</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0">
            <CRow>
              <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
                <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </CCol>
              <CCol xs={12}>
                <AddNewQualificationCategory />
              </CCol>
              <CCol xs={12}>
                <QualificationCategoryListTable />
              </CCol>
            </CRow>
          </CCardBody>
        </>
      ) : (
        <CCol>
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default QualificationCategoryList
