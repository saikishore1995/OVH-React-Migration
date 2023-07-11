import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import { CertificateType } from '../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'

export type EditCertificateTypeProps = {
  cancelCertificateTypeButtonHandler: () => void
  setIsEditCertificateType: (value: boolean) => void
  isEditCertificateType: boolean
}
const EditCertificateType = ({
  cancelCertificateTypeButtonHandler,
  setIsEditCertificateType,
  isEditCertificateType,
}: EditCertificateTypeProps): JSX.Element => {
  const [editCertificateTypeCopy, setEditCertificateTypeCopy] =
    useState<CertificateType>({
      id: 0,
      technologyId: 0,
      technologyName: '',
      certificateType: '',
    })

  const dispatch = useAppDispatch()

  const getAllTechnology = useTypedSelector(
    reduxServices.employeeCertifications.selectors.technologies,
  )

  const editCertificateType = useTypedSelector(
    reduxServices.certificateType.selectors.editCertificateType,
  )

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'certificateType') {
      const newValue = value.replace(/[^a-zA-Z0-9\s]/gi, '').replace(/^\s*/, '')
      setEditCertificateTypeCopy((prevState) => {
        return { ...prevState, ...{ [name]: newValue } }
      })
    } else {
      setEditCertificateTypeCopy((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const toastElement = (
    <OToast
      toastColor="success"
      toastMessage="CertificateType Updated successfully"
    />
  )

  const alreadyExistToastMessage = (
    <OToast
      toastMessage="This CertificateType is already exists"
      toastColor="danger"
    />
  )

  const saveCertificateTypeHandler = async () => {
    const prepareObject = {
      technologyId: editCertificateTypeCopy.technologyId,
      certificateType: editCertificateTypeCopy.certificateType,
    }

    const isCertificateExistsResultAction = await dispatch(
      reduxServices.certificateType.checkIsCertificateTypeExists(prepareObject),
    )
    if (
      reduxServices.certificateType.checkIsCertificateTypeExists.fulfilled.match(
        isCertificateExistsResultAction,
      ) &&
      isCertificateExistsResultAction.payload === false
    ) {
      const updateCertificateTypeResultAction = await dispatch(
        reduxServices.certificateType.updateCertificateType(
          editCertificateTypeCopy,
        ),
      )
      if (
        reduxServices.certificateType.updateCertificateType.fulfilled.match(
          updateCertificateTypeResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(toastElement))
        await dispatch(reduxServices.certificateType.getCertificateTypes())
        setIsEditCertificateType(false)
      }
    } else {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
    }
  }

  useEffect(() => {
    if (isEditCertificateType) {
      setEditCertificateTypeCopy(editCertificateType)
    }
  }, [editCertificateType, isEditCertificateType])

  return (
    <>
      <CTableDataCell scope="row">
        <CCol sm={6}>
          <CFormSelect
            data-testid="form-select"
            aria-label="Default select example"
            size="sm"
            id="technologyId"
            name="technologyId"
            value={editCertificateTypeCopy.technologyId}
            onChange={handleInputChange}
          >
            {getAllTechnology?.map((certificateItem, index) => (
              <option key={index} value={certificateItem.id}>
                {certificateItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CTableDataCell>
      <CTableDataCell scope="row">
        <CCol sm={6}>
          <CFormInput
            type="text"
            id="certificateType"
            size="sm"
            name="certificateType"
            maxLength={32}
            value={editCertificateTypeCopy.certificateType}
            onChange={handleInputChange}
          ></CFormInput>
        </CCol>
      </CTableDataCell>
      <CTableDataCell scope="row">
        <CButton
          color="success"
          data-testid={`sh-save-btn`}
          className="btn-ovh me-1"
          onClick={saveCertificateTypeHandler}
        >
          <i className="fa fa-floppy-o" aria-hidden="true"></i>
        </CButton>
        <CButton
          color="warning"
          className="btn-ovh me-1"
          onClick={cancelCertificateTypeButtonHandler}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </CButton>
      </CTableDataCell>
    </>
  )
}

export default EditCertificateType
