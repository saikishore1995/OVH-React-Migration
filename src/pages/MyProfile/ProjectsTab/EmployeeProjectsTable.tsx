import {
  CCardBody,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import EmployeeProjectsEntry from './EmployeeProjectsEntry'

const EmployeeProjectsTable = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeProjects = useTypedSelector(
    reduxServices.employeeProjects.selectors.employeeProjects,
  )

  useEffect(() => {
    setIsLoading(true)
    employeeId &&
      dispatch(reduxServices.employeeProjects.getEmployeeProjects(employeeId))
  }, [dispatch, employeeId])

  useEffect(() => {
    if (employeeProjects) setIsLoading(false)
  }, [employeeProjects])

  return (
    <>
      <CCardBody className="ps-0 pe-0">
        <CTable className="text-left" striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Client</CTableHeaderCell>
              <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {!isLoading ? (
              employeeProjects &&
              employeeProjects.Projs?.map((project, index) => (
                <EmployeeProjectsEntry
                  id={index}
                  project={project}
                  key={index}
                />
              ))
            ) : (
              <CTableRow color="default" className="text-center">
                <CTableDataCell colSpan={8}>
                  <CSpinner data-testid="employee-loader" />
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </>
  )
}

export default EmployeeProjectsTable
