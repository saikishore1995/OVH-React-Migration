import React, { useEffect, useState } from 'react'

import AddDeleteRoleButtons from './AddDeleteRoleButtons'
import OCard from '../../../components/ReusableComponent/OCard'
import { SelectedRole } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import UserRoleFeaturesExpandableTable from './UserRoleFeaturesExpandableTable'
import UserRolesList from './UserRolesList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'

const initialSelectedRoleState = {} as SelectedRole
const UserRolesAndPermission: React.FC = (): JSX.Element => {
  const [selectedRole, setSelectedRole] = useState(initialSelectedRoleState)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.userRolesAndPermissions.getUserRoles())
    dispatch(reduxServices.userRolesAndPermissions.getUserRoleSubFeatures())
  }, [dispatch])

  return (
    <>
      <OCard
        className="mb-4"
        title="Roles and Permissions"
        CFooterClassName="d-none"
      >
        <UserRolesList
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <AddDeleteRoleButtons
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />
        <UserRoleFeaturesExpandableTable selectedRoleId={selectedRole.roleId} />
      </OCard>
    </>
  )
}

export default UserRolesAndPermission
