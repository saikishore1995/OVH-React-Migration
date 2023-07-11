import {
  AccessModifier,
  UserFeaturesUnderRole,
  UserRoleChildFeatures,
  UserRoleSubFeatures,
  UtilsChildFeatures,
  UtilsFeatures,
  UtilsRenderPermissionSwitchReturn,
} from '../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'

// map features with child features and return a single array
const mapFeaturesToChildFeatures = (
  features: UserFeaturesUnderRole[],
  childFeatures: UserRoleChildFeatures[],
): unknown => {
  return childFeatures.map((subFeatureItem) => {
    const filteredFeature = features.find(
      (featureItem) => featureItem.featureId === subFeatureItem.featureId,
    )
    if (filteredFeature) {
      return {
        ...subFeatureItem,
        viewaccessChecked: filteredFeature.viewaccess ?? false,
        deleteaccessChecked: filteredFeature.deleteaccess ?? false,
        createaccessChecked: filteredFeature.createaccess ?? false,
        updateaccessChecked: filteredFeature.updateaccess ?? false,
      }
    }
    return { ...subFeatureItem }
  })
}

// map features with sub features and return a single array
export const mapFeaturesToSubFeatures = (
  features: UserFeaturesUnderRole[],
  subFeatures: UserRoleSubFeatures[],
): unknown => {
  return subFeatures.map((item) => {
    const mappedFeatures = item.features.map((subFeatureItem) => {
      const filteredFeature = features.find(
        (featureItem) => featureItem.featureId === subFeatureItem.featureId,
      )
      let mappedChildFeatures
      if (subFeatureItem.childFeatures.length !== 0) {
        mappedChildFeatures = mapFeaturesToChildFeatures(
          features,
          subFeatureItem.childFeatures,
        )
      }
      if (filteredFeature) {
        return {
          ...subFeatureItem,
          viewaccessChecked: filteredFeature.viewaccess ?? false,
          deleteaccessChecked: filteredFeature.deleteaccess ?? false,
          createaccessChecked: filteredFeature.createaccess ?? false,
          updateaccessChecked: filteredFeature.updateaccess ?? false,
          childFeatures: mappedChildFeatures,
        }
      }
      return { ...subFeatureItem }
    })

    return { ...item, features: mappedFeatures }
  })
}

export const renderPermissionSwitch = (
  params: AccessModifier,
  changedObject: UtilsChildFeatures | UtilsFeatures,
  selectedRole: number,
): UtilsRenderPermissionSwitchReturn => {
  const prepareObject = {
    featureId: changedObject.featureId,
    roleId: selectedRole,
    permission: changedObject[params],
  }
  switch (params) {
    case 'viewaccessChecked':
      return {
        ...prepareObject,
        type: 'View',
      }
    case 'createaccessChecked':
      return {
        ...prepareObject,
        type: 'Create',
      }
    case 'updateaccessChecked':
      return {
        ...prepareObject,
        type: 'Edit',
      }
    case 'deleteaccessChecked':
      return {
        ...prepareObject,
        type: 'Delete',
      }
  }
}
