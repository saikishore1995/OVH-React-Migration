import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

import { ActionMapping } from '../../../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { EmployeeShiftDetails } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import OCard from '../../../../../components/ReusableComponent/OCard'
import OToast from '../../../../../components/ReusableComponent/OToast'
import ShiftListTable from './ShiftListTable'
import { reduxServices } from '../../../../../reducers/reduxServices'

const ShiftConfiguration = (): JSX.Element => {
  const employeeShifts = useTypedSelector(
    reduxServices.shiftConfiguration.selectors.employeeShifts,
  )
  const [employeeShiftDetails, setEmployeeShiftDetails] =
    useState<EmployeeShiftDetails>({
      id: 0,
      name: '',
      startTimeHour: '',
      startTimeMinutes: '',
      endTimeHour: '',
      endTimeMinutes: '',
      graceTime: '',
    })
  const [isAddBtnEnabled, setIsAddBtnEnabled] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const onchangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'name') {
      const shiftName = value.replace(/^\s*/, '')
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: shiftName } }
      })
    } else {
      const newValue = value.replace(/[^0-9]/gi, '')
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: newValue } }
      })
    }
  }

  const hoursAndMinutesValidation = () => {
    if (employeeShiftDetails.endTimeMinutes !== undefined || '' || null) {
      if (employeeShiftDetails.endTimeMinutes.length === 1) {
        employeeShiftDetails.endTimeMinutes =
          '0' + employeeShiftDetails.endTimeMinutes
      } else {
        if (+employeeShiftDetails.endTimeMinutes > 59) {
          employeeShiftDetails.endTimeMinutes = '59'
        }
      }
    }
    if (employeeShiftDetails.startTimeMinutes !== undefined || '' || null) {
      if (employeeShiftDetails.startTimeMinutes.length === 1) {
        employeeShiftDetails.startTimeMinutes =
          '0' + employeeShiftDetails.startTimeMinutes
      } else {
        if (+employeeShiftDetails.startTimeMinutes > 59) {
          employeeShiftDetails.startTimeMinutes = '59'
        }
      }
    }
    if (employeeShiftDetails.startTimeHour !== undefined || '' || null) {
      if (employeeShiftDetails.startTimeHour.length === 1) {
        employeeShiftDetails.startTimeHour =
          '0' + employeeShiftDetails.startTimeHour
      } else {
        if (+employeeShiftDetails.startTimeHour > 23) {
          employeeShiftDetails.startTimeHour = '23'
        }
      }
    }
    if (employeeShiftDetails.endTimeHour !== undefined || '' || null) {
      if (employeeShiftDetails.endTimeHour.length === 1) {
        employeeShiftDetails.endTimeHour =
          '0' + employeeShiftDetails.endTimeHour
      } else {
        if (+employeeShiftDetails.endTimeHour > 23) {
          employeeShiftDetails.endTimeHour = '23'
        }
      }
    }
  }

  const shiftAlreadyExistToastMessage = (
    <OToast toastColor="danger" toastMessage="Shift already exists!" />
  )

  const actionMapping: ActionMapping = {
    added: 'added',
    deleted: 'deleted',
    updated: 'updated',
  }

  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={
          action === 'added'
            ? `Shift ${action} successfully`
            : `Shift details ${action} successfully`
        }
      />
    )
  }

  const handleAddEmployeeTimeSlot = async () => {
    const createEmployeeTimeSlotResultAction = await dispatch(
      reduxServices.shiftConfiguration.createEmployeeTimeSlot(
        employeeShiftDetails,
      ),
    )
    if (
      reduxServices.shiftConfiguration.createEmployeeTimeSlot.fulfilled.match(
        createEmployeeTimeSlotResultAction,
      )
    ) {
      await dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.added),
        ),
      )
      setEmployeeShiftDetails({
        id: 0,
        name: '',
        startTimeHour: '',
        startTimeMinutes: '',
        endTimeHour: '',
        endTimeMinutes: '',
        graceTime: '',
      })
    } else if (
      reduxServices.shiftConfiguration.createEmployeeTimeSlot.rejected.match(
        createEmployeeTimeSlotResultAction,
      ) &&
      createEmployeeTimeSlotResultAction.payload === 409
    ) {
      dispatch(
        reduxServices.app.actions.addToast(shiftAlreadyExistToastMessage),
      )
      setEmployeeShiftDetails({
        id: 0,
        name: '',
        startTimeHour: '',
        startTimeMinutes: '',
        endTimeHour: '',
        endTimeMinutes: '',
        graceTime: '',
      })
    }
  }

  useEffect(() => {
    dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
  }, [dispatch])

  useEffect(() => {
    if (
      employeeShiftDetails.name &&
      employeeShiftDetails.startTimeHour &&
      employeeShiftDetails.startTimeMinutes &&
      employeeShiftDetails.endTimeHour &&
      employeeShiftDetails.endTimeMinutes &&
      employeeShiftDetails.graceTime
    ) {
      setIsAddBtnEnabled(true)
    } else {
      setIsAddBtnEnabled(false)
    }
  }, [
    employeeShiftDetails.endTimeHour,
    employeeShiftDetails.endTimeMinutes,
    employeeShiftDetails.graceTime,
    employeeShiftDetails.name,
    employeeShiftDetails.startTimeHour,
    employeeShiftDetails.startTimeMinutes,
  ])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Shift Configuration"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
          <CForm>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Name :
                <span
                  className={
                    employeeShiftDetails.name ? 'text-white' : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  id="name"
                  size="sm"
                  type="text"
                  name="name"
                  placeholder="Shift Name"
                  value={employeeShiftDetails.name}
                  onChange={onchangeInputHandler}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Start Time :
                <span
                  className={
                    employeeShiftDetails.startTimeHour &&
                    employeeShiftDetails.startTimeMinutes
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={1}>
                <CFormInput
                  id="startTimeHour"
                  size="sm"
                  type="text"
                  name="startTimeHour"
                  data-testid="sh-startTimeHour"
                  placeholder="Hours"
                  maxLength={2}
                  value={employeeShiftDetails.startTimeHour}
                  onChange={onchangeInputHandler}
                  onBlur={hoursAndMinutesValidation}
                />
              </CCol>
              <CCol sm={1}>
                <CFormInput
                  id="startTimeMinutes"
                  size="sm"
                  type="text"
                  name="startTimeMinutes"
                  data-testid="sh-startTimeMinutes"
                  placeholder="Min"
                  maxLength={2}
                  value={employeeShiftDetails.startTimeMinutes}
                  onChange={onchangeInputHandler}
                  onBlur={hoursAndMinutesValidation}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                End Time :
                <span
                  className={
                    employeeShiftDetails.endTimeHour &&
                    employeeShiftDetails.endTimeMinutes
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={1}>
                <CFormInput
                  id="endTimeHour"
                  size="sm"
                  type="text"
                  name="endTimeHour"
                  data-testid="sh-endTimeHour"
                  placeholder="Hours"
                  maxLength={2}
                  value={employeeShiftDetails.endTimeHour}
                  onChange={onchangeInputHandler}
                  onBlur={hoursAndMinutesValidation}
                />
              </CCol>
              <CCol sm={1}>
                <CFormInput
                  id="endTimeMinutes"
                  size="sm"
                  type="text"
                  name="endTimeMinutes"
                  data-testid="sh-endTimeMinutes"
                  placeholder="Min"
                  maxLength={2}
                  value={employeeShiftDetails.endTimeMinutes}
                  onChange={onchangeInputHandler}
                  onBlur={hoursAndMinutesValidation}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Grace period :
                <span
                  className={
                    employeeShiftDetails.graceTime
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={2}>
                <CFormInput
                  id="graceTime"
                  size="sm"
                  type="text"
                  name="graceTime"
                  placeholder="In Minutes"
                  maxLength={3}
                  value={employeeShiftDetails.graceTime}
                  onChange={onchangeInputHandler}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CCol sm={{ span: 6, offset: 3 }}>
                <CButton
                  disabled={!isAddBtnEnabled}
                  color="info btn-ovh me-1"
                  onClick={handleAddEmployeeTimeSlot}
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              </CCol>
            </CRow>
          </CForm>
          <CCol xs={12} className="ps-0 pe-0">
            <ShiftListTable
              employeeShifts={employeeShifts}
              actionMapping={actionMapping}
              getToastMessage={getToastMessage}
            />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default ShiftConfiguration
