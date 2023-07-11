import {
  CButton,
  CCol,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import { EmployeeListTableProps } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeListTable = (props: EmployeeListTableProps): JSX.Element => {
  const employees = useTypedSelector(
    reduxServices.employeeList.selectors.employees,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeList.selectors.listSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      {employees.length ? (
        <>
          <CTable striped>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
                <CTableHeaderCell scope="col" className="text-center">
                  Mobile
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                <CTableHeaderCell scope="col">Blood Group</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date of Joining</CTableHeaderCell>
                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {employees.map((employee, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <CImage
                        src={employee.thumbPicture}
                        className="employee-thumb"
                      />
                    </CTableHeaderCell>
                    <CTableDataCell>{employee.id}</CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/employeeProfile/${employee.id}`}
                        className="employee-name"
                      >
                        {employee.fullName}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>{employee.emailId}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {employee.mobile}
                    </CTableDataCell>
                    <CTableDataCell>{employee.designation}</CTableDataCell>
                    <CTableDataCell>{employee.departmentName}</CTableDataCell>
                    <CTableDataCell>{employee.bloodgroup}</CTableDataCell>
                    <CTableDataCell>{employee.dateOfJoining}</CTableDataCell>
                    <CTableDataCell>{employee.country}</CTableDataCell>
                    <CTableDataCell>
                      <Link to={`/employeeProfile/${employee.id}`}>
                        <CButton color="info" size="sm">
                          <i className="fa fa-eye text-white"></i>
                        </CButton>
                      </Link>
                      &nbsp;
                      <CButton color="info" size="sm">
                        <i className="fa fa-pencil-square-o text-white"></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {employees.length}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {listSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {listSize > 20 && (
              <CCol
                xs={5}
                className="d-grid gap-1 d-md-flex justify-content-md-end"
              >
                <OPagination
                  currentPage={currentPage}
                  pageSetter={setCurrentPage}
                  paginationRange={paginationRange}
                />
              </CCol>
            )}
          </CRow>
        </>
      ) : (
        <CCol>
          <CRow className="category-no-data">
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default EmployeeListTable
