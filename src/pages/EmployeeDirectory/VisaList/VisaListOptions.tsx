import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'

import { VisaListOptionsProps } from '../../../types/EmployeeDirectory/VisaList/visaListTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import visaListApi from '../../../middleware/api/EmployeeDirectory/VisaList/visaListApi'

const VisaListOptions = ({
  selectCountry,
  setSelectCountry,
  setFilterByCountry,
  setFilterByVisaType,
  setMultiSearchValue,
  filterByCountry,
  filterByVisaType,
  multiSearchValue,
  setIsAccordionItemShow,
}: VisaListOptionsProps): JSX.Element => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [selectVisaType, setSelectVisaType] = useState<string>('')
  const [isViewBtnEnabled, setIsViewBtnEnabled] = useState<boolean>(false)

  const countries = useTypedSelector(reduxServices.visaList.selectors.countries)

  const visaTypes = useTypedSelector(reduxServices.visaList.selectors.visaTypes)

  const multiSearchButtonHandler = () => {
    setMultiSearchValue(searchInput)
    setIsAccordionItemShow(true)
  }

  const viewButtonHandler = () => {
    setFilterByCountry(selectCountry)
    setFilterByVisaType(selectVisaType)
    setIsAccordionItemShow(true)
  }

  const clearButtonHandler = () => {
    setSelectCountry('')
    setSelectVisaType('')
    setFilterByCountry('')
    setFilterByVisaType('')
    setMultiSearchValue('')
    setSearchInput('')
    setIsAccordionItemShow(false)
  }

  useEffect(() => {
    if (selectCountry) {
      setIsViewBtnEnabled(true)
    } else {
      setIsViewBtnEnabled(false)
    }
  }, [selectVisaType, selectCountry])

  const handleVisaListDownload = async () => {
    const visaListDownload = await visaListApi.exportVisaList({
      countryId: filterByCountry,
      visaTypeId: filterByVisaType,
      multipleSearch: multiSearchValue,
    })
    downloadFile(visaListDownload)
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
      link.setAttribute('download', 'EmployeeVisaList.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  }

  return (
    <>
      <CRow>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel className="mt-1">Country:</CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="technology"
            data-testid="form-select1"
            name="technology"
            value={selectCountry}
            onChange={(e) => {
              setSelectCountry(e.target.value)
            }}
          >
            <option value={''}>Select Country</option>
            {countries?.map((country, index) => (
              <option key={index} value={country.id}>
                {country.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={4}>
          <CRow>
            <CCol sm={4} lg={5} className="text-end">
              <CFormLabel className="mt-1">Visa Type:</CFormLabel>
            </CCol>
            <CCol sm={6}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="certificate"
                data-testid="form-select2"
                name="certificate"
                value={selectVisaType}
                onChange={(e) => {
                  setSelectVisaType(e.target.value)
                }}
              >
                <option value={''}>Select Visa</option>
                {visaTypes?.map((visaType, index) => (
                  <option key={index} value={visaType.visaTypeId}>
                    {visaType.visaType}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      <CRow className="mt-5 mb-4">
        <CCol sm={{ span: 6, offset: 3 }}>
          <CButton
            className="cursor-pointer"
            disabled={!isViewBtnEnabled}
            color="success btn-ovh me-1"
            onClick={viewButtonHandler}
            data-testid="form-button1"
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            onClick={clearButtonHandler}
            data-testid="form-button2"
          >
            Clear
          </CButton>
        </CCol>
        <CCol xs={3} className="d-md-flex justify-content-md-end">
          <CButton color="info btn-ovh me-0" onClick={handleVisaListDownload}>
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

export default VisaListOptions
