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
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { EmployeeCertificationTableProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useSelectedEmployee } from '../../../../middleware/hooks/useSelectedEmployee'
import parse from 'html-react-parser'

const EmployeeCertificationsTable = ({
  editCertificateButtonHandler,
}: EmployeeCertificationTableProps): JSX.Element => {
  const [isViewingAnotherEmployee, selectedEmployeeId] = useSelectedEmployee()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [certificateId, setCertificateId] = useState(0)
  const employeeCertificates = useTypedSelector((state) =>
    reduxServices.employeeCertifications.selectors.employeeCertificates(
      state,
      isViewingAnotherEmployee,
    ),
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
    if (isViewingAnotherEmployee) {
      dispatch(
        reduxServices.employeeCertifications.getEmployeeCertificateById(
          selectedEmployeeId,
        ),
      )
    } else {
      dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
    }
  }, [dispatch, isViewingAnotherEmployee, selectedEmployeeId])

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="Certificate deleted successfully"
    />
  )
  const handleShowDeleteModal = (certificationId: number) => {
    setCertificateId(certificationId)
    setIsDeleteModalVisible(true)
  }
  const handleConfirmDeleteCertificate = async () => {
    setIsDeleteModalVisible(false)
    const deleteCertificateResultAction = await dispatch(
      reduxServices.employeeCertifications.deleteEmployeeCertificate(
        certificateId,
      ),
    )
    if (
      reduxServices.employeeCertifications.deleteEmployeeCertificate.fulfilled.match(
        deleteCertificateResultAction,
      )
    ) {
      dispatch(reduxServices.employeeCertifications.getEmployeeCertificates())
      dispatch(reduxServices.app.actions.addToast(toastElement))
    }
  }

  const sortedCertificateDetails = useMemo(() => {
    if (employeeCertificates) {
      return employeeCertificates
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.name.localeCompare(sortNode2.name),
        )
    }
  }, [employeeCertificates])

  const tableDataCellProps = {
    colSpan: 9,
    className: 'fw-semibold',
  }

  return (
    <>
      <CTable
        responsive
        striped={isViewingAnotherEmployee}
        bordered={isViewingAnotherEmployee}
      >
        {!isViewingAnotherEmployee ? (
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
              <CTableHeaderCell scope="col">
                Type of Certificate
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Certification</CTableHeaderCell>
              <CTableHeaderCell scope="col">Registration No</CTableHeaderCell>
              <CTableHeaderCell scope="col">Completed Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Expiry Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Percentage</CTableHeaderCell>
              <CTableHeaderCell scope="col">Description</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
        ) : (
          <CTableHead color="primary">
            <CTableRow>
              <CTableDataCell {...tableDataCellProps}>
                Certifications
              </CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Technology</CTableHeaderCell>
              <CTableHeaderCell>Type of Certificate</CTableHeaderCell>
              <CTableHeaderCell>Certification</CTableHeaderCell>
              <CTableHeaderCell>Registration No</CTableHeaderCell>
              <CTableHeaderCell>Completed Date</CTableHeaderCell>
              <CTableHeaderCell>Expiry Date</CTableHeaderCell>
              <CTableHeaderCell>Percentage</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
        )}
        <CTableBody>
          {sortedCertificateDetails?.map((certificateItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.technology ?? 'NA'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.certificateType ?? 'NA'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.name}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.code}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.completedDate}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.expiryDate
                  ? certificateItem.expiryDate
                  : 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.percent ? certificateItem.percent : 'N/A'}
              </CTableDataCell>
              <CTableDataCell scope="row">
                {certificateItem.description
                  ? parse(certificateItem.description)
                  : 'N/A'}
              </CTableDataCell>
              {!isViewingAnotherEmployee ? (
                <CTableDataCell scope="row">
                  <CButton
                    color="info"
                    className="btn-ovh me-1"
                    onClick={() =>
                      editCertificateButtonHandler(certificateItem.id as number)
                    }
                  >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton
                    color="danger"
                    className="btn-ovh me-1"
                    onClick={() =>
                      handleShowDeleteModal(certificateItem.id as number)
                    }
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
        {employeeCertificates?.length
          ? `Total Records: ${employeeCertificates.length}`
          : `No Records Found`}
      </strong>
      <OModal
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteCertificate}
      >
        {`Do you really want to delete this ?`}
      </OModal>
    </>
  )
}

export default EmployeeCertificationsTable
