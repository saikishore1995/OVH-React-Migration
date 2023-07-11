import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import { EmployeeVisaDetailsTableProps } from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'

const VisaDetailsTable = ({
  editVisaButtonHandler,
}: EmployeeVisaDetailsTableProps): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteVisaId, setToDeleteVisaId] = useState(0)
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const getEmployeeVisaData = useTypedSelector(
    reduxServices.personalInformation.selectors.visaDetails,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      reduxServices.personalInformation.getEmployeeVisaDetails(
        isViewingAnotherEmployee ? selectedEmployeeId : employeeId,
      ),
    )
  }, [dispatch, employeeId, isViewingAnotherEmployee, selectedEmployeeId])

  const handleShowDeleteModal = (visaId: number) => {
    setToDeleteVisaId(visaId)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDeleteVisaDetails = async () => {
    setIsDeleteModalVisible(false)
    const deleteFamilyMemberResultAction = await dispatch(
      reduxServices.personalInformation.deleteEmployeeVisa(toDeleteVisaId),
    )
    if (
      reduxServices.personalInformation.deleteEmployeeVisa.fulfilled.match(
        deleteFamilyMemberResultAction,
      )
    ) {
      dispatch(
        reduxServices.personalInformation.getEmployeeVisaDetails(employeeId),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Visa Detail deleted successfully"
          />,
        ),
      )
    }
  }

  const sortedVisaDetails = useMemo(() => {
    if (getEmployeeVisaData) {
      return getEmployeeVisaData
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.countryName.localeCompare(sortNode2.countryName),
        )
    }
  }, [getEmployeeVisaData])

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">Visa Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Issue</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date of Expire</CTableHeaderCell>
            {!isViewingAnotherEmployee ? (
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            ) : (
              <></>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {sortedVisaDetails?.map((visaItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">
                {visaItem.countryName}
              </CTableDataCell>
              <CTableDataCell scope="row">{visaItem.visaType}</CTableDataCell>
              <CTableDataCell scope="row">
                {visaItem.dateOfIssue}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {visaItem.dateOfExpire}
              </CTableDataCell>
              {!isViewingAnotherEmployee ? (
                <CTableDataCell scope="row">
                  <CButton
                    color="info btn-ovh me-2"
                    onClick={() => editVisaButtonHandler(visaItem.id)}
                  >
                    <i className="fa fa-pencil-square-o"></i>
                  </CButton>
                  <CButton
                    color="danger btn-ovh me-2"
                    onClick={() => handleShowDeleteModal(visaItem.id)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              ) : (
                <></>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <strong>
        {getEmployeeVisaData?.length
          ? `Total Records: ${getEmployeeVisaData?.length}`
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
  )
}
export default VisaDetailsTable
