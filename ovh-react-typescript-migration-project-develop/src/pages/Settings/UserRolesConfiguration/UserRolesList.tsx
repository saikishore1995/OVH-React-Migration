import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import React from 'react'
import { UserRolesListProps } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const UserRolesList: React.FC<UserRolesListProps> = ({
  selectedRole,
  setSelectedRole,
}: UserRolesListProps): JSX.Element => {
  const userRoles = useTypedSelector(
    reduxServices.userRolesAndPermissions.selectors.userRoles,
  )

  const handleRoleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole({
      roleId: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    })
  }

  return (
    <>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Role:
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            data-testid="form-select"
            aria-label="Default select example"
            value={selectedRole.roleId}
            onChange={handleRoleSelectChange}
          >
            <option value={''}>Select role</option>
            {userRoles?.map((role, index) => (
              <option key={index} value={role.roleId}>
                {role.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}
export default UserRolesList
