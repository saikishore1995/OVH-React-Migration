import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import EmployeeListTable from './EmployeeListTable'
import ListOptions from './ListOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const EmployeeList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const listSize = useTypedSelector(
    reduxServices.employeeList.selectors.listSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.employeeList.selectors.isLoading,
  )
  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeList.selectors.selectedEmploymentStatus,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.employeeList.getEmployees({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        selectionStatus: selectedEmploymentStatus,
      }),
    )
  }, [currentPage, dispatch, pageSize, selectedEmploymentStatus])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Employee Directory"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        {isLoading !== ApiLoadingState.loading ? (
          <>
            <ListOptions />
            <EmployeeListTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </>
        ) : (
          <CCol>
            <CRow className="category-loading-spinner">
              <CSpinner />
            </CRow>
          </CCol>
        )}
      </OCard>
    </>
  )
}

export default EmployeeList
