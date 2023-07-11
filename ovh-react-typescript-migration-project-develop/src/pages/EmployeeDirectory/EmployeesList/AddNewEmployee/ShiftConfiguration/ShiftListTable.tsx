import {
  CButton,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import {
  EmployeeShiftDetails,
  ShiftListTableProps,
} from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import React, { useMemo, useState } from 'react'

import OModal from '../../../../../components/ReusableComponent/OModal'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'

const ShiftListTable = ({
  employeeShifts,
  actionMapping,
  getToastMessage,
}: ShiftListTableProps): JSX.Element => {
  const [selectShiftId, setSelectShiftId] = useState<number>(0)
  const [selectShiftName, setSelectShiftName] = useState<string>('')
  const [isShiftDetailEdit, setIsShiftDetailEdit] = useState<boolean>(false)
  const [editEmployeeShiftDetails, setEditEmployeeShiftDetails] =
    useState<EmployeeShiftDetails>({
      id: 0,
      name: '',
      startTimeHour: '',
      startTimeMinutes: '',
      endTimeHour: '',
      endTimeMinutes: '',
      graceTime: '',
    })

  const [deleteShiftModalVisibility, setDeleteShiftModalVisibility] =
    useState<boolean>(false)
  const dispatch = useAppDispatch()

  const editEmployeeShiftOnchangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    const newValue = value.replace(/[^0-9]/gi, '')
    setEditEmployeeShiftDetails((prevState) => {
      return { ...prevState, ...{ [name]: newValue } }
    })
  }

  const editHoursAndMinutesValidation = () => {
    if (editEmployeeShiftDetails.endTimeMinutes !== undefined || '' || null) {
      if (editEmployeeShiftDetails.endTimeMinutes.length === 1) {
        editEmployeeShiftDetails.endTimeMinutes =
          '0' + editEmployeeShiftDetails.endTimeMinutes
      } else {
        if (+editEmployeeShiftDetails.endTimeMinutes > 59) {
          editEmployeeShiftDetails.endTimeMinutes = '59'
        }
      }
    }
    if (editEmployeeShiftDetails.startTimeMinutes !== undefined || '' || null) {
      if (editEmployeeShiftDetails.startTimeMinutes.length === 1) {
        editEmployeeShiftDetails.startTimeMinutes =
          '0' + editEmployeeShiftDetails.startTimeMinutes
      } else {
        if (+editEmployeeShiftDetails.startTimeMinutes > 59) {
          editEmployeeShiftDetails.startTimeMinutes = '59'
        }
      }
    }
    if (editEmployeeShiftDetails.startTimeHour !== undefined || '' || null) {
      if (editEmployeeShiftDetails.startTimeHour.length === 1) {
        editEmployeeShiftDetails.startTimeHour =
          '0' + editEmployeeShiftDetails.startTimeHour
      } else {
        if (+editEmployeeShiftDetails.startTimeHour > 23) {
          editEmployeeShiftDetails.startTimeHour = '23'
        }
      }
    }
    if (editEmployeeShiftDetails.endTimeHour !== undefined || '' || null) {
      if (editEmployeeShiftDetails.endTimeHour.length === 1) {
        editEmployeeShiftDetails.endTimeHour =
          '0' + editEmployeeShiftDetails.endTimeHour
      } else {
        if (+editEmployeeShiftDetails.endTimeHour > 23) {
          editEmployeeShiftDetails.endTimeHour = '23'
        }
      }
    }
  }

  const editShiftDetailsButtonHandler = (
    shiftId: number,
    startTimeHour: string,
    startTimeMinutes: string,
    endTimeHour: string,
    endTimeMinutes: string,
    graceTime: string,
  ): void => {
    setIsShiftDetailEdit(true)
    setSelectShiftId(shiftId)
    setEditEmployeeShiftDetails({
      id: shiftId,
      name: '',
      startTimeHour: startTimeHour,
      startTimeMinutes: startTimeMinutes,
      endTimeHour: endTimeHour,
      endTimeMinutes: endTimeMinutes,
      graceTime: graceTime,
    })
  }

  const saveShiftDetailsButtonHandler = async () => {
    const updateEmployeeShiftDetailResultAction = await dispatch(
      reduxServices.shiftConfiguration.updateEmployeeShiftDetail(
        editEmployeeShiftDetails,
      ),
    )
    if (
      reduxServices.shiftConfiguration.updateEmployeeShiftDetail.fulfilled.match(
        updateEmployeeShiftDetailResultAction,
      )
    ) {
      await dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
      setIsShiftDetailEdit(false)
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.updated as string),
        ),
      )
    }
  }

  const deleteShiftDetailButtonHandler = async (
    shiftId: number,
    name: string,
  ) => {
    setDeleteShiftModalVisibility(true)
    setSelectShiftId(shiftId)
    setSelectShiftName(name)
  }

  const confirmDeleteShiftButtonHandler = async () => {
    setDeleteShiftModalVisibility(false)

    const deleteEmployeeShiftDetailResultAction = await dispatch(
      reduxServices.shiftConfiguration.deleteEmployeeShiftDetail(selectShiftId),
    )
    if (
      reduxServices.shiftConfiguration.deleteEmployeeShiftDetail.fulfilled.match(
        deleteEmployeeShiftDetailResultAction,
      )
    ) {
      await dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.deleted),
        ),
      )
    }
  }

  const sortedEmployeeShifts = useMemo(() => {
    if (employeeShifts) {
      return employeeShifts
        .slice()
        .sort((employeeShift1, employeeShift2) =>
          employeeShift1.name.localeCompare(employeeShift2.name),
        )
    }
  }, [employeeShifts])

  const tableHeaderCellPropsSNo = {
    width: '6%',
    scope: 'col',
  }
  const tableHeaderCellPropsShiftName = {
    width: '17%',
    scope: 'col',
  }
  const tableHeaderCellPropsStartTime = {
    width: '21%',
    scope: 'col',
  }
  const tableHeaderCellPropsGrace = {
    width: '21%',
    scope: 'col',
  }
  const tableHeaderCellPropsAction = {
    width: '14%',
    scope: 'col',
  }

  return (
    <>
      <CTable
        striped
        responsive
        className="ps-0 pe-0 shift-configuration-table"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell {...tableHeaderCellPropsSNo}>#</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsShiftName}>
              Shift Name
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsStartTime}>
              Start time
            </CTableHeaderCell>
            <CTableHeaderCell>End time</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsGrace}>
              Grace Period
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsAction}>
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {sortedEmployeeShifts?.map((employeeShift, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  {employeeShift.name}
                </CTableDataCell>
                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <div className="d-flex align-items-center">
                      <div className="edit-time-control sh-left">
                        <CFormInput
                          id="startTimeHour"
                          data-testid={`sh-startTimeHour-input${index}`}
                          size="sm"
                          type="text"
                          name="startTimeHour"
                          maxLength={2}
                          value={editEmployeeShiftDetails.startTimeHour}
                          onChange={editEmployeeShiftOnchangeHandler}
                          onBlur={editHoursAndMinutesValidation}
                        />
                      </div>
                      <div className="edit-time-control">
                        <CFormInput
                          id="startTimeMinutes"
                          data-testid={`sh-startTimeMinutes-input${index}`}
                          size="sm"
                          type="text"
                          name="startTimeMinutes"
                          maxLength={2}
                          value={editEmployeeShiftDetails.startTimeMinutes}
                          onChange={editEmployeeShiftOnchangeHandler}
                          onBlur={editHoursAndMinutesValidation}
                        />
                      </div>
                    </div>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {`${employeeShift.startTimeHour}:${employeeShift.startTimeMinutes}`}
                  </CTableDataCell>
                )}
                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <div className="d-flex align-items-center">
                      <div className="edit-time-control sh-left">
                        <CFormInput
                          id="endTimeHour"
                          data-testid={`sh-endTimeHour-input${index}`}
                          size="sm"
                          type="text"
                          name="endTimeHour"
                          maxLength={2}
                          value={editEmployeeShiftDetails.endTimeHour}
                          onChange={editEmployeeShiftOnchangeHandler}
                          onBlur={editHoursAndMinutesValidation}
                        />
                      </div>
                      <div className="edit-time-control">
                        <CFormInput
                          id="endTimeMinutes"
                          data-testid={`sh-endTimeMinutes-input${index}`}
                          size="sm"
                          type="text"
                          name="endTimeMinutes"
                          maxLength={2}
                          value={editEmployeeShiftDetails.endTimeMinutes}
                          onChange={editEmployeeShiftOnchangeHandler}
                          onBlur={editHoursAndMinutesValidation}
                        />
                      </div>
                    </div>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">{`${employeeShift.endTimeHour}:${employeeShift.endTimeMinutes}`}</CTableDataCell>
                )}

                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <div className="edit-time-control">
                      <CFormInput
                        id="graceTime"
                        data-testid={`sh-graceTime-input${index}`}
                        size="sm"
                        type="text"
                        name="graceTime"
                        maxLength={3}
                        value={editEmployeeShiftDetails.graceTime}
                        onChange={editEmployeeShiftOnchangeHandler}
                      />
                    </div>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {employeeShift.graceTime}
                  </CTableDataCell>
                )}

                <CTableDataCell scope="row">
                  {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                    <CButton
                      color="success"
                      data-testid={`sh-save-btn${index}`}
                      className="btn-ovh me-1"
                      onClick={saveShiftDetailsButtonHandler}
                    >
                      <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    </CButton>
                  ) : (
                    <CButton
                      color="info"
                      data-testid={`sh-edit-btn${index}`}
                      className="btn-ovh me-1"
                      onClick={() => {
                        editShiftDetailsButtonHandler(
                          employeeShift.id,
                          employeeShift.startTimeHour,
                          employeeShift.startTimeMinutes,
                          employeeShift.endTimeHour,
                          employeeShift.endTimeMinutes,
                          employeeShift.graceTime,
                        )
                      }}
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                  )}

                  <CButton
                    color="danger"
                    data-testid={`sh-delete-btn${index}`}
                    className="btn-ovh me-1"
                    onClick={() => {
                      deleteShiftDetailButtonHandler(
                        employeeShift.id,
                        employeeShift.name,
                      )
                    }}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {employeeShifts.length}</strong>
          </p>
        </CCol>
      </CRow>
      <OModal
        alignment="center"
        visible={deleteShiftModalVisibility}
        setVisible={setDeleteShiftModalVisibility}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={confirmDeleteShiftButtonHandler}
      >
        <p>
          Are you sure you want to delete this
          <strong>{` ${selectShiftName}`}</strong> Role ?
        </p>
      </OModal>
    </>
  )
}

export default ShiftListTable
