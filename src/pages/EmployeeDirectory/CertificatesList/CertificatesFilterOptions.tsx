import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { useTypedSelector } from '../../../stateStore'
import { Link } from 'react-router-dom'
import certificatesApi from '../../../middleware/api/EmployeeDirectory/CertificatesList/certificatesListApi'
import { CertificatesFilterOptionsProps } from '../../../types/EmployeeDirectory/CertificatesList/certificatesListTypes'

const CertificatesFilterOptions = ({
  selectTechnology,
  setSelectTechnology,
  setFilterByTechnology,
  setFilterByCertificate,
  setMultiSearchValue,
  filterByTechnology,
  filterByCertificate,
  multiSearchValue,
  setIsAccordionItemShow,
}: CertificatesFilterOptionsProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectCertificate, setSelectCertificate] = useState<string>('')
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)

  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )

  const getCertificateByTechnology = useTypedSelector(
    (state) => state.employeeCertificates.typeOfCertificate,
  )

  const multiSearchButtonHandler = () => {
    setMultiSearchValue(searchInput)
    setIsAccordionItemShow(true)
  }

  const viewButtonHandler = () => {
    setFilterByTechnology(selectTechnology)
    setFilterByCertificate(selectCertificate)
    setIsAccordionItemShow(true)
  }

  const clearButtonHandler = () => {
    setSelectTechnology('')
    setSelectCertificate('')
    setFilterByTechnology('')
    setFilterByCertificate('')
    setMultiSearchValue('')
    setIsAccordionItemShow(false)
  }

  useEffect(() => {
    if (selectTechnology) {
      setIsViewBtnEnabled(true)
    } else {
      setIsViewBtnEnabled(false)
    }
  }, [selectCertificate, selectTechnology])

  const handleExportCertificatesData = async () => {
    const certificateListDownload =
      await certificatesApi.exportCertificatesData({
        selectionTechnology: filterByTechnology,
        selectedCertificate: filterByCertificate,
        multipleSearch: multiSearchValue,
      })
    downloadFile(certificateListDownload)
  }

  const downloadFile = (excelDownload: Blob | undefined) => {
    if (excelDownload) {
      const url = window.URL.createObjectURL(
        new Blob([excelDownload], {
          type: excelDownload.type,
        }),
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'CertificatesList.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  const sortedTechnologies = useMemo(() => {
    if (getTechnologies) {
      return getTechnologies
        .slice()
        .sort((technology1, technology2) =>
          technology1.name.localeCompare(technology2.name),
        )
    }
  }, [getTechnologies])

  return (
    <>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Technology:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="technology"
            data-testid="form-select1"
            name="technology"
            value={selectTechnology}
            onChange={(e) => {
              setSelectTechnology(e.target.value)
            }}
          >
            <option value={''}>Select Technology</option>
            {sortedTechnologies?.map((certificateItem, index) => (
              <option key={index} value={certificateItem.name}>
                {certificateItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={4}>
          <CRow>
            <CCol sm={4} lg={5} className="text-end">
              <CFormLabel className="mt-1">Certificate Type:</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="certificate"
                data-testid="form-select2"
                name="certificate"
                value={selectCertificate}
                onChange={(e) => {
                  setSelectCertificate(e.target.value)
                }}
              >
                <option value={''}>Select Certificate</option>
                {getCertificateByTechnology?.map(
                  (certificateTypeItem, index) => (
                    <option
                      key={index}
                      value={certificateTypeItem.certificateType}
                    >
                      {certificateTypeItem.certificateType}
                    </option>
                  ),
                )}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>

        <CCol xs={5} className="d-md-flex justify-content-md-end">
          <Link to={`/certificateTypeList`}>
            <CButton color="info btn-ovh me-0">
              <i className="fa fa-plus  me-1"></i>Add Certificate Type
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CRow className="mt-5 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            disabled={!isViewBtnEnabled}
            color="success btn-ovh me-1"
            onClick={viewButtonHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
        <CCol xs={3} className="d-md-flex justify-content-md-end">
          <CButton
            color="info btn-ovh me-0"
            onClick={handleExportCertificatesData}
          >
            <i className="fa fa-plus  me-1"></i>Click to Export
          </CButton>
        </CCol>
      </CRow>
      <CRow className="gap-2 d-md-flex justify-content-md-end">
        <CCol sm={6} md={4} lg={5} xl={4} xxl={3}>
          <CInputGroup className="global-search me-0">
            <CFormInput
              placeholder="Multiple Search"
              aria-label="Multiple Search"
              aria-describedby="button-addon2"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
            />
            <CButton
              disabled={!searchInput}
              data-testid="multi-search-btn"
              className="cursor-pointer"
              type="button"
              color="info"
              id="button-addon2"
              onClick={multiSearchButtonHandler}
            >
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default CertificatesFilterOptions
