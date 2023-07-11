import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import AddEditFamilyDetails from './AddEditFamilyDetails'
import AddEditVisaDetails from './AddEditVisaDetails'
import DatePicker from 'react-datepicker'
import FamilyDetailsTable from './FamilyDetailsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import OToast from '../../../components/ReusableComponent/OToast'
import VisaDetailsTable from './VisaDetailsTable'
import { handleActiveTabProps } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import moment from 'moment'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'

const PersonalInfoTab = ({
  handleActiveTab,
}: handleActiveTabProps): JSX.Element => {
  const [isViewingAnotherEmployee] = useSelectedEmployee()
  const employeePersonalInformation = useTypedSelector((state) =>
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData(
      state,
      isViewingAnotherEmployee,
    ),
  )
  const [toggle, setToggle] = useState('')
  const dispatch = useAppDispatch()

  const editButtonHandler = (familyId: number) => {
    setToggle('EditFamily')
    dispatch(
      reduxServices.personalInformation.getEmployeeFamilyMember(familyId),
    )
  }
  const editVisaButtonHandler = (id: number) => {
    setToggle('EditVisa')
    dispatch(reduxServices.personalInformation.getEmployeeVisa(id))
  }
  const employeeBasicInformation = useTypedSelector(
    reduxServices.generalInformation.selectors.selectLoggedInEmployeeData,
  )
  const selectedUserContactDetails = {
    mobile: employeePersonalInformation?.mobile,
    alternativeMobile: employeePersonalInformation?.alternativeMobile,
    homeCode: employeePersonalInformation?.homeCode,
    homeNumber: employeePersonalInformation?.homeNumber,
    workCode: employeePersonalInformation?.workCode,
    workNumber: employeePersonalInformation?.workNumber,
  }

  const selectedUserEmergencyContactDetails = {
    emergencyContactName: employeePersonalInformation?.emergencyContactName,
    emergencyPhone: employeePersonalInformation?.emergencyPhone,
    emergencyRelationShip: employeePersonalInformation?.emergencyRelationShip,
  }

  const selectedUserPresenetAddressDetails = {
    presentAddress: employeePersonalInformation?.presentAddress,
    presentCity: employeePersonalInformation?.presentCity,
    presentZip: employeePersonalInformation?.presentZip,
    presentLandMark: employeePersonalInformation?.presentLandMark,
  }

  const selectedUserPermanentAddressDetails = {
    permanentAddress: employeePersonalInformation?.permanentAddress,
    permanentCity: employeePersonalInformation?.permanentCity,
    permanentZip: employeePersonalInformation?.permanentZip,
    permanentLandMark: employeePersonalInformation?.permanentLandMark,
  }

  const selectedUserPassportDetails = {
    passportNumber: employeePersonalInformation?.passportNumber,
    passportIssuedPlace: employeePersonalInformation?.passportIssuedPlace,
    passportIssuedDate: employeePersonalInformation?.passportIssuedDate,
    passportExpDate: employeePersonalInformation?.passportExpDate,
  }

  const selectedUserBasicInformation = {
    baseLocation: employeeBasicInformation?.baseLocation,
    bloodgroup: employeeBasicInformation?.bloodgroup,
    departmentName: employeeBasicInformation?.departmentName,
    designation: employeeBasicInformation?.designation,
    emailId: employeeBasicInformation?.emailId,
    curentLocation: employeeBasicInformation?.curentLocation,
    employmentTypeName: employeeBasicInformation?.employmentTypeName,
    fullName: employeeBasicInformation?.fullName,
    gender: employeeBasicInformation?.gender,
    jobTypeName: employeeBasicInformation?.jobTypeName,
    maritalStatus: employeeBasicInformation?.maritalStatus,
    thumbPicture: employeeBasicInformation?.thumbPicture,
    personalEmail: employeeBasicInformation?.personalEmail,
    projectManager: employeeBasicInformation?.projectManager,
    rbtCvPath: employeeBasicInformation?.rbtCvPath,
    rbtCvName: employeeBasicInformation?.rbtCvName,
    aboutMe: employeeBasicInformation?.aboutMe,
    officialBirthday: employeeBasicInformation?.officialBirthday,
    realBirthday: employeeBasicInformation?.realBirthday,
    anniversary: employeeBasicInformation?.anniversary,
    skypeId: employeeBasicInformation?.skypeId,
  }

  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false)
  const [isPassportButtonEnabled, setIsPassportButtonEnabled] = useState(false)
  const [
    isPassportPlaceOfIssueButtonEnabled,
    setIsPassportPlaceOfIssueButtonEnabled,
  ] = useState(false)
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const [employeeContactDetails, setEmployeeContactDetails] = useState(
    selectedUserContactDetails,
  )

  const [employeeEmergencyContactDetails, setEmployeeEmergencyContactDetails] =
    useState(selectedUserEmergencyContactDetails)

  const [employeePresenetAddressDetails, setEmployeePresenetAddressDetails] =
    useState(selectedUserPresenetAddressDetails)

  const [employeePermanentAddressDetails, setEmployeePermanentAddressDetails] =
    useState(selectedUserPermanentAddressDetails)

  const [employeePassportDetails, setEmployeePassportDetails] = useState(
    selectedUserPassportDetails,
  )
  const [checkBox, setCheckBox] = useState(false)

  useEffect(() => {
    if (checkBox) {
      setEmployeePermanentAddressDetails({
        permanentAddress: employeePresenetAddressDetails.presentAddress,
        permanentCity: employeePresenetAddressDetails.presentCity,
        permanentZip: employeePresenetAddressDetails.presentZip,
        permanentLandMark: employeePresenetAddressDetails.presentLandMark,
      })
    }
  }, [
    checkBox,
    employeePresenetAddressDetails.presentAddress,
    employeePresenetAddressDetails.presentCity,
    employeePresenetAddressDetails.presentLandMark,
    employeePresenetAddressDetails.presentZip,
  ])

  useEffect(() => {
    if (
      employeeContactDetails?.mobile &&
      employeeEmergencyContactDetails?.emergencyContactName &&
      employeeEmergencyContactDetails?.emergencyPhone &&
      employeeEmergencyContactDetails?.emergencyRelationShip &&
      employeePresenetAddressDetails.presentAddress &&
      employeePresenetAddressDetails.presentCity &&
      employeePresenetAddressDetails.presentZip
    ) {
      setSaveButtonEnabled(true)
    } else {
      setSaveButtonEnabled(false)
    }
  }, [
    employeeContactDetails?.mobile,
    employeeEmergencyContactDetails?.emergencyContactName,
    employeeEmergencyContactDetails?.emergencyPhone,
    employeeEmergencyContactDetails?.emergencyRelationShip,
    employeePresenetAddressDetails.presentAddress,
    employeePresenetAddressDetails.presentCity,
    employeePresenetAddressDetails.presentZip,
  ])

  const onChangeContactDetailsHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'mobile') {
      const mobileValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: mobileValue } }
      })
    } else if (name === 'alternativeMobile') {
      const alternativeMobileValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: alternativeMobileValue } }
      })
    } else if (name === 'homeCode') {
      const homeCodeValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: homeCodeValue } }
      })
    } else if (name === 'homeNumber') {
      const homeNumberValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: homeNumberValue } }
      })
    } else if (name === 'workCode') {
      const workCodeValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: workCodeValue } }
      })
    } else if (name === 'workNumber') {
      const workNumberValue = value.replace(/[^0-9]/gi, '')
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: workNumberValue } }
      })
    } else {
      setEmployeeContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  useEffect(() => {
    if (employeePassportDetails?.passportNumber) {
      setIsPassportButtonEnabled(true)
    } else {
      setIsPassportButtonEnabled(false)
    }
  }, [employeePassportDetails?.passportNumber])

  useEffect(() => {
    if (employeePassportDetails?.passportIssuedPlace) {
      setIsPassportPlaceOfIssueButtonEnabled(true)
    } else {
      setIsPassportPlaceOfIssueButtonEnabled(false)
    }
  }, [employeePassportDetails?.passportIssuedPlace])

  const onChangeEmergencyContactDetailsHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'emergencyPhone') {
      const emergencyPhoneValue = value.replace(/[^0-9]/gi, '')
      setEmployeeEmergencyContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: emergencyPhoneValue } }
      })
    } else if (name === 'emergencyContactName') {
      const emergencyContactNameValue = value.replace(/[^a-zA-Z\s]/gi, '')
      setEmployeeEmergencyContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: emergencyContactNameValue } }
      })
    } else {
      setEmployeeEmergencyContactDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onChangePresenetAddressHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'presentZip') {
      const presentZipValue = value.replace(/[^0-9]/gi, '')
      setEmployeePresenetAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: presentZipValue } }
      })
    } else {
      setEmployeePresenetAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onChangePermanentAddressHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'permanentZip') {
      const permanentZipValue = value.replace(/[^0-9]/gi, '')
      setEmployeePermanentAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: permanentZipValue } }
      })
    } else {
      setEmployeePermanentAddressDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const onChangePassportInformationHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    setEmployeePassportDetails((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    if (employeePassportDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = e.name
      setEmployeePassportDetails((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    }
  }

  const handleSubmitPersonalInfoDetails = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    event.preventDefault()
    const resultAction = await dispatch(
      reduxServices.basicInformation.updateEmployeeBasicInformation({
        ...selectedUserBasicInformation,
        ...employeeContactDetails,
        ...employeeEmergencyContactDetails,
        ...employeePresenetAddressDetails,
        ...employeePermanentAddressDetails,
        ...employeePassportDetails,
        id: employeePersonalInformation.id,
      }),
    )

    if (
      reduxServices.basicInformation.updateEmployeeBasicInformation.fulfilled.match(
        resultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Your changes have been saved successfully"
          />,
        ),
      )
      dispatch(
        reduxServices.generalInformation.getEmployeeGeneralInformation(
          employeeId,
        ),
      )

      handleActiveTab(1)
    }
  }
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }

  return (
    <>
      <>
        {toggle === '' && (
          <>
            <CCardHeader>
              <h4 className="h4">Family Details</h4>
            </CCardHeader>
            <CCardBody className="ps-0 pe-0">
              {!isViewingAnotherEmployee ? (
                <OAddButton addButtonHandler={() => setToggle('AddFamily')} />
              ) : (
                <></>
              )}
              <FamilyDetailsTable
                editButtonHandler={editButtonHandler}
                isFieldDisabled={true}
                striped={true}
                bordered={false}
                tableClassName=""
              />
            </CCardBody>

            <CCardHeader>
              <h4 className="h4">Visa Details</h4>
            </CCardHeader>
            <CCardBody className="ps-0 pe-0">
              {!isViewingAnotherEmployee ? (
                <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
              ) : (
                <></>
              )}
              <VisaDetailsTable editVisaButtonHandler={editVisaButtonHandler} />
            </CCardBody>
            <CForm>
              <CCardHeader>
                <h4 className="h4">Contact Details</h4>
              </CCardHeader>
              <CCardBody>
                <CRow className="mt-4 mb-4">
                  <CFormLabel
                    {...dynamicFormLabelProps(
                      'employeeId',
                      'col-sm-3 col-form-label text-end',
                    )}
                  >
                    Mobile:{' '}
                    <span
                      className={
                        employeeContactDetails?.mobile
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={1}>
                    <CFormInput
                      type="text"
                      size="sm"
                      placeholder="+91"
                      aria-label="Disabled input example"
                      disabled
                    />
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="98xxxxxxxx"
                      size="sm"
                      name="mobile"
                      onChange={onChangeContactDetailsHandler}
                      value={employeeContactDetails.mobile}
                      maxLength={10}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel
                    {...dynamicFormLabelProps(
                      'employeeId',
                      'col-sm-3 col-form-label text-end',
                    )}
                  >
                    Alternative Mobile:
                  </CFormLabel>
                  <CCol sm={1}>
                    <CFormInput
                      type="text"
                      size="sm"
                      placeholder="+91"
                      aria-label="Disabled input example"
                      disabled
                    />
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      size="sm"
                      name="alternativeMobile"
                      placeholder="98xxxxxxxx"
                      value={employeeContactDetails.alternativeMobile}
                      onChange={onChangeContactDetailsHandler}
                      maxLength={10}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel
                    {...dynamicFormLabelProps(
                      'employeeId',
                      'col-sm-3 col-form-label text-end',
                    )}
                  >
                    Home:
                  </CFormLabel>
                  <CCol sm={1}>
                    <CFormInput
                      type="text"
                      size="sm"
                      placeholder="+91"
                      aria-label="Disabled input example"
                      disabled
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CFormInput
                      type="text"
                      size="sm"
                      name="homeCode"
                      value={employeeContactDetails.homeCode}
                      onChange={onChangeContactDetailsHandler}
                      maxLength={4}
                    />
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      size="sm"
                      name="homeNumber"
                      onChange={onChangeContactDetailsHandler}
                      value={employeeContactDetails.homeNumber}
                      maxLength={8}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel
                    {...dynamicFormLabelProps(
                      'employeeId',
                      'col-sm-3 col-form-label text-end',
                    )}
                  >
                    Work:
                  </CFormLabel>
                  <CCol sm={1}>
                    <CFormInput
                      type="text"
                      size="sm"
                      placeholder="+91"
                      aria-label="Disabled input example"
                      disabled
                    />
                  </CCol>
                  <CCol sm={2}>
                    <CFormInput
                      type="text"
                      size="sm"
                      onChange={onChangeContactDetailsHandler}
                      value={employeeContactDetails.workCode}
                      name="workCode"
                      maxLength={4}
                    />
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      size="sm"
                      name="workNumber"
                      onChange={onChangeContactDetailsHandler}
                      value={employeeContactDetails.workNumber}
                      maxLength={8}
                    />
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardHeader>
                <h4 className="h4">Emergency Contact</h4>
              </CCardHeader>
              <CCardBody>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Name:{' '}
                    <span
                      className={
                        employeeEmergencyContactDetails?.emergencyContactName
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      size="sm"
                      name="emergencyContactName"
                      id="emergencyContactName"
                      placeholder="Name"
                      onChange={onChangeEmergencyContactDetailsHandler}
                      value={
                        employeeEmergencyContactDetails.emergencyContactName
                      }
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Mobile:{' '}
                    <span
                      className={
                        employeeEmergencyContactDetails?.emergencyPhone
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={1}>
                    <CFormInput
                      type="text"
                      size="sm"
                      placeholder="+91"
                      aria-label="Disabled input example"
                      disabled
                    />
                  </CCol>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      id="Mobile"
                      placeholder="9xxxxxxxxx"
                      size="sm"
                      name="emergencyPhone"
                      onChange={onChangeEmergencyContactDetailsHandler}
                      value={employeeEmergencyContactDetails.emergencyPhone}
                      maxLength={10}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Relationship:
                    <span
                      className={
                        employeeEmergencyContactDetails?.emergencyRelationShip
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormSelect
                      aria-label="Relationship"
                      name="emergencyRelationShip"
                      id="Relationship"
                      size="sm"
                      onChange={onChangeEmergencyContactDetailsHandler}
                      value={
                        employeeEmergencyContactDetails.emergencyRelationShip
                      }
                    >
                      <option value={''}>Select Relationship</option>
                      <option value="Brother">Brother</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Father">Father</option>
                      <option value="Friend">Friend</option>
                      <option value="Husband">Husband</option>
                      <option value="Mother">Mother</option>
                      <option value="Sister">Sister</option>
                      <option value="Son">Son</option>
                      <option value="Wife">Wife</option>
                      <option value="Other">Other</option>
                    </CFormSelect>
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardHeader>
                <h4 className="h4">Present Address</h4>
              </CCardHeader>
              <CCardBody>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Address:
                    <span
                      className={
                        employeePresenetAddressDetails?.presentAddress
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      name="presentAddress"
                      placeholder="Address"
                      size="sm"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentAddress}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    City/Town:{' '}
                    <span
                      className={
                        employeePresenetAddressDetails?.presentCity
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="City/Town"
                      size="sm"
                      name="presentCity"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentCity}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Zip:{' '}
                    <span
                      className={
                        employeePresenetAddressDetails?.presentZip
                          ? 'text-white'
                          : 'text-danger'
                      }
                    >
                      *
                    </span>
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="Zip"
                      size="sm"
                      name="presentZip"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentZip}
                      maxLength={6}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Landmark:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="Landmark"
                      size="sm"
                      name="presentLandMark"
                      onChange={onChangePresenetAddressHandler}
                      value={employeePresenetAddressDetails.presentLandMark}
                    />
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardHeader>
                <h4 className="h4">Permanent Address</h4>
              </CCardHeader>
              <CCardBody>
                <CRow className="mt-4 mb-4">
                  <CFormCheck
                    id="flexCheckDefault"
                    label="Same as Present Address"
                    onClick={() => setCheckBox(!checkBox)}
                  />
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Address:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      disabled={checkBox}
                      type="text"
                      placeholder=" Address"
                      size="sm"
                      name="permanentAddress"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentAddress
                          : employeePermanentAddressDetails.permanentAddress
                      }
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    City/Town:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      disabled={checkBox}
                      placeholder=" City/Town"
                      size="sm"
                      name="permanentCity"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentCity
                          : employeePermanentAddressDetails.permanentCity
                      }
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Zip:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder=" Zip"
                      size="sm"
                      disabled={checkBox}
                      name="permanentZip"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentZip
                          : employeePermanentAddressDetails.permanentZip
                      }
                      maxLength={6}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Landmark:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      disabled={checkBox}
                      placeholder="Landmark"
                      size="sm"
                      name="permanentLandMark"
                      onChange={onChangePermanentAddressHandler}
                      value={
                        checkBox
                          ? employeePresenetAddressDetails.presentLandMark
                          : employeePermanentAddressDetails.permanentLandMark
                      }
                    />
                  </CCol>
                </CRow>
              </CCardBody>
              <CCardHeader>
                <h4 className="h4">Passport Details</h4>
              </CCardHeader>
              <CCardBody>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Number:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      placeholder="Passport Number"
                      size="sm"
                      name="passportNumber"
                      onChange={onChangePassportInformationHandler}
                      value={employeePassportDetails.passportNumber}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Place of Issue:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="text"
                      size="sm"
                      placeholder="Place"
                      name="passportIssuedPlace"
                      aria-label="Disabled input example"
                      disabled={!isPassportButtonEnabled}
                      onChange={onChangePassportInformationHandler}
                      value={employeePassportDetails.passportIssuedPlace}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Date of Issue :
                  </CFormLabel>
                  <CCol sm={3}>
                    <DatePicker
                      id="passportIssuedDate"
                      className="form-control form-control-sm"
                      maxDate={new Date()}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="dd/mm/yyyy"
                      name="officialBirthday"
                      value={employeePassportDetails.passportIssuedDate}
                      onChange={(date: Date) =>
                        onDateChangeHandler(date, {
                          name: 'passportIssuedDate',
                        })
                      }
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Date of Expiry:
                  </CFormLabel>
                  <CCol sm={3}>
                    <DatePicker
                      id="passportExpDate"
                      className="form-control form-control-sm"
                      minDate={new Date()}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      placeholderText="dd/mm/yyyy"
                      name="passportExpDate"
                      value={employeePassportDetails.passportExpDate}
                      onChange={(date: Date) =>
                        onDateChangeHandler(date, { name: 'passportExpDate' })
                      }
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Upload Passport Front Copy:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="file"
                      name="file"
                      className="form-control form-control-sm"
                      id="exampleFormControlFile2"
                      disabled={!isPassportPlaceOfIssueButtonEnabled}
                    />
                  </CCol>
                </CRow>
                <CRow className="mt-4 mb-4">
                  <CFormLabel className="col-sm-3 col-form-label text-end">
                    Upload Passport Back Copy:
                  </CFormLabel>
                  <CCol sm={3}>
                    <CFormInput
                      type="file"
                      name="file"
                      className="form-control form-control-sm"
                      id="exampleFormControlFile2"
                      disabled={!isPassportPlaceOfIssueButtonEnabled}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol md={{ span: 6, offset: 3 }}>
                    <CButton
                      className="btn-ovh btn btn-success mt-4"
                      size="sm"
                      type="submit"
                      disabled={!saveButtonEnabled}
                      onClick={handleSubmitPersonalInfoDetails}
                    >
                      Save
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CForm>
          </>
        )}
        {toggle === 'AddFamily' && (
          <AddEditFamilyDetails
            headerTitle="Add Family Member"
            confirmButtonText="Add"
            backButtonHandler={() => setToggle('')}
          />
        )}
        {toggle === 'EditFamily' && (
          <AddEditFamilyDetails
            headerTitle="Edit Family Member"
            confirmButtonText="Update"
            backButtonHandler={() => setToggle('')}
            isEditFamilyDetails={true}
          />
        )}

        {toggle === 'AddVisa' && (
          <AddEditVisaDetails
            backButtonHandler={() => setToggle('')}
            headerTitle="Add Visa Details"
            confirmButtonText="Add"
          />
        )}
        {toggle === 'EditVisa' && (
          <AddEditVisaDetails
            headerTitle="Edit Visa Details"
            confirmButtonText="Update"
            backButtonHandler={() => setToggle('')}
            isEditVisaDetails={true}
          />
        )}
      </>
    </>
  )
}
export default PersonalInfoTab
