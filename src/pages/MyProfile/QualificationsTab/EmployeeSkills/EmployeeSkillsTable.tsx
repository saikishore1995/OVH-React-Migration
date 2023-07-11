import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import { EmployeeSkillInfo } from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../../middleware/hooks/useSelectedEmployee'

const EmployeeSkillsTable: React.FC<EmployeeSkillInfo> = ({
  editSkillButtonHandler,
  striped = false,
  bordered = false,
  isFieldDisabled = false,
  tableClassName = '',
}: EmployeeSkillInfo): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
  const dispatch = useAppDispatch()
  const employeeSkillsData = useTypedSelector((state) =>
    reduxServices.employeeSkill.selectors.employeeSkillDetails(
      state,
      isViewingAnotherEmployee,
    ),
  )

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteSkillId, setToDeleteSkillId] = useState(0)

  useEffect(() => {
    if (isViewingAnotherEmployee) {
      dispatch(
        reduxServices.employeeSkill.getEmployeeSkillsById(selectedEmployeeId),
      )
    } else {
      dispatch(reduxServices.employeeSkill.getEmployeeSkills())
    }
  }, [dispatch, isViewingAnotherEmployee, selectedEmployeeId])

  const handleShowDeleteModal = (skillId: number) => {
    setToDeleteSkillId(skillId)
    setIsDeleteModalVisible(true)
  }
  const handleConfirmDeleteVisaDetails = async () => {
    setIsDeleteModalVisible(false)
    const deleteSkillsResultAction = await dispatch(
      reduxServices.employeeSkill.deleteEmployeeSkill(toDeleteSkillId),
    )
    const toastElement = (
      <OToast
        toastMessage="Skill Detail deleted successfully"
        toastColor={'success'}
      />
    )
    if (
      reduxServices.employeeSkill.deleteEmployeeSkill.fulfilled.match(
        deleteSkillsResultAction,
      )
    ) {
      dispatch(reduxServices.employeeSkill.getEmployeeSkills())
      dispatch(dispatch(reduxServices.app.actions.addToast(toastElement)))
    }
  }

  const tableHeaderCellProps = {
    width: '25%',
    scope: 'col',
  }
  const tableDataCellProps = {
    colSpan: 4,
  }

  return (
    <>
      <CTable
        responsive
        striped={striped || isViewingAnotherEmployee}
        bordered={bordered || isViewingAnotherEmployee}
        className={tableClassName}
      >
        {!isFieldDisabled || isViewingAnotherEmployee ? (
          <CTableHead color="primary">
            <CTableRow>
              <CTableDataCell {...tableDataCellProps}>Skill Set</CTableDataCell>
            </CTableRow>
            {!isFieldDisabled ||
              (isViewingAnotherEmployee && (
                <CTableRow>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Category
                  </CTableHeaderCell>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Skill
                  </CTableHeaderCell>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Competency
                  </CTableHeaderCell>
                  <CTableHeaderCell {...tableHeaderCellProps}>
                    Experience
                  </CTableHeaderCell>
                </CTableRow>
              ))}
          </CTableHead>
        ) : (
          <>
            <CTableHead>
              <CTableRow className="fw-bold">
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                <CTableHeaderCell scope="col">Skill</CTableHeaderCell>
                <CTableHeaderCell scope="col">Competency</CTableHeaderCell>
                <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
                <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
          </>
        )}

        <CTableBody>
          {employeeSkillsData?.map((skillItem, index) => {
            return (
              <CTableRow key={index}>
                {isFieldDisabled && !isViewingAnotherEmployee ? (
                  <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                ) : (
                  <></>
                )}
                <CTableDataCell scope="row">
                  {skillItem.categoryType}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {skillItem.skillType}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {skillItem.competency}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {skillItem.expYear && `${skillItem.expYear}`} Year(`s)&nbsp;
                  {skillItem.expMonth && `${skillItem.expMonth}`} month(`s)
                </CTableDataCell>
                {isFieldDisabled && !isViewingAnotherEmployee ? (
                  <CTableDataCell scope="row">
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      onClick={() =>
                        editSkillButtonHandler?.(skillItem.skillId)
                      }
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton
                      color="danger"
                      className="btn-ovh me-1"
                      onClick={() => handleShowDeleteModal(skillItem.skillId)}
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTableDataCell>
                ) : (
                  <></>
                )}
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      {isFieldDisabled && (
        <>
          <strong>
            {employeeSkillsData?.length
              ? `Total Records: ${employeeSkillsData?.length}`
              : `No Records found`}
          </strong>
          <OModal
            alignment="center"
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            modalHeaderClass="d-none"
            confirmButtonText="Yes"
            cancelButtonText="No"
            confirmButtonAction={handleConfirmDeleteVisaDetails}
          >
            {`Do you really want to delete this ?`}
          </OModal>
        </>
      )}
    </>
  )
}
export default EmployeeSkillsTable
