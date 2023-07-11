import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
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

import { CertificateDetailsExpandableTableProps } from '../../../types/EmployeeDirectory/CertificatesList/certificatesListTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const VisaListExpandableTable = (
  props: CertificateDetailsExpandableTableProps,
): JSX.Element => {
  const visaList = useTypedSelector(reduxServices.visaList.selectors.visaList)

  const listSize = useTypedSelector(reduxServices.visaList.selectors.listSize)

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    isAccordionItemShow,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const accordionItemShow = isAccordionItemShow ? 1 : 0

  return (
    <>
      {visaList.length ? (
        <>
          <CAccordion
            alwaysOpen
            activeItemKey={accordionItemShow}
            flush
            className="expandable-table mb-4 mt-4"
          >
            {visaList.map((visaItem, index) => {
              return (
                <React.Fragment key={index}>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader>
                      <span
                        className="title-sm expandable-table-title"
                        data-testid="accordion-header-span"
                      >
                        {visaItem.empName}
                      </span>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CTable responsive striped>
                        <CTableHead color="info">
                          <CTableRow>
                            <CTableHeaderCell>#</CTableHeaderCell>
                            <CTableHeaderCell>Country</CTableHeaderCell>
                            <CTableHeaderCell>Visa Type</CTableHeaderCell>
                            <CTableHeaderCell>Date of Issue</CTableHeaderCell>
                            <CTableHeaderCell>Date of Expire</CTableHeaderCell>
                            <CTableHeaderCell>Visa Copy</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {visaItem.visaDetailsDtos.map(
                            (currentVisa, currentVisaIndex) => {
                              return (
                                <CTableRow key={currentVisaIndex}>
                                  <CTableDataCell>
                                    {currentVisaIndex + 1}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentVisa.countryName || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentVisa.visaType || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentVisa.dateOfIssue || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentVisa.dateOfExpire || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentVisa.visaDetailsData ? (
                                      <CImage
                                        src={`data:image/jpeg;base64,${currentVisa.visaDetailsData}`}
                                        className="visa-list-copy-image"
                                      />
                                    ) : (
                                      'N/A'
                                    )}
                                  </CTableDataCell>
                                </CTableRow>
                              )
                            },
                          )}
                        </CTableBody>
                      </CTable>
                    </CAccordionBody>
                  </CAccordionItem>
                </React.Fragment>
              )
            })}
          </CAccordion>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {listSize}</strong>
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
        <CRow className="mt-4">
          <h5>No Records Found... </h5>
        </CRow>
      )}
    </>
  )
}

export default VisaListExpandableTable
