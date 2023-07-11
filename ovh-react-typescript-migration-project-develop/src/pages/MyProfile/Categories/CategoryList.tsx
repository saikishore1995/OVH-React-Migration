import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { AddEditEmployeeSkillsProps } from '../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import AddNewCategory from './AddNewCategory'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import CategoryListTable from './CategoryListTable'
import { reduxServices } from '../../../reducers/reduxServices'

const CategoryList = ({
  backButtonHandler,
}: AddEditEmployeeSkillsProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(reduxServices.category.selectors.isLoading)

  useEffect(() => {
    dispatch(reduxServices.category.getAllCategories())
    dispatch(reduxServices.category.actions.setCurrentPage(1))
    dispatch(reduxServices.category.actions.setPageSize(20))
  }, [dispatch])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CCardHeader>
            <h4 className="h4">Category List</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0">
            <CRow>
              <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
                <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </CCol>
              <CCol xs={12}>
                <AddNewCategory />
              </CCol>
              <CCol xs={12}>
                <CategoryListTable />
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

export default CategoryList
