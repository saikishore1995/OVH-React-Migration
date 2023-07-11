import {
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTable,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  EmployeeProjectDetailInterface,
  ProjectDetails,
} from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'

const EmployeeProjectsDetail = (
  props: EmployeeProjectDetailInterface,
): JSX.Element => {
  const [projectDetails, setProjectDetails] = useState<
    ProjectDetails | undefined
  >(undefined)
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const allProjectDetails = useTypedSelector(
    reduxServices.employeeProjects.selectors.projectDetails,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeProjects.getProjectDetails(props.projectId))
  }, [dispatch, props.projectId])

  useEffect(() => {
    if (allProjectDetails?.length) {
      allProjectDetails
        .filter(
          (allProjectDetails) =>
            allProjectDetails.employeeId !== (employeeId as unknown as number),
        )
        .map((filtered: ProjectDetails) => {
          if (filtered.projectId === props.projectId) {
            setProjectDetails(filtered)
          }
          return filtered
        })
    }
  }, [allProjectDetails, employeeId, props.projectId])

  return (
    <>
      <CTable className="mt-2 text-center profile-tab-table-size">
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              ID
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Designation
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Allocation
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              End Date
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Billable
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Current Status
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {projectDetails ? (
            <CTableRow>
              <CTableDataCell scope="row">{props.projectId}</CTableDataCell>
              <CTableDataCell scope="row">
                {projectDetails.empFirstName + ' ' + projectDetails.empLastName}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {projectDetails.desigination}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {projectDetails.allocation}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {projectDetails.endDate}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {projectDetails.billable ? 'Yes' : 'No'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {projectDetails.isAllocated ? 'Allocated' : 'Not Allocated'}
              </CTableDataCell>
            </CTableRow>
          ) : (
            <CTableRow color="default" className="text-center">
              <CTableDataCell colSpan={7}>
                <CSpinner />
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeProjectsDetail
