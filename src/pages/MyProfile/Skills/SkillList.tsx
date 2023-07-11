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

import AddNewSkill from './AddNewSkill'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import SkillListTable from './SkillListTable'
import { reduxServices } from '../../../reducers/reduxServices'

const SkillList = ({
  categoryId,
  categoryType,
  backButtonHandler,
}: {
  categoryId: number
  categoryType: string | undefined
  backButtonHandler: () => void
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const isLoading = useTypedSelector(reduxServices.skill.selectors.isLoading)
  const refreshList = useTypedSelector(
    reduxServices.skill.selectors.refreshList,
  )

  useEffect(() => {
    dispatch(reduxServices.skill.getAllSkills(categoryId))
    dispatch(reduxServices.skill.actions.setCurrentPage(1))
    dispatch(reduxServices.skill.actions.setPageSize(20))
  }, [dispatch, categoryId])

  useEffect(() => {
    if (refreshList) {
      dispatch(reduxServices.skill.getAllSkills(categoryId))
      dispatch(reduxServices.skill.actions.doneRefreshList())
    }
  }, [dispatch, categoryId, refreshList])

  return (
    <>
      {isLoading !== ApiLoadingState.loading ? (
        <>
          <CCardHeader>
            <h4 className="h4">Skill List for {categoryType} Category</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0">
            <CRow>
              <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end">
                <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </CCol>
              <CCol xs={12}>
                <AddNewSkill categoryId={categoryId} />
              </CCol>
              <CCol xs={12}>
                <SkillListTable />
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

export default SkillList
