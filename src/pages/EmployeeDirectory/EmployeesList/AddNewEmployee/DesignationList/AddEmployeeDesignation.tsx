import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { AddEmployeeDesignationProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'

const AddEmployeeDesignation = ({
  selectedDepartmentId,
  setSelectedDepartmentId,
}: AddEmployeeDesignationProps): JSX.Element => {
  const [designationName, setDesignationName] = useState<string>('')
  const [isAddDesignationBtnEnabled, setIsAddDesignationBtnEnabled] =
    useState(false)

  const departments = useTypedSelector(
    reduxServices.employeeDesignation.selectors.employeeDepartments,
  )

  const designationList = useTypedSelector(
    reduxServices.employeeDesignation.selectors.employeeDesignations,
  )

  const dispatch = useAppDispatch()

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name } = event.target
    if (name === 'designationName') {
      setDesignationName(
        event.target.value.replace(/[^a-zA-Z\s]/gi, '').replace(/^\s*/, ''),
      )
    } else {
      setSelectedDepartmentId(+event.target.value)
    }
  }

  useEffect(() => {
    if (selectedDepartmentId && designationName) {
      setIsAddDesignationBtnEnabled(true)
    } else {
      setIsAddDesignationBtnEnabled(false)
    }
  }, [selectedDepartmentId, designationName])

  useEffect(() => {
    if (selectedDepartmentId) {
      dispatch(
        reduxServices.employeeDesignation.getEmployeeDesignations(
          selectedDepartmentId,
        ),
      )
    } else {
      dispatch(
        reduxServices.employeeDesignation.actions.clearEmployeeDesignations(),
      )
    }
  }, [dispatch, selectedDepartmentId])

  const alreadyExistToastMessage = (
    <OToast
      toastMessage="This designation is already existed"
      toastColor="danger"
    />
  )

  const successToastMessage = (
    <OToast
      toastMessage="Designation added successfully"
      toastColor="success"
    />
  )

  const handleAddEmployeeDesignation = async () => {
    const prepareObject = {
      departmentId: selectedDepartmentId,
      name: designationName,
    }
    if (
      designationList.filter(
        (designation) =>
          designation.name.toLowerCase() === designationName.toLowerCase(),
      ).length > 0
    ) {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
      return
    }
    setDesignationName('')

    const addDesignationResultAction = await dispatch(
      reduxServices.employeeDesignation.addEmployeeDesignation(prepareObject),
    )

    if (
      reduxServices.employeeDesignation.addEmployeeDesignation.fulfilled.match(
        addDesignationResultAction,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToastMessage))
    }
    dispatch(
      reduxServices.employeeDesignation.getEmployeeDesignations(
        selectedDepartmentId,
      ),
    )
  }

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor: htmlFor,
      className: className,
    }
  }

  return (
    <>
      <CRow>
        <CCol sm={6} md={1} className="text-end">
          <CFormLabel
            {...{
              ...dynamicFormLabelProps('department', 'col-form-label'),
            }}
          >
            Department:{' '}
            <span
              className={selectedDepartmentId ? 'text-white' : 'text-danger'}
            >
              *
            </span>
          </CFormLabel>
        </CCol>
        <CCol sm={3}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="department"
            data-testid="form-select"
            name="department"
            value={selectedDepartmentId}
            onChange={handleInputChange}
          >
            <option value={''}>Select Department</option>
            {departments?.map((department, index) => (
              <option
                key={index}
                value={department.departmentId}
                data-testid="select-option"
              >
                {department.departmentName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={2} md={1} className="text-end">
          <CFormLabel
            {...{
              ...dynamicFormLabelProps('designation', 'col-form-label'),
            }}
          >
            Designation:
            <span className={designationName ? 'text-white' : 'text-danger'}>
              *
            </span>
          </CFormLabel>
        </CCol>
        <CCol sm={3}>
          <CFormInput
            type="text"
            id="designationName"
            name="designationName"
            maxLength={32}
            value={designationName}
            onChange={handleInputChange}
          />
        </CCol>
        <CCol xs={2}>
          <CButton
            color="info btn-ovh me-1 text-white"
            size="sm"
            disabled={!isAddDesignationBtnEnabled}
            onClick={handleAddEmployeeDesignation}
          >
            <i className="fa fa-plus me-1"></i>Add
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default AddEmployeeDesignation
