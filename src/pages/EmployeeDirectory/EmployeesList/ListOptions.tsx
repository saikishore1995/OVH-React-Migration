import { CButton, CFormCheck } from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { EmploymentStatus } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import React from 'react'
import employeeListApi from '../../../middleware/api/EmployeeDirectory/EmployeesList/employeeListApi'
import { reduxServices } from '../../../reducers/reduxServices'

const ListOptions = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeList.selectors.selectedEmploymentStatus,
  )

  const handleChangeSelectedEmploymentStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      reduxServices.employeeList.actions.changeSelectedEmploymentStatus(
        event.target.value,
      ),
    )
  }

  const handleExportEmployeeData = async () => {
    const employeeListDownload = await employeeListApi.exportEmployeeData({
      searchStr: '',
      selectionStatus: selectedEmploymentStatus,
    })
    downloadFile(employeeListDownload)
  }

  const downloadFile = (cvDownload: Blob | undefined) => {
    if (cvDownload) {
      const url = window.URL.createObjectURL(
        new Blob([cvDownload], {
          type: cvDownload.type,
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'EmployeeList.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  return (
    <div className="pull-right mb-3">
      <div className="d-inline">
        <CFormCheck
          type="radio"
          name="employmentStatus"
          value={EmploymentStatus.active}
          id="employmentActive"
          label="Active"
          defaultChecked={selectedEmploymentStatus === EmploymentStatus.active}
          onChange={handleChangeSelectedEmploymentStatus}
          inline
        />
        <CFormCheck
          type="radio"
          name="employmentStatus"
          value={EmploymentStatus.contract}
          id="employmentContract"
          label="Employment Contract"
          defaultChecked={
            selectedEmploymentStatus === EmploymentStatus.contract
          }
          onChange={handleChangeSelectedEmploymentStatus}
          inline
        />
        <CFormCheck
          type="radio"
          name="employmentStatus"
          value={EmploymentStatus.inactive}
          id="employmentInactive"
          label="Inactive"
          defaultChecked={
            selectedEmploymentStatus === EmploymentStatus.inactive
          }
          onChange={handleChangeSelectedEmploymentStatus}
          inline
        />
        <CFormCheck
          type="radio"
          name="employmentStatus"
          value={EmploymentStatus.pip}
          id="employmentUnderNotice"
          label="PIP"
          defaultChecked={selectedEmploymentStatus === EmploymentStatus.pip}
          onChange={handleChangeSelectedEmploymentStatus}
          inline
        />
      </div>
      <div className="d-inline ml15">
        <CButton
          color="info"
          className="text-white"
          size="sm"
          onClick={handleExportEmployeeData}
        >
          <i className="fa fa-plus me-1"></i>
          Click to Export Employee List
        </CButton>
        &nbsp; &nbsp; &nbsp;
        <CButton color="info" className="text-white" size="sm">
          <i className="fa fa-plus me-1"></i>
          Add Employee
        </CButton>
      </div>
    </div>
  )
}

export default ListOptions
