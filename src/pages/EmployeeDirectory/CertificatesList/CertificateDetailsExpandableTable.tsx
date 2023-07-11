import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCol,
  CLink,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'

import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import React from 'react'
import parse from 'html-react-parser'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { CertificateDetailsExpandableTableProps } from '../../../types/EmployeeDirectory/CertificatesList/certificatesListTypes'

const CertificateDetailsExpandableTable = (
  props: CertificateDetailsExpandableTableProps,
): JSX.Element => {
  const employeesCertificates = useTypedSelector(
    reduxServices.certificateList.selectors.employeesCertificates,
  )

  const listSize = useTypedSelector(
    reduxServices.certificateList.selectors.listSize,
  )

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
      {employeesCertificates.length ? (
        <>
          <CAccordion
            alwaysOpen
            activeItemKey={accordionItemShow}
            flush
            className="expandable-table mb-4 mt-4"
          >
            {employeesCertificates.map((currEmployeeCertificates, index) => {
              return (
                <React.Fragment key={index}>
                  <CAccordionItem itemKey={1}>
                    <CAccordionHeader>
                      <span
                        className="title-sm expandable-table-title"
                        data-testid="accordion-header-span"
                      >
                        {currEmployeeCertificates.empName}
                      </span>
                    </CAccordionHeader>
                    <CAccordionBody>
                      <CTable responsive striped>
                        <CTableHead color="info">
                          <CTableRow>
                            <CTableHeaderCell>#</CTableHeaderCell>
                            <CTableHeaderCell>Technology</CTableHeaderCell>
                            <CTableHeaderCell>
                              Certificate Type
                            </CTableHeaderCell>
                            <CTableHeaderCell>Certification</CTableHeaderCell>
                            <CTableHeaderCell>Registration No</CTableHeaderCell>
                            <CTableHeaderCell>Completed Date</CTableHeaderCell>
                            <CTableHeaderCell>Expiry Date</CTableHeaderCell>
                            <CTableHeaderCell>Percentage</CTableHeaderCell>
                            <CTableHeaderCell>Description</CTableHeaderCell>
                          </CTableRow>
                        </CTableHead>
                        <CTableBody>
                          {currEmployeeCertificates.certificationDtos.map(
                            (currentCertificate, currentCertificateIndex) => {
                              const descriptionLimit =
                                currentCertificate.description &&
                                currentCertificate.description.length > 30
                                  ? `${currentCertificate.description.substring(
                                      0,
                                      30,
                                    )}...`
                                  : currentCertificate.description
                              return (
                                <CTableRow key={currentCertificateIndex}>
                                  <CTableDataCell>
                                    {currentCertificateIndex + 1}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.technology || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.certificateType ||
                                      'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.name || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.code || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.completedDate || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.expiryDate || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.percent || 'N/A'}
                                  </CTableDataCell>
                                  <CTableDataCell>
                                    {currentCertificate.description ? (
                                      <CLink className="cursor-pointer text-decoration-none text-primary">
                                        {parse(descriptionLimit as string)}
                                      </CLink>
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

export default CertificateDetailsExpandableTable
