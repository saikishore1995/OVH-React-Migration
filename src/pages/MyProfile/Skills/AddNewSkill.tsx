import { CButton, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import CIcon from '@coreui/icons-react'
import OToast from '../../../components/ReusableComponent/OToast'
import { cilPlus } from '@coreui/icons'
import { reduxServices } from '../../../reducers/reduxServices'

const AddNewSkill = ({ categoryId }: { categoryId: number }): JSX.Element => {
  const dispatch = useAppDispatch()
  const skills = useTypedSelector(reduxServices.skill.selectors.skills)

  const [newSkillName, setNewSkillName] = useState('')
  const [isAddSkillBtnEnabled, setIsAddSkillBtnEnabled] = useState(false)

  const toastElement = (
    <OToast toastMessage="Skill already exists!" toastColor="danger" />
  )

  useEffect(() => {
    if (newSkillName) {
      setIsAddSkillBtnEnabled(true)
    } else {
      setIsAddSkillBtnEnabled(false)
    }
  }, [newSkillName])

  const handleAddSkill = async () => {
    const toAddSkillName = newSkillName

    if (
      skills.length > 0 &&
      skills.filter(
        (skillItem) =>
          skillItem.skill.toLowerCase() === newSkillName.toLowerCase(),
      ).length > 0
    ) {
      dispatch(reduxServices.app.actions.addToast(toastElement))
      return
    }

    setNewSkillName('')

    dispatch(reduxServices.skill.createSkill({ categoryId, toAddSkillName }))
  }

  const formLabelProps = {
    htmlFor: 'inputNewSkill',
    className: 'col-form-label category-label',
  }

  return (
    <>
      <CRow>
        <CCol sm={4} className="new-category-col">
          <CFormLabel {...formLabelProps}>Skill:</CFormLabel>
        </CCol>
        <CCol sm={4} className="new-category-col">
          <CFormInput
            type="text"
            id="inputNewSkill"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder={'Skill'}
          />
        </CCol>
        <CCol sm={4} className="d-flex align-items-center new-category-col">
          <CButton
            color="info"
            className="px-4 text-white"
            size="sm"
            disabled={!isAddSkillBtnEnabled}
            onClick={handleAddSkill}
          >
            <CIcon icon={cilPlus} />
            Add Skill
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}

export default AddNewSkill
