import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CBadge,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { currentPageData } from '../../../utils/paginationUtils'
import { usePagination } from '../../../middleware/hooks/usePagination'
const EmployeeReviews = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeReviews = useTypedSelector(
    reduxServices.employeeReviews.selectors.employeeReviews,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.employeeReviews.getEmployeeReviews(employeeId))
  }, [dispatch, employeeId])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(employeeReviews.length, 20)

  useEffect(() => {
    setPageSize(20)
  }, [employeeReviews, setPageSize, setCurrentPage])

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const currentPageItems = useMemo(
    () => currentPageData(employeeReviews, currentPage, pageSize),
    [employeeReviews, currentPage, pageSize],
  )

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Review List</h4>
      </CCardHeader>
      <br />
      <CCardBody className="ps-0 pe-0">
        {employeeReviews.length ? (
          <>
            <CTable striped className="text-center">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Manager Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Emp Avg Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Managers Avg Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentPageItems.map((review, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell scope="row">
                        {getItemNumber(index)}
                      </CTableDataCell>
                      <CTableDataCell scope="row">{review.id}</CTableDataCell>
                      <CTableDataCell scope="row">
                        {review.employeeName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {review.manager1Name}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {review.empDepartmentName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {review.empDesignationName}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {review.cycleStartDate}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {review.empAvgRating}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        {review.overallAvgRating || 'N/A'}
                      </CTableDataCell>
                      <CTableDataCell scope="row">
                        <CBadge color="success"> {review.formStatus}</CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
            <br />
            <CRow>
              <CCol xs={4}>
                <p>
                  <strong>Total Records: {employeeReviews.length}</strong>
                </p>
              </CCol>
              <CCol xs={3}>
                {employeeReviews.length > 20 && (
                  <OPageSizeSelect
                    handlePageSizeSelectChange={handlePageSizeSelectChange}
                  />
                )}
              </CCol>
              {employeeReviews.length > 20 && (
                <CCol
                  xs={5}
                  className="d-grid gap-2 d-md-flex justify-content-md-end"
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
          <>
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Employee Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Manager Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Month</CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Emp Avg Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">
                    Managers Avg Rating
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
            </CTable>
            <br />
            <CCol xs={4}>
              <p>
                <strong>No Records Found... </strong>
              </p>
            </CCol>
          </>
        )}
      </CCardBody>
    </>
  )
}
export default EmployeeReviews
