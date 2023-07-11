import {
  AddUpdateEmployeeQualificationProps,
  EmployeeQualification,
  PostGraduationAndGraduationLookUp,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationTypes'
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import Multiselect from 'multiselect-react-dropdown'
import { OTextEditor } from '../../../../components/ReusableComponent/OTextEditor'
import OToast from '../../../../components/ReusableComponent/OToast'
import QualificationCategoryList from '../QualificationCategoryList/QualificationCategoryList'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useFormik } from 'formik'

const AddUpdateEmployeeQualification = ({
  backButtonHandler,
  addButtonHandler,
  isEmployeeQualificationExist = false,
}: AddUpdateEmployeeQualificationProps): JSX.Element => {
  const initialQualificationData = {} as EmployeeQualification
  const [addQualification, setAddQualification] = useState(
    initialQualificationData,
  )
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [toggle, setToggle] = useState('')

  const actionMapping = {
    added: 'added',
    updated: 'updated',
  }
  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Qualification ${action} successfully`}
      />
    )
  }

  const getPgAndGraduationLookUpItems = useTypedSelector(
    (state) =>
      state.employeeQualificationsDetails.pgLookUpAndGraduationLookUpDetails,
  )
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const getEmployeeQualificationDetails = useTypedSelector(
    (state) => state.employeeQualificationsDetails.qualificationDetails,
  )
  const employeeRole = useTypedSelector(
    (state) => state.authentication.authenticatedUser.role,
  )
  useEffect(() => {
    if (
      addQualification.graduationLookUp?.length > 0 &&
      addQualification.hscName &&
      addQualification.sscName
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [addQualification])
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(
      reduxServices.employeeQualifications.getPgLookUpAndGraduationLookUpItems(),
    )
    dispatch(
      reduxServices.employeeQualifications.getEmployeeQualifications(
        employeeId,
      ),
    )
  }, [dispatch, employeeId])

  useEffect(() => {
    if (isEmployeeQualificationExist) {
      setAddQualification(getEmployeeQualificationDetails)
    }
  }, [isEmployeeQualificationExist, getEmployeeQualificationDetails])

  const formik = useFormik({
    initialValues: { name: '', message: '' },
    onSubmit: (values) => {
      console.log('Logging in ', values)
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'hscName') {
      const hscName = value.replace(/^\s*/, '')
      setAddQualification((prevState) => {
        return { ...prevState, ...{ [name]: hscName } }
      })
    } else if (name === 'sscName') {
      const sscName = value.replace(/^\s*/, '')
      setAddQualification((prevState) => {
        return { ...prevState, ...{ [name]: sscName } }
      })
    } else {
      setAddQualification((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  const handleMultiSelect = (
    list: PostGraduationAndGraduationLookUp[],
    name: string,
  ) => {
    setAddQualification((prevState) => {
      return { ...prevState, ...{ [name]: list } }
    })
  }

  const handleOnRemoveSelectedOption = (
    selectedList: PostGraduationAndGraduationLookUp[],
    name: string,
  ) => {
    setAddQualification((prevState) => {
      return { ...prevState, ...{ [name]: selectedList } }
    })
  }

  const handleClearDetails = () => {
    setAddQualification({
      pgLookUp: [],
      graduationLookUp: [],
      hscName: '',
      sscName: '',
      others: '',
    })
  }
  const handleAddUpdateQualification = async () => {
    if (addQualification.id) {
      const updateResultAction = await dispatch(
        reduxServices.employeeQualifications.updateEmployeeQualifications(
          addQualification,
        ),
      )
      if (
        reduxServices.employeeQualifications.updateEmployeeQualifications.fulfilled.match(
          updateResultAction,
        )
      ) {
        dispatch(
          reduxServices.app.actions.addToast(
            getToastMessage(actionMapping.updated),
          ),
        )

        backButtonHandler()
      }
    } else {
      const postResultAction = await dispatch(
        reduxServices.employeeQualifications.addEmployeeQualifications({
          ...addQualification,
          ...{ empId: employeeId as number },
        }),
      )
      if (
        reduxServices.employeeQualifications.addEmployeeQualifications.fulfilled.match(
          postResultAction,
        )
      ) {
        dispatch(
          reduxServices.app.actions.addToast(
            getToastMessage(actionMapping.added),
          ),
        )
        backButtonHandler()
      }
    }
  }

  return (
    <>
      {toggle === '' && (
        <>
          <CCardHeader>
            <h4 className="h4">Add Qualification</h4>
          </CCardHeader>
          <CCardBody className="ps-0 pe-0">
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                {(employeeRole === 'admin' ||
                  employeeRole === 'HR' ||
                  employeeRole === 'HR Manager') && (
                  <CButton
                    color="info btn-ovh me-1"
                    onClick={
                      (addButtonHandler = () =>
                        setToggle('addQualificationDetailListSection'))
                    }
                  >
                    <i className="fa fa-plus me-1"></i>Add
                  </CButton>
                )}
                <CButton color="info btn-ovh me-1" onClick={backButtonHandler}>
                  <i className="fa fa-arrow-left  me-1"></i>Back
                </CButton>
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Post Graduation:
              </CFormLabel>
              <CCol sm={3}>
                <Multiselect
                  className="ovh-multiselect"
                  options={getPgAndGraduationLookUpItems?.pgDetails || []}
                  displayValue="label"
                  selectedValues={addQualification.pgLookUp}
                  onSelect={(list: PostGraduationAndGraduationLookUp[]) =>
                    handleMultiSelect(list, 'pgLookUp')
                  }
                  onRemove={(
                    selectedList: PostGraduationAndGraduationLookUp[],
                  ) => handleOnRemoveSelectedOption(selectedList, 'pgLookUp')}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Graduation:
                <span
                  className={
                    addQualification.graduationLookUp?.length > 0
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <Multiselect
                  className="ovh-multiselect"
                  options={
                    getPgAndGraduationLookUpItems?.graduationDetails || []
                  }
                  displayValue="label"
                  selectedValues={addQualification.graduationLookUp}
                  onSelect={(list: PostGraduationAndGraduationLookUp[]) =>
                    handleMultiSelect(list, 'graduationLookUp')
                  }
                  onRemove={(
                    selectedList: PostGraduationAndGraduationLookUp[],
                  ) =>
                    handleOnRemoveSelectedOption(
                      selectedList,
                      'graduationLookUp',
                    )
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Higher Secondary Certificate:
                <span
                  className={
                    addQualification.hscName?.length > 0
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
                  name="hscName"
                  value={addQualification.hscName || ''}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Secondary School Certificate:
                <span
                  className={
                    addQualification.sscName?.length > 0
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
                  name="sscName"
                  value={addQualification.sscName || ''}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Other:
              </CFormLabel>
              <CCol sm={8}>
                <OTextEditor
                  setFieldValue={(val) => formik.setFieldValue('', val)}
                  value={addQualification.others}
                />
              </CCol>
            </CRow>
            {addQualification.id ? (
              <CRow>
                <CCol className="col-md-3 offset-md-3">
                  <CButton
                    className="btn-ovh"
                    color="success"
                    disabled={!isButtonEnabled}
                    onClick={handleAddUpdateQualification}
                  >
                    Update
                  </CButton>
                </CCol>
              </CRow>
            ) : (
              <CRow>
                <CCol className="col-md-3 offset-md-3">
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isButtonEnabled}
                    onClick={handleAddUpdateQualification}
                  >
                    Add
                  </CButton>
                  <span>
                    <CButton
                      color="warning "
                      className="btn-ovh"
                      onClick={handleClearDetails}
                    >
                      Clear
                    </CButton>
                  </span>
                </CCol>
              </CRow>
            )}
          </CCardBody>
        </>
      )}
      {toggle === 'addQualificationDetailListSection' && (
        <QualificationCategoryList backButtonHandler={() => setToggle('')} />
      )}
    </>
  )
}
export default AddUpdateEmployeeQualification
