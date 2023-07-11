import { CCol, CRow, CSpinner } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import OCard from '../../../components/ReusableComponent/OCard'
import VisaListExpandableTable from './VisaListExpandableTable'
import VisaListOptions from './VisaListOptions'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const VisaList = (): JSX.Element => {
  const [filterByCountry, setFilterByCountry] = useState<string>('')
  const [filterByVisaType, setFilterByVisaType] = useState<string>('')
  const [multiSearchValue, setMultiSearchValue] = useState<string>('')
  const [selectCountry, setSelectCountry] = useState<string>('')
  const [isAccordionItemShow, setIsAccordionItemShow] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const listSize = useTypedSelector(reduxServices.visaList.selectors.listSize)

  const isLoading = useTypedSelector(reduxServices.visaList.selectors.isLoading)

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(listSize, 20)

  useEffect(() => {
    dispatch(reduxServices.visaList.getCountries())
  }, [dispatch])

  useEffect(() => {
    if (selectCountry) {
      dispatch(reduxServices.visaList.getVisaTypes(Number(selectCountry)))
    }
  }, [dispatch, selectCountry])

  useEffect(() => {
    dispatch(
      reduxServices.visaList.getVisaList({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        multipleSearch: multiSearchValue,
        visaTypeId: filterByVisaType,
        countryId: filterByCountry,
      }),
    )
  }, [
    currentPage,
    dispatch,
    multiSearchValue,
    pageSize,
    filterByVisaType,
    filterByCountry,
  ])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Visa Details"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow>
          <CCol xs={12}>
            <VisaListOptions
              selectCountry={selectCountry}
              setSelectCountry={setSelectCountry}
              setFilterByCountry={setFilterByCountry}
              setFilterByVisaType={setFilterByVisaType}
              setMultiSearchValue={setMultiSearchValue}
              filterByCountry={filterByCountry}
              filterByVisaType={filterByVisaType}
              multiSearchValue={multiSearchValue}
              setIsAccordionItemShow={setIsAccordionItemShow}
            />
          </CCol>
          {isLoading !== ApiLoadingState.loading ? (
            <CCol xs={12}>
              <VisaListExpandableTable
                paginationRange={paginationRange}
                setPageSize={setPageSize}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                pageSize={pageSize}
                isAccordionItemShow={isAccordionItemShow}
              />
            </CCol>
          ) : (
            <CCol>
              <CRow className="category-loading-spinner">
                <CSpinner />
              </CRow>
            </CCol>
          )}
        </CRow>
      </OCard>
    </>
  )
}

export default VisaList
