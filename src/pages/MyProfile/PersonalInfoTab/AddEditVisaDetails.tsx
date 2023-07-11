import {
  AddEditEmployeeVisaDetails,
  EmployeeVisaDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
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
import React, { SyntheticEvent, useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import DatePicker from 'react-datepicker'
import personalInfoApi from '../../../middleware/api/MyProfile/PersonalInfoTab/personalInfoApi'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import moment from 'moment'
function AddEditVisaDetails({
  isEditVisaDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: AddEditEmployeeVisaDetails): JSX.Element {
  const initialEmployeeVisaDetails = {} as EmployeeVisaDetails
  const [employeeVisaDetails, setEmployeeVisaDetails] = useState(
    initialEmployeeVisaDetails,
  )
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [dateOfIssue, setDateOfIssue] = useState<Date | string>()
  const [dateOfExpire, setDateOfExpire] = useState<Date | string>()
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined)
  const [imageUrl, setImageUrl] = useState<string>()
  const [error, setError] = useState<boolean>(false)
  const [validImage, setValidImage] = useState<boolean>(true)

  const [dateOfIssueFlag, setDateOfIssueFlag] = useState<boolean>(false)
  const [dateOfExpiryFlag, setDateOfExpiryFlag] = useState<boolean>(false)

  const getEmployeeCountryDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.countryDetails,
  )
  const getVisaCountryDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.visaTypeDetails,
  )
  const getEditVisaDetails = useTypedSelector(
    reduxServices.personalInformation.selectors.employeeVisaDetails,
  )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const dispatch = useAppDispatch()

  const currentDateOfIssue = employeeVisaDetails.dateOfIssue as string
  const dateIssueParts: string[] | string = employeeVisaDetails.dateOfIssue
    ? currentDateOfIssue.split('/')
    : ''
  const newDateOfIssue = employeeVisaDetails.dateOfIssue
    ? new Date(
        Number(dateIssueParts[2]),
        Number(dateIssueParts[1]) - 1,
        Number(dateIssueParts[0]),
      )
    : new Date()

  const currentDateOfExpiry = employeeVisaDetails.dateOfExpire as string
  const dateExpiryPart: string[] | string = employeeVisaDetails.dateOfExpire
    ? currentDateOfExpiry.split('/')
    : ''
  const newDateOfExpiry = employeeVisaDetails.dateOfExpire
    ? new Date(
        Number(dateExpiryPart[2]),
        Number(dateExpiryPart[1]) - 1,
        Number(dateExpiryPart[0]),
      )
    : new Date()

  useEffect(() => {
    dispatch(reduxServices.personalInformation.getEmployeeCountryDetails())
    if (employeeVisaDetails?.countryId) {
      dispatch(
        reduxServices.personalInformation.getEmployeeVisaType(
          employeeVisaDetails?.countryId,
        ),
      )
    }
  }, [dispatch, employeeVisaDetails?.countryId])

  useEffect(() => {
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile))
    }
  }, [selectedFile])

  const selectImageFile = selectedFile
    ? imageUrl
    : 'data:image/jpeg;base64,' + employeeVisaDetails.visaDetailsData

  useEffect(() => {
    if (
      employeeVisaDetails?.countryId &&
      employeeVisaDetails?.visaTypeId &&
      dateOfIssue &&
      dateOfExpire
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    employeeVisaDetails?.countryId,
    employeeVisaDetails?.visaTypeId,
    dateOfIssue,
    dateOfExpire,
  ])

  useEffect(() => {
    if (isEditVisaDetails) {
      setEmployeeVisaDetails(getEditVisaDetails)
    }
  }, [isEditVisaDetails, getEditVisaDetails])

  const onChangeCountryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'countryId' && employeeVisaDetails.countryId !== value) {
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ visaTypeId: '' } }
      })
    }
    setEmployeeVisaDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const onChangeDateOfIssueHandler = (date: Date) => {
    const currentDateExpiry = isEditVisaDetails
      ? (employeeVisaDetails.dateOfExpire as string)
      : (dateOfExpire as string)

    const dateParts: string[] | string = employeeVisaDetails.dateOfExpire
      ? currentDateExpiry.split('/')
      : ''
    const newDateExpiry = employeeVisaDetails.dateOfExpire
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(dateOfExpire as Date)

    validateDates(date, newDateExpiry)

    if (isEditVisaDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'dateOfIssue'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
      setDateOfIssue(date)
    } else {
      setDateOfIssue(date)
    }
    setDateOfIssueFlag(true)
  }

  const onChangeDateOfExpireHandler = (date: Date) => {
    const currentDateIssue = isEditVisaDetails
      ? employeeVisaDetails.dateOfIssue
        ? (employeeVisaDetails.dateOfIssue as string)
        : (dateOfIssue as string)
      : (dateOfIssue as string)

    const dateParts: string[] | string = employeeVisaDetails.dateOfExpire
      ? currentDateIssue.split('/')
      : ''
    const newDateIssue: number | Date = employeeVisaDetails.dateOfExpire
      ? new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0]),
        )
      : new Date(dateOfIssue as string)

    validateDates(newDateIssue, date)
    if (isEditVisaDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'dateOfExpire'
      setEmployeeVisaDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
      setDateOfExpire(date)
    } else {
      setDateOfExpire(date)
    }
    setDateOfExpiryFlag(true)
  }

  const onChangeFileEventHandler = async (element: HTMLInputElement) => {
    const file = element.files
    if (!file) return
    if (Number(file[0].size) > Number(400000)) {
      setValidImage(false)
      setError(false)
    } else {
      setValidImage(true)
      setError(true)
    }

    setSelectedFile(file[0])
  }

  const handleClearDetails = () => {
    setEmployeeVisaDetails({
      id: '',
      empId: '',
      empName: '',
      visaTypeId: '',
      visaType: '',
      countryId: '',
    })
    setDateOfIssue('')
    setDateOfExpire('')
    setError(false)
    setImageUrl('')
  }
  const actionMapping = {
    added: 'added',
    updated: 'updated',
  }
  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Your Visa Member have been ${action} successfully.`}
      />
    )
  }

  const handleAddVisaDetails = async () => {
    const prepareObject = {
      ...employeeVisaDetails,
      dateOfIssue: moment(dateOfIssue).format('DD/MM/YYYY'),
      dateOfExpire: moment(dateOfExpire).format('DD/MM/YYYY'),
    }
    const addVisaMemberResultAction = await dispatch(
      reduxServices.personalInformation.addEmployeeVisa(prepareObject),
    )
    if (
      reduxServices.personalInformation.addEmployeeVisa.fulfilled.match(
        addVisaMemberResultAction,
      )
    ) {
      if (selectedFile) {
        const newAddedVisaID = await personalInfoApi.getEmployeeVisaDetails(
          parseInt(employeeId),
        )
        const lastArrayIndex: number = newAddedVisaID.length - 1

        await uploadFile(newAddedVisaID[lastArrayIndex].id)
      }
      dispatch(
        dispatch(
          reduxServices.app.actions.addToast(
            getToastMessage(actionMapping.added),
          ),
        ),
      )
    }
    backButtonHandler()
  }

  const handleUpdateVisaMember = async () => {
    const prepareObject = {
      ...employeeVisaDetails,
    }
    const updateVisaMemberResultAction = await dispatch(
      reduxServices.personalInformation.updateEmployeeVisa(prepareObject),
    )
    if (
      reduxServices.personalInformation.updateEmployeeVisa.fulfilled.match(
        updateVisaMemberResultAction,
      )
    ) {
      if (selectedFile) {
        await uploadFile(employeeVisaDetails.id as number)
      }
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.updated),
        ),
      )
    }
    backButtonHandler()
  }

  const validateDates = (startDate: Date, endDate: Date) => {
    const newStartDate = startDate.setHours(0, 0, 0, 0)
    const newEndtDate = endDate.setHours(0, 0, 0, 0)
    if (newStartDate > newEndtDate) {
      setError(true)
      setIsAddButtonEnabled(false)
    } else {
      setError(false)
      setIsAddButtonEnabled(true)
    }
  }

  const uploadFile = async function (id: number) {
    if (selectedFile) {
      const formData = new FormData()
      formData.append('file', selectedFile, selectedFile.name)
      const visaId = id
      const file = formData as FormData

      await personalInfoApi.uploadVisaImage(visaId, file)
    }
  }

  const formLabelProps = {
    htmlFor: 'Country',
    className: 'col-sm-3 col-form-label text-end',
  }

  const visaTypeProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'Visa Type',
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
              onClick={() => {
                backButtonHandler()
                handleClearDetails()
              }}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...formLabelProps}>
              Country:
              <span
                className={
                  employeeVisaDetails?.countryId ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="countryId"
                id="Country"
                value={employeeVisaDetails?.countryId}
                onChange={onChangeCountryHandler}
              >
                <option value={''}>Select Country</option>
                {getEmployeeCountryDetails?.countries?.map(
                  (countriesItem, index) => (
                    <option key={index} value={countriesItem.id}>
                      {countriesItem.name}
                    </option>
                  ),
                )}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...visaTypeProps}>
              Visa Type:{' '}
              <span
                className={
                  employeeVisaDetails?.visaTypeId ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                name="visaTypeId"
                id="Visa Type"
                value={employeeVisaDetails?.visaTypeId}
                onChange={onChangeCountryHandler}
              >
                <option value={''}>Select Visa</option>
                {getVisaCountryDetails?.map((visaTypeItem, index) => (
                  <option key={index} value={visaTypeItem.visaTypeId}>
                    {visaTypeItem.visaType}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Date of Issue:
              <span
                className={
                  employeeVisaDetails.dateOfIssue || dateOfIssue
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
                name="dateOfIssue"
                maxDate={new Date()}
                value={
                  (dateOfIssue as string) ||
                  (employeeVisaDetails?.dateOfIssue as string)
                }
                selected={
                  !dateOfIssueFlag
                    ? employeeVisaDetails.dateOfIssue
                      ? newDateOfIssue
                      : (dateOfIssue as Date)
                    : (dateOfIssue as Date)
                }
                onChange={onChangeDateOfIssueHandler}
                id="dateOfIssue"
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
              Date of Expire :
              <span
                className={
                  employeeVisaDetails.dateOfExpire || dateOfExpire
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
                name="dateOfExpire"
                value={
                  (dateOfExpire as string) ||
                  (employeeVisaDetails?.dateOfExpire as string)
                }
                selected={
                  !dateOfExpiryFlag
                    ? employeeVisaDetails?.dateOfExpire
                      ? newDateOfExpiry
                      : (dateOfExpire as Date)
                    : (dateOfExpire as Date)
                }
                onChange={onChangeDateOfExpireHandler}
                id="dateOfExpire"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/MM/yyyy"
                dateFormat="dd/MM/yyyy"
              />
              {error && (
                <p className="text-danger">
                  Date of Expire should be greater than Date of Issue
                </p>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Upload VISA copy:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="uploadedFile"
                className="form-control"
                type="file"
                name="file"
                accept="image/*,"
                onChange={(element: SyntheticEvent) =>
                  onChangeFileEventHandler(
                    element.currentTarget as HTMLInputElement,
                  )
                }
              />
            </CCol>
            {selectedFile || getEditVisaDetails?.visaDetailsData ? (
              <CCol sm={{ span: 6, offset: 3 }}>
                <img
                  src={selectImageFile}
                  alt=""
                  style={{ width: '100px', margin: '10px 0' }}
                />
              </CCol>
            ) : (
              <>
                <div className="w-100"></div>
                <CCol sm={{ span: 6, offset: 3 }}>
                  <p className=" text-info ">
                    Note: Please upload less than 400KB size image.
                  </p>
                </CCol>
              </>
            )}
            {!validImage && (
              <>
                <CCol sm={{ span: 6, offset: 3 }}>
                  <p className=" text-danger ">
                    Please upload less than 400KB size image.
                  </p>
                </CCol>
              </>
            )}
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditVisaDetails || employeeVisaDetails?.visaDetailsData ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  disabled={error}
                  onClick={handleUpdateVisaMember}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled || error}
                    onClick={handleAddVisaDetails}
                  >
                    {confirmButtonText}
                  </CButton>
                  <CButton
                    color="warning "
                    className="btn-ovh"
                    onClick={handleClearDetails}
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
export default AddEditVisaDetails
