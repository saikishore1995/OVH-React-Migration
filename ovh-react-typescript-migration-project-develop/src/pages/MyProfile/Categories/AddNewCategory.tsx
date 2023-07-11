import { CButton, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import CIcon from '@coreui/icons-react'
import OToast from '../../../components/ReusableComponent/OToast'
import { cilPlus } from '@coreui/icons'
import { reduxServices } from '../../../reducers/reduxServices'

const AddNewCategory = (): JSX.Element => {
  const categories = useTypedSelector(
    reduxServices.category.selectors.categories,
  )
  const dispatch = useAppDispatch()

  const [newCategoryName, setNewCategoryName] = useState('')
  const [isAddCategoryBtnEnabled, setIsAddCategoryBtnEnabled] = useState(false)

  const toastElement = (
    <OToast toastMessage="Category already exists!" toastColor="danger" />
  )

  useEffect(() => {
    if (newCategoryName) {
      setIsAddCategoryBtnEnabled(true)
    } else {
      setIsAddCategoryBtnEnabled(false)
    }
  }, [newCategoryName])

  const handleAddCategory = async () => {
    const toAddCategoryName = newCategoryName

    if (
      categories.length > 0 &&
      categories.filter(
        (category) =>
          category.categoryType.toLowerCase() === newCategoryName.toLowerCase(),
      ).length > 0
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      return
    }

    setNewCategoryName('')

    dispatch(reduxServices.category.createCategory(toAddCategoryName))
  }

  const formLabelProps = {
    htmlFor: 'inputNewCategory',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <CRow>
        <CCol sm={4} className="new-category-col">
          <CFormLabel {...formLabelProps}>Category:</CFormLabel>
        </CCol>
        <CCol sm={4} className="new-category-col">
          <CFormInput
            type="text"
            id="inputNewCategory"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder={'Category Name'}
          />
        </CCol>
        <CCol sm={4} className="d-flex align-items-center new-category-col">
          <CButton
            color="info"
            className="px-4 text-white"
            size="sm"
            disabled={!isAddCategoryBtnEnabled}
            onClick={handleAddCategory}
          >
            <CIcon icon={cilPlus} />
            Add Category
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default AddNewCategory
