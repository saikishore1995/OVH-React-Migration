import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import {
  EmployeeCertification,
  EmployeeCertificationProps,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import DatePicker from 'react-datepicker'
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import OToast from '../../../../components/ReusableComponent/OToast'
import moment from 'moment'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

function AddUpdateEmployeeCertification({
  isEditCertificationDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: EmployeeCertificationProps): JSX.Element {
  const initialCertificationDetails = {} as EmployeeCertification

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [addCertification, setAddCertification] = useState(
    initialCertificationDetails,
  )
  const [completedDate, setCompletedDate] = useState<Date | string>()
  const [expiryDate, setExpiryDate] = useState<Date | string>()
  const [error, setError] = useState<boolean>(false)

  const [completedDateFlag, setCompletedDateFlag] = useState<boolean>(false)
  const [expiryDateFlag, setExpirtyDateFlag] = useState<boolean>(false)

  const [showEditor, setShowEditor] = useState<boolean>(false)

  const getTechnologies = useTypedSelector(
    reduxServices.employeeCertifications.selectors.technologies,
  )
  const getCertificateByTechnology = useTypedSelector(
    reduxServices.employeeCertifications.selectors.certificateByTechnology,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const getCertificateDetails = useTypedSelector(
    reduxServices.employeeCertifications.selectors.certificateDetails,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
  }, [dispatch])

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
    if (addCertification?.technology) {
      dispatch(
        reduxServices.employeeCertifications.getCertificateByTechnologyName(
          addCertification?.technology,
        ),
      )
    }
  }, [dispatch, addCertification?.technology])

  const currentCompletedDate = addCertification.completedDate as string
  const completedDateParts: string[] | string = addCertification.completedDate
    ? currentCompletedDate.split('/')
    : ''
  const newCompletedDate = addCertification.completedDate
    ? new Date(
        Number(completedDateParts[2]),
        Number(completedDateParts[1]) - 1,
        Number(completedDateParts[0]),
      )
    : new Date()

  const currentExpiryDate = addCertification.expiryDate as string
  const expirtyDateParts: string[] | string = addCertification.expiryDate
    ? currentExpiryDate.split('/')
    : ''
  const newExpiryDate = addCertification.expiryDate
    ? new Date(
        Number(expirtyDateParts[2]),
        Number(expirtyDateParts[1]) - 1,
        Number(expirtyDateParts[0]),
      )
    : new Date()

  const successToastMessage = (
    <OToast
      toastMessage="Your changes have been saved successfully.."
      toastColor="success"
    />
  )

  useEffect(() => {
    if (isEditCertificationDetails) {
      setAddCertification(getCertificateDetails)
    }
  }, [getCertificateDetails, isEditCertificationDetails])

  useEffect(() => {
    if (getCertificateDetails?.description) {
      setShowEditor(false)
      setTimeout(() => {
        setShowEditor(true)
      }, 100)
    }
  }, [getCertificateDetails])

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }

  const onChangeDateOfCompletionHandler = (date: Date) => {
    const currentDateExpiry = isEditCertificationDetails
      ? (addCertification.expiryDate as string)
      : (expiryDate as string)

    const dateParts: string[] | string = addCertification.expiryDate
      ? currentDateExpiry.split('/')
      : ''
    const newDateExpiry = addCertification.expiryDate
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(expiryDate as Date)

    validateDates(date, newDateExpiry)

    if (isEditCertificationDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'completedDate'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
    setCompletedDate(date)
    setCompletedDateFlag(true)
  }

  const onChangeDateOfExpireHandler = (date: Date) => {
    const currentDateCompleted = isEditCertificationDetails
      ? (addCertification.completedDate as string)
      : (completedDate as string)

    const dateParts: string[] | string = addCertification.completedDate
      ? currentDateCompleted.split('/')
      : ''
    const newDateCompleted = addCertification.completedDate
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(completedDate as Date)

    validateDates(newDateCompleted, date)

    if (isEditCertificationDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'expiryDate'
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
    setExpiryDate(date)
    setExpirtyDateFlag(true)
  }

  useEffect(() => {
    if (error) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastMessage="Date of Expiry should be greater"
            toastColor="danger"
          />,
        ),
      )
    }
  }, [completedDate, dispatch, error, expiryDate])

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'code') {
      const registrationNumber = value.replace(/\s/g, '')
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: registrationNumber } }
      })
    } else if (name === 'name') {
      const certificate = value.replace(/^\s*/, '')
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: certificate } }
      })
    } else if (name === 'percent') {
      let percentValue = Number(value.replace(/[^0-9]/g, ''))
      if (percentValue > 100) percentValue = 100
      setAddCertification((prevState) => {
        return { ...prevState, ...{ [name]: percentValue } }
      })
    } else if (name === 'technology') {
      setAddCertification((values) => {
        return { ...values, ...{ [name]: value, certificateType: '' } }
      })
    } else {
      setAddCertification((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (
      addCertification.technology &&
      addCertification.certificateType &&
      addCertification.name &&
      addCertification.code &&
      (completedDate || addCertification.completedDate)
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [addCertification, completedDate])

  const handleClearInputFields = () => {
    setAddCertification({
      id: 0,
      technologyId: '',
      technologyName: '',
      certificateType: '',
      technology: '',
      code: '',
      percent: 0,
      name: '',
    })
    setCompletedDate('')
    setExpiryDate('')
    setError(false)
  }

  const handleAddCertificateDetails = async () => {
    const prepareObject = {
      ...addCertification,
      ...{
        completedDate: moment(completedDate).format('DD/MM/YYYY'),
        expiryDate: moment(expiryDate).format('DD/MM/YYYY'),
        employeeId: employeeId,
      },
    }
    const addCertificateResultAction = await dispatch(
      reduxServices.employeeCertifications.createEmployeeCertification(
        prepareObject,
      ),
    )

    if (
      reduxServices.employeeCertifications.createEmployeeCertification.fulfilled.match(
        addCertificateResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const handleUpdateCertificationDetails = async () => {
    const prepareObject = {
      ...addCertification,
    }
    const updateCertificateResultAction = await dispatch(
      reduxServices.employeeCertifications.updateEmployeeCertificate(
        prepareObject,
      ),
    )
    if (
      reduxServices.employeeCertifications.updateEmployeeCertificate.fulfilled.match(
        updateCertificateResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
  }

  const handleDescription = (description: string) => {
    setAddCertification((prevState) => {
      return { ...prevState, ...{ description: description } }
    })
  }

  const validateDates = (startDate: Date, endDate: Date) => {
    const newStartDate = startDate.setHours(0, 0, 0, 0)
    const newEndtDate = endDate.setHours(0, 0, 0, 0)
    if (newStartDate > newEndtDate) {
      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <>
      <CCardHeader>
        <h4 className="h4">{headerTitle}</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps(
                  'technology',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              Technology:
              <span
                className={
                  addCertification.technology ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                id="technology"
                name="technology"
                value={addCertification?.technology}
                onChange={handleInputChange}
              >
                <option value={''}>Select Technology</option>
                {getTechnologies?.map((certificateItem, index) => (
                  <option key={index} value={certificateItem.name}>
                    {certificateItem.name}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps(
                  'certificateType',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              CertificateType:{' '}
              <span
                className={
                  addCertification.certificateType
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                id="certificateType"
                name="certificateType"
                disabled={!addCertification.technology}
                value={addCertification?.certificateType}
                onChange={handleInputChange}
              >
                <option value={''}>Select Type of Certificate</option>
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
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps(
                  'certification',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              Certification:
              <span
                className={addCertification.name ? 'text-white' : 'text-danger'}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="certification"
                name="name"
                value={addCertification?.name}
                placeholder="Certification Name"
                maxLength={50}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...{
                ...dynamicFormLabelProps(
                  'registrationNumber',
                  'col-sm-3 col-form-label text-end',
                ),
              }}
            >
              Registration No:
              <span
                className={addCertification.code ? 'text-white' : 'text-danger'}
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="registrationNumber"
                name="code"
                value={addCertification?.code}
                placeholder="Certification Id"
                maxLength={24}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Completed Date:
              <span
                className={
                  addCertification?.completedDate || completedDate
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="completedDate"
                maxDate={new Date()}
                value={
                  (completedDate as string) ||
                  (addCertification?.completedDate as string)
                }
                selected={
                  !completedDateFlag
                    ? addCertification.completedDate
                      ? newCompletedDate
                      : (completedDate as Date)
                    : (completedDate as Date)
                }
                onChange={onChangeDateOfCompletionHandler}
                id="completedDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Expiry Date :
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="expiryDate"
                value={
                  (expiryDate as string) ||
                  (addCertification?.expiryDate as string)
                }
                selected={
                  !expiryDateFlag
                    ? addCertification.expiryDate
                      ? newExpiryDate
                      : (expiryDate as Date)
                    : (expiryDate as Date)
                }
                onChange={onChangeDateOfExpireHandler}
                id="expiryDate"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...dynamicFormLabelProps(
                'percentage',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Percentage:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="percentage"
                name="percent"
                value={addCertification?.percent}
                placeholder="100"
                onChange={handleInputChange}
                min={0}
                max={100}
                maxLength={3}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Description:
            </CFormLabel>
            {showEditor || !isEditCertificationDetails ? (
              <CCol sm={8}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addCertification?.description}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleDescription(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditCertificationDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  disabled={error}
                  onClick={handleUpdateCertificationDetails}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isButtonEnabled || error}
                    onClick={handleAddCertificateDetails}
                  >
                    {confirmButtonText}
                  </CButton>
                  <CButton
                    color="warning "
                    className="btn-ovh"
                    onClick={handleClearInputFields}
                  >
                    Clear
                  </CButton>
                </>
              )}
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}
export default AddUpdateEmployeeCertification
