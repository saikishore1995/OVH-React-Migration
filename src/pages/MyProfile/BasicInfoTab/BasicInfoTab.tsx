import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react-pro'
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import DatePicker from 'react-datepicker'
import DownloadCVButton from './DownloadCVButton'
import { OTextEditor } from '../../../components/ReusableComponent/OTextEditor'
import OToast from '../../../components/ReusableComponent/OToast'
import { employeeBasicInformationThunk } from '../../../reducers/MyProfile/BasicInfoTab/basicInformatiomSlice'
import moment from 'moment'
import { reduxServices } from '../../../reducers/reduxServices'
import { useFormik } from 'formik'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'
import validator from 'validator'
import BasicInfoTabImageCropper from './BasicInfoTabImageCropper'
import { UploadImageInterface } from '../../../types/MyProfile/BasicInfoTab/basicInformationTypes'

const BasicInfoTab = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [isViewingAnotherEmployee] = useSelectedEmployee()
  const employeeBasicInformation = useTypedSelector((state) =>
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData(
      state,
      isViewingAnotherEmployee,
    ),
  )
  const tenantKey = useTypedSelector(
    reduxServices.authentication.selectors.selectTenantKey,
  )
  const authenticatedToken = useTypedSelector(
    reduxServices.authentication.selectors.selectToken,
  )

  const selectedUserBasicInformation = {
    id: employeeBasicInformation.id,
    baseLocation: employeeBasicInformation.baseLocation,
    bloodgroup: employeeBasicInformation.bloodgroup,
    departmentName: employeeBasicInformation.departmentName,
    designation: employeeBasicInformation.designation,
    emailId: employeeBasicInformation.emailId,
    curentLocation: employeeBasicInformation.curentLocation,
    employmentTypeName: employeeBasicInformation.employmentTypeName,
    fullName: employeeBasicInformation.fullName,
    gender: employeeBasicInformation.gender,
    jobTypeName: employeeBasicInformation.jobTypeName,
    maritalStatus: employeeBasicInformation.maritalStatus,
    thumbPicture: employeeBasicInformation.thumbPicture,
    personalEmail: employeeBasicInformation.personalEmail,
    projectManager: employeeBasicInformation.projectManager,
    rbtCvPath: employeeBasicInformation.rbtCvPath,
    rbtCvName: employeeBasicInformation.rbtCvName,
    aboutMe: employeeBasicInformation.aboutMe,
    officialBirthday: employeeBasicInformation.officialBirthday,
    realBirthday: employeeBasicInformation.realBirthday,
    anniversary: employeeBasicInformation.anniversary,
    skypeId: employeeBasicInformation.skypeId,
  }

  const [baseLocationShown, setBaseLocationShown] = useState<boolean>(false)
  const [realBirthdayShown, setRealBirthdayShown] = useState<boolean>(false)
  const [emailError, setEmailError] = useState<boolean>(false)
  const [
    employeeBasicInformationEditData,
    setEmployeeBasicInformationEditData,
  ] = useState(selectedUserBasicInformation)
  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)
  const [dateErrorMessage, setDateErrorMessage] = useState(false)
  const [cvToUpload, setCVToUpload] = useState<File | undefined>(undefined)
  const [uploadErrorText, setUploadErrorText] = useState<string>('')
  const [selectedProfilePicture, setSelectedProfilePicture] =
    useState<UploadImageInterface>()

  const [officialBday, setOfficialBday] = useState<Date>()
  const [realBday, setRealBday] = useState<Date>()
  const [selectedAnniversary, setSelectedAnniversary] = useState<Date>()

  const [officialBdyFlag, setOfficialBdayFlag] = useState(false)
  const [realBdayFlag, setRealBdayFlag] = useState(false)
  const [anniversaryFlag, setAnniversaryFlag] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const currentOfficialBday =
    employeeBasicInformationEditData.officialBirthday as string
  const officialBdayParts: string[] | string =
    employeeBasicInformationEditData.officialBirthday
      ? currentOfficialBday.split('/')
      : ''
  const newOfficialBday = employeeBasicInformationEditData.officialBirthday
    ? new Date(
        Number(officialBdayParts[2]),
        Number(officialBdayParts[1]) - 1,
        Number(officialBdayParts[0]),
      )
    : (officialBday as Date)

  const currentRealBirthday =
    employeeBasicInformationEditData.realBirthday as string
  const realBdayParts: string[] | string =
    employeeBasicInformationEditData.realBirthday
      ? currentRealBirthday.split('/')
      : ''
  const newRealBirthday = employeeBasicInformationEditData.realBirthday
    ? new Date(
        Number(realBdayParts[2]),
        Number(realBdayParts[1]) - 1,
        Number(realBdayParts[0]),
      )
    : (realBday as Date)

  const currentAnniversary =
    employeeBasicInformationEditData.anniversary as string
  const anniversaryParts: string[] | string =
    employeeBasicInformationEditData.anniversary
      ? currentAnniversary.split('/')
      : ''
  const newAnniversary = employeeBasicInformationEditData.anniversary
    ? new Date(
        Number(anniversaryParts[2]),
        Number(anniversaryParts[1]) - 1,
        Number(anniversaryParts[0]),
      )
    : (selectedAnniversary as Date)

  const validateEmail = (email: string) => {
    if (validator.isEmail(email)) {
      setEmailError(false)
    } else {
      setEmailError(true)
    }
  }

  //onChange handler for image upload and crop
  const croppedImageHandler = useCallback(
    (croppedImageData: UploadImageInterface) => {
      setSelectedProfilePicture(croppedImageData)
      setSaveButtonEnabled(true)
    },
    [],
  )

  // onchange handler for input fields
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'curentLocation') {
      const currentLocation = value
        .replace(/[^a-zA-Z\s]/gi, '')
        .replace(/^\s*/, '')
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: currentLocation } }
      })
    } else if (name === 'baseLocation') {
      const baseLocation = value
        .replace(/[^a-zA-Z\s]/gi, '')
        .replace(/^\s*/, '')
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: baseLocation } }
      })
    } else if (name === 'personalEmail') {
      const personalEmail = value
      validateEmail(personalEmail)
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: personalEmail } }
      })
    } else {
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  // onchange handler for date pickers
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    if (employeeBasicInformationEditData) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = e.name
      setEmployeeBasicInformationEditData((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
  }

  // change CV to upload state value
  const onChangeCVHandler = async (element: HTMLInputElement) => {
    const file = element.files
    const acceptedFileTypes = ['pdf', 'doc', 'docx']
    let extension = ''
    if (!file) return

    if (file) {
      extension = file[0].name.split('.').pop() as string
    }

    if (file[0].size > 2048000) {
      setUploadErrorText(
        'File size exceeded. Please upload a file less than 2MB.',
      )
      return
    }

    if (!acceptedFileTypes.includes(extension)) {
      setUploadErrorText(
        'Wrong file format chosen. Please choose either doc, docx, or pdf.',
      )
      return
    }
    setSaveButtonEnabled(true)
    setUploadErrorText('')
    setCVToUpload(file[0])
  }

  // condition to enable and disable save button
  useEffect(() => {
    if (
      employeeBasicInformationEditData.curentLocation &&
      employeeBasicInformationEditData.bloodgroup &&
      employeeBasicInformationEditData.maritalStatus &&
      employeeBasicInformationEditData.personalEmail &&
      employeeBasicInformationEditData.officialBirthday &&
      !emailError
    ) {
      setSaveButtonEnabled(true)
    } else {
      setSaveButtonEnabled(false)
    }
    if (employeeBasicInformationEditData.personalEmail) {
      validateEmail(employeeBasicInformationEditData.personalEmail)
    }
  }, [
    employeeBasicInformationEditData,
    baseLocationShown,
    realBirthdayShown,
    emailError,
  ])

  // condition to enable and disable save button
  useEffect(() => {
    if (baseLocationShown) {
      if (employeeBasicInformationEditData.baseLocation) {
        setSaveButtonEnabled(true)
      } else {
        setSaveButtonEnabled(false)
      }
    }
    if (realBirthdayShown) {
      if (employeeBasicInformationEditData.realBirthday) {
        setSaveButtonEnabled(true)
      } else {
        setSaveButtonEnabled(false)
      }
    }
    if (employeeBasicInformationEditData.maritalStatus === 'Married') {
      if (employeeBasicInformationEditData.anniversary) {
        setSaveButtonEnabled(true)
      } else {
        setSaveButtonEnabled(false)
      }
    }
  }, [
    baseLocationShown,
    employeeBasicInformationEditData.baseLocation,
    realBirthdayShown,
    employeeBasicInformationEditData.realBirthday,
    employeeBasicInformationEditData.maritalStatus,
    employeeBasicInformationEditData.anniversary,
  ])

  useEffect(() => {
    if (
      employeeBasicInformationEditData.realBirthday &&
      employeeBasicInformationEditData.anniversary
    ) {
      const currentRealBirthday =
        employeeBasicInformationEditData.realBirthday.toString()
      const currentAnniversary =
        employeeBasicInformationEditData.anniversary.toString()

      const newRealBirthday = new Date(
        moment(currentRealBirthday).format('DD/MM/YYYY'),
      )
      const newAnniversary = new Date(
        moment(currentAnniversary).format('DD/MM/YYYY'),
      )

      if (newRealBirthday.getTime() >= newAnniversary.getTime()) {
        setDateErrorMessage(true)
        setSaveButtonEnabled(false)
      } else {
        setDateErrorMessage(false)
        setSaveButtonEnabled(true)
      }
    }
  }, [
    employeeBasicInformationEditData.anniversary,
    employeeBasicInformationEditData.realBirthday,
  ])

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }

  // change on gender the defaultPic api should call
  useEffect(() => {
    if (employeeBasicInformationEditData.gender) {
      if (
        !employeeBasicInformationEditData.rbtCvName?.includes(
          employeeBasicInformation.id as unknown as string,
        )
      ) {
        dispatch(
          employeeBasicInformationThunk.updateEmployeeDefaultPicOnGenderChange(
            employeeBasicInformationEditData.gender,
          ),
        )
      }
    }
  }, [
    dispatch,
    employeeBasicInformation.id,
    employeeBasicInformationEditData.gender,
    employeeBasicInformationEditData.rbtCvName,
  ])

  // upon save click have to save updated employee details and upload cv
  const handleSubmitBasicDetails = async (event: SyntheticEvent) => {
    event.preventDefault()
    const prepareObject = employeeBasicInformationEditData
    setIsLoading(true)
    if (selectedProfilePicture) {
      await dispatch(
        employeeBasicInformationThunk.uploadEmployeeProfilePicture(
          selectedProfilePicture,
        ),
      )
    }
    await dispatch(
      employeeBasicInformationThunk.updateEmployeeBasicInformation(
        prepareObject,
      ),
    )

    if (cvToUpload) {
      const formData = new FormData()
      formData.append('file', cvToUpload, cvToUpload.name)
      const uploadPrepareObject = {
        personId: employeeBasicInformation.id as number,
        file: formData,
      }
      await dispatch(
        employeeBasicInformationThunk.uploadEmployeeCV(uploadPrepareObject),
      )
    }
    setIsLoading(false)
    dispatch(reduxServices.app.actions.addToast(toastElement))
    window.location.reload()
  }

  const formik = useFormik({
    initialValues: { name: '', message: '' },
    onSubmit: (values) => {
      console.log('Logging in ', values)
    },
  })
  const toastElement = (
    <OToast
      toastMessage="Your changes have been saved successfully."
      toastColor="success"
    />
  )

  // base location and real date of birth hide and show validations
  useEffect(() => {
    if (
      employeeBasicInformationEditData.curentLocation?.toLowerCase() !==
      employeeBasicInformationEditData.baseLocation?.toLowerCase()
    ) {
      setBaseLocationShown(true)
    } else {
      setBaseLocationShown(false)
    }
    const tempOfficialBirthday =
      employeeBasicInformationEditData?.officialBirthday?.toString()

    const tempRealBirthday =
      employeeBasicInformationEditData?.realBirthday?.toString()

    const newOfficialBirthday = new Date(
      moment(tempOfficialBirthday).format('DD/MM/YYYY'),
    )
    const newRealBirthday = new Date(
      moment(tempRealBirthday).format('DD/MM/YYYY'),
    )
    if (newOfficialBirthday.getTime() !== newRealBirthday.getTime()) {
      setRealBirthdayShown(true)
    } else {
      setRealBirthdayShown(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOfficialBday = (date: Date) => {
    setOfficialBday(date)
    setOfficialBdayFlag(true)
  }
  const handleRealBday = (date: Date) => {
    setRealBday(date)
    setRealBdayFlag(true)
  }
  const handleAnniversary = (date: Date) => {
    setSelectedAnniversary(date)
    setAnniversaryFlag(true)
  }

  const dateIsValid = (date: Date) => {
    return !Number.isNaN(new Date(date).getTime())
  }

  return (
    <>
      {' '}
      {isLoading ? (
        <span>
          Updating.... <CSpinner />
        </span>
      ) : (
        <CForm
          className="form-horizontal ng-pristine ng-valid-pattern ng-valid-email ng-valid ng-valid-required"
          onSubmit={handleSubmitBasicDetails}
        >
          <CRow className="justify-content-end mt-3">
            <CCol className="text-end" md={4}>
              <DownloadCVButton className="text-decoration-none btn btn-download btn-ovh" />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeId',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Employee ID:
            </CFormLabel>
            <CCol sm={2}>
              <CFormLabel className="col-sm-15 col-form-label text-end">
                {employeeBasicInformation.id}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeEmailId',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Email ID:
            </CFormLabel>
            <CCol sm={2}>
              <CFormLabel className="col-sm-15 col-form-label text-end">
                {employeeBasicInformation.emailId}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeFullName',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Full Name:
            </CFormLabel>
            <CCol sm={2}>
              <CFormLabel className="col-sm-15 col-form-label text-end">
                {employeeBasicInformation.fullName}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeCurrentLocation',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Current Location:
              <span
                className={
                  employeeBasicInformationEditData.curentLocation
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="employeeCurrentLocation"
                size="sm"
                type="text"
                name="curentLocation"
                placeholder="Enter Location"
                value={employeeBasicInformationEditData.curentLocation}
                onChange={handleChange}
              />
              <CFormCheck
                className="mt-2"
                id="trigger"
                label="This is not the base location"
                checked={baseLocationShown}
                onChange={() => setBaseLocationShown(!baseLocationShown)}
              />
            </CCol>
          </CRow>
          {baseLocationShown && (
            <CRow className="mt-3 ">
              <CFormLabel
                {...dynamicFormLabelProps(
                  'employeeBaseLocation',
                  'col-sm-3 col-form-label text-end',
                )}
              >
                Base Location:
                <span
                  className={
                    employeeBasicInformationEditData.baseLocation
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  id="employeeBaseLocation"
                  size="sm"
                  type="text"
                  name="baseLocation"
                  placeholder="Enter Location"
                  value={employeeBasicInformationEditData.baseLocation}
                  onChange={handleChange}
                />
              </CCol>
            </CRow>
          )}
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeGender',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Gender:
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="employeeGender"
                size="sm"
                aria-label="Gender"
                name="gender"
                value={employeeBasicInformationEditData.gender}
                onChange={handleChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeBloodGroup',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Blood group:
              <span
                className={
                  employeeBasicInformationEditData.bloodgroup
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="employeeBloodGroup"
                size="sm"
                aria-label="bloodGroup"
                name="bloodgroup"
                value={employeeBasicInformationEditData.bloodgroup}
                onChange={handleChange}
              >
                <option value={''}>Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeOfficialBirthday',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Official Birthday:
              <span
                className={
                  employeeBasicInformationEditData.officialBirthday
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="employeeOfficialBirthday"
                className="form-control form-control-sm"
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="officialBirthday"
                value={employeeBasicInformationEditData.officialBirthday}
                selected={
                  !officialBdyFlag
                    ? dateIsValid(newOfficialBday)
                      ? newOfficialBday
                      : officialBday
                    : officialBday
                }
                onChange={(date: Date) => {
                  onDateChangeHandler(date, { name: 'officialBirthday' })
                  handleOfficialBday(date)
                }}
              />
              <CFormCheck
                className="mt-2"
                id="trigger"
                name="officialDateOfBirth"
                label=" This is not a real birthday"
                checked={realBirthdayShown}
                onChange={() => setRealBirthdayShown(!realBirthdayShown)}
              />
            </CCol>
          </CRow>
          {realBirthdayShown && (
            <CRow className="mt-3 ">
              <CFormLabel
                {...dynamicFormLabelProps(
                  'employeeRealBirthday',
                  'col-sm-3 col-form-label text-end',
                )}
              >
                Real Birthday:
                <span
                  className={
                    employeeBasicInformationEditData.realBirthday
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <DatePicker
                  id="employeeRealBirthday"
                  className="form-control form-control-sm"
                  maxDate={new Date()}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yyyy"
                  dateFormat="dd/mm/yyyy"
                  name="realBirthday"
                  value={employeeBasicInformationEditData.realBirthday}
                  selected={
                    !realBdayFlag
                      ? dateIsValid(newRealBirthday)
                        ? newRealBirthday
                        : realBday
                      : realBday
                  }
                  onChange={(date: Date) => {
                    onDateChangeHandler(date, { name: 'realBirthday' })
                    handleRealBday(date)
                  }}
                />
              </CCol>
            </CRow>
          )}
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeMaritalStatus',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Marital Status:
              <span
                className={
                  employeeBasicInformationEditData.maritalStatus
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="employeeMaritalStatus"
                size="sm"
                aria-label="MaritalStatus"
                name="maritalStatus"
                value={employeeBasicInformationEditData.maritalStatus}
                onChange={handleChange}
              >
                <option value={''}>Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </CFormSelect>
            </CCol>
          </CRow>
          {employeeBasicInformationEditData.maritalStatus === 'Married' && (
            <CRow className="mt-3 ">
              <CFormLabel
                {...dynamicFormLabelProps(
                  'employeeAnniversary',
                  'col-sm-3 col-form-label text-end',
                )}
              >
                Anniversary:
                <span
                  className={
                    employeeBasicInformationEditData.anniversary
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <DatePicker
                  id="employeeAnniversary"
                  className="form-control form-control-sm"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yyyy"
                  name="anniversary"
                  value={employeeBasicInformationEditData.anniversary}
                  selected={
                    !anniversaryFlag
                      ? dateIsValid(newAnniversary)
                        ? newAnniversary
                        : selectedAnniversary
                      : selectedAnniversary
                  }
                  onChange={(date: Date) => {
                    onDateChangeHandler(date, { name: 'anniversary' })
                    handleAnniversary(date)
                  }}
                />
                {dateErrorMessage && (
                  <p className="text-danger">
                    Anniversary date should be greater than Real Birthday
                    date....
                  </p>
                )}
              </CCol>
            </CRow>
          )}
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'department',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Department:
            </CFormLabel>
            <CCol sm={2}>
              <CFormLabel className="col-form-label text-end">
                {employeeBasicInformation.departmentName}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'reportingManager',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Reporting Manager:
            </CFormLabel>
            <CCol sm={6}>
              <CFormLabel className="col-sm-15 col-form-label text-end">
                {employeeBasicInformation.empManager}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employmentType',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Employment Type:
            </CFormLabel>
            <CCol sm={2}>
              <CFormLabel className="col-form-label text-end">
                {employeeBasicInformation.employmentTypeName}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'jobType',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Job Type:
            </CFormLabel>
            <CCol sm={2}>
              <CFormLabel className="col-form-label text-end">
                {employeeBasicInformation.jobTypeName}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'country',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Country:
            </CFormLabel>
            <CCol sm={2}>
              <CFormLabel className="col-form-label text-end">
                {employeeBasicInformation.country}
              </CFormLabel>
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeePersonalEmail',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Personal Email:
              <span
                className={
                  employeeBasicInformationEditData.personalEmail && !emailError
                    ? 'text-white'
                    : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="employeePersonalEmail"
                size="sm"
                type="email"
                name="personalEmail"
                placeholder="Personal Email"
                value={employeeBasicInformationEditData.personalEmail}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeSkypeID',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Skype ID:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="employeeSkypeID"
                size="sm"
                type="text"
                name="skypeId"
                placeholder="Enter SkypeID"
                value={employeeBasicInformationEditData.skypeId}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'employeeProfilePicture',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Profile Picture:
            </CFormLabel>
            <CCol sm={3}>
              <BasicInfoTabImageCropper
                file={employeeBasicInformation.thumbPicture}
                empId={employeeBasicInformation.id as number}
                onUploadImage={croppedImageHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel
              {...dynamicFormLabelProps(
                'aboutMe',
                'col-sm-3 col-form-label text-end',
              )}
            >
              About Me:
            </CFormLabel>
            <CCol sm={9}>
              <OTextEditor
                setFieldValue={(val) => formik.setFieldValue('', val)}
                value={'Hello'}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel
              {...dynamicFormLabelProps(
                'uploadRBTCV',
                'col-sm-3 col-form-label text-end',
              )}
            >
              Upload RBT CV:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                id="uploadRBTCV"
                className="form-control"
                type="file"
                name="file"
                accept=".doc, .docx, .pdf"
                onChange={(element: SyntheticEvent) =>
                  onChangeCVHandler(element.currentTarget as HTMLInputElement)
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol md={{ span: 6, offset: 3 }}>
              {employeeBasicInformation.rbtCvName && (
                <DownloadCVButton
                  className="cursor-pointer"
                  fileName={employeeBasicInformation.rbtCvName}
                  token={authenticatedToken}
                  tenantKey={tenantKey}
                />
              )}
              {uploadErrorText && (
                <div id="error">
                  <strong className="text-danger mt-3">
                    {uploadErrorText}
                  </strong>
                </div>
              )}
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                className="btn-ovh btn btn-success mt-4"
                size="sm"
                disabled={!saveButtonEnabled}
                type="submit"
              >
                Save
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      )}
    </>
  )
}

export default BasicInfoTab
