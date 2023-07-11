import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OToast from '../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { AddCertificateTypeProps } from '../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'

const AddNewCertificateType = ({
  selectedTechnologyId,
  setSelectedTechnologyId,
}: AddCertificateTypeProps): JSX.Element => {
  const [newCertificateType, setNewCertificateType] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const getAllTechnology = useTypedSelector(
    reduxServices.employeeCertifications.selectors.technologies,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
  }, [dispatch])

  useEffect(() => {
    if (selectedTechnologyId && newCertificateType) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [newCertificateType, selectedTechnologyId])

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name } = event.target
    if (name === 'certificate') {
      setNewCertificateType(
        event.target.value.replace(/[^a-zA-Z0-9\s]/gi, '').replace(/^\s*/, ''),
      )
    } else {
      setSelectedTechnologyId(+event.target.value)
    }
  }

  const successToastMessage = (
    <OToast
      toastMessage="Certificate type added successfully"
      toastColor="success"
    />
  )

  const alreadyExistToastMessage = (
    <OToast
      toastMessage="This CertificateType is already exists"
      toastColor="danger"
    />
  )
  const handleAddCertificateType = async () => {
    const prepareObject = {
      technologyId: selectedTechnologyId,
      certificateType: newCertificateType,
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
      const addCertificateTypeResultAction = await dispatch(
        reduxServices.certificateType.addCertificateType(prepareObject),
      )

      if (
        reduxServices.certificateType.addCertificateType.fulfilled.match(
          addCertificateTypeResultAction,
        )
      ) {
        dispatch(reduxServices.app.actions.addToast(successToastMessage))
        handleClearInputFields()
      }
      dispatch(reduxServices.certificateType.getCertificateTypes())
    } else {
      dispatch(reduxServices.app.actions.addToast(alreadyExistToastMessage))
    }
  }

  const handleClearInputFields = () => {
    setNewCertificateType('')
    setSelectedTechnologyId(0)
  }

  const formLabelProps = {
    htmlFor: 'inputNewCertificateType',
    className: 'col-form-label',
  }

  return (
    <>
      <CForm>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Technology:{' '}
            <span
              className={selectedTechnologyId ? 'text-white' : 'text-danger'}
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              data-testid="form-select"
              aria-label="Default select example"
              size="sm"
              name="technology"
              value={selectedTechnologyId}
              onChange={handleInputChange}
            >
              <option value={''}>Select Technology</option>
              {getAllTechnology?.map((certificateItem, index) => (
                <option key={index} value={certificateItem.id}>
                  {certificateItem.name}
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-3 col-form-label text-end"
          >
            Certificate:
            <span className={newCertificateType ? 'text-white' : 'text-danger'}>
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              id="Name"
              size="sm"
              name="certificate"
              maxLength={32}
              value={newCertificateType}
              onChange={handleInputChange}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 mb-3">
          <CCol className="col-md-3 offset-md-3">
            <CButton
              color="success"
              className="btn-ovh me-1"
              size="sm"
              disabled={!isAddButtonEnabled}
              onClick={handleAddCertificateType}
            >
              Add
            </CButton>
            <CButton
              color="warning "
              className="btn-ovh"
              onClick={handleClearInputFields}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddNewCertificateType
