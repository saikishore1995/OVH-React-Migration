import { CCardHeader } from '@coreui/react-pro'
import EmployeeGeneralInformation from './GeneralInformation'
import EmployeeSkillsTable from '../QualificationsTab/EmployeeSkills/EmployeeSkillsTable'
import FamilyDetailsTable from '../PersonalInfoTab/FamilyDetailsTable'
import React from 'react'
import { useSelectedEmployee } from '../../../middleware/hooks/useSelectedEmployee'

const GeneralTab = (): JSX.Element => {
  const [isViewingAnotherEmployee] = useSelectedEmployee()

  return (
    <>
      <EmployeeGeneralInformation />
      <CCardHeader className="fw-semibold">Other Information</CCardHeader>
      <FamilyDetailsTable
        striped={true}
        bordered={true}
        isFieldDisabled={false}
        tableClassName="mt-4"
      />
      {!isViewingAnotherEmployee ? (
        <EmployeeSkillsTable
          striped={true}
          bordered={true}
          isFieldDisabled={false}
          tableClassName={''}
        />
      ) : (
        ''
      )}
    </>
  )
}
export default GeneralTab
