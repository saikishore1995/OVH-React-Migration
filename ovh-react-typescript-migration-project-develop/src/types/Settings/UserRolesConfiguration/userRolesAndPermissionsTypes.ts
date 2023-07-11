import { LoadingState, ValidationError } from '../../commonTypes'

export type UserRole = {
  roleId: number
  name: string
  features: null
}

export type CreateUserRole = {
  roleInput: string
  reportingManagerFlag: boolean
}

export type SelectedRole = {
  roleId: number | string
  name: string
}

export type UserRoleChildFeatures = {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: null
}

export type UserRoleFeatures = {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: UserRoleChildFeatures[]
}

export type UserRoleSubFeatures = {
  id: number
  name: string
  features: UserRoleFeatures[]
}

export type UserFeaturesUnderRole = {
  featureId: number
  name: string
  viewaccess: boolean
  createaccess: boolean
  updateaccess: boolean
  deleteaccess: boolean
  childFeatures: null
}
export type UserRolesAndPermissionsState = {
  roles: UserRole[]
  subFeatures: UserRoleSubFeatures[]
  featuresUnderRole: UserFeaturesUnderRole[]
  isLoading: LoadingState
  error: ValidationError
}

export type UtilsChildFeatures = {
  childFeatures: null
  createaccess: boolean
  createaccessChecked?: boolean
  deleteaccess: boolean
  deleteaccessChecked?: boolean
  featureId: number
  name: string
  updateaccess: boolean
  updateaccessChecked?: boolean
  viewaccess: boolean
  viewaccessChecked?: boolean
}

export type UtilsFeatures = {
  childFeatures: UtilsChildFeatures[]
  createaccess: boolean
  createaccessChecked?: boolean
  deleteaccess: boolean
  deleteaccessChecked?: boolean
  featureId: number
  name: string
  updateaccess: boolean
  updateaccessChecked?: boolean
  viewaccess: boolean
  viewaccessChecked?: boolean
}

export type UtilsSubFeatures = {
  features: UtilsFeatures[]
  id: number
  name: string
}

export type ChildFeaturesArrayProps = {
  childFeatures: UtilsChildFeatures[]
  index: number
  subFeatureItemIndex: number
}

export type AddDeleteRoleProps = {
  selectedRole: SelectedRole
  setSelectedRole: (role: SelectedRole) => void
}

export type UserRoleFeaturesExpandableTableProps = {
  selectedRoleId: string | number
}

export type UserRolesListProps = {
  selectedRole: SelectedRole
  setSelectedRole: (role: SelectedRole) => void
}
export type UserRoleSubFeaturesTableProps = {
  childFeaturesArray: ChildFeaturesArrayProps
  checkBoxHandleChange: (
    target: EventTarget & HTMLInputElement,
    subFeatureItemIndex: number,
    index: number,
    accessModifier: AccessModifier,
    childFeatureItemIndex: number,
    isChildFeature: boolean,
  ) => Promise<void>
}

export type ActionMapping = {
  added: string
  deleted: string
  updated?: string
}

export type AccessModifier =
  | 'viewaccessChecked'
  | 'updateaccessChecked'
  | 'createaccessChecked'
  | 'deleteaccessChecked'

export type UtilsRenderPermissionSwitchReturn = {
  featureId: number
  roleId: number
  permission: boolean | undefined
  type: string
}
