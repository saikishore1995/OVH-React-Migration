import { CButton, CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'

import AddEmployeeDesignation from './AddEmployeeDesignation'
import EmployeeDesignationListTable from './EmployeeDesignationListTable'
import OCard from '../../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'

const EmployeeDesignationList = (): JSX.Element => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.employeeDesignation.getEmployeeDepartments())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Designation List"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end pe-0">
            <CButton color="info btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
          <CCol xs={12} className="mt-2 mb-2 ps-0 pe-0">
            <AddEmployeeDesignation
              selectedDepartmentId={selectedDepartmentId as number}
              setSelectedDepartmentId={setSelectedDepartmentId}
            />
          </CCol>
          <CCol xs={12} className="mt-3 mb-3 ps-0 pe-0">
            <EmployeeDesignationListTable
              selectedDepartmentId={selectedDepartmentId as number}
            />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EmployeeDesignationList
