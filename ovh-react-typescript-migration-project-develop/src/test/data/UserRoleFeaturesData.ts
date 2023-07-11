import { UserFeaturesUnderRole } from '../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'

export const mockUserRoleFeatures: UserFeaturesUnderRole[] = [
  {
    featureId: 1,
    name: 'Dashboard',
    viewaccess: true,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 2,
    name: 'News Feed',
    viewaccess: false,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 125,
    name: 'Handbook',
    viewaccess: true,
    createaccess: true,
    updateaccess: true,
    deleteaccess: true,
    childFeatures: null,
  },
  {
    featureId: 139,
    name: 'Dashboard-Birthdays',
    viewaccess: true,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 137,
    name: 'Dashboard-Earned Leaves',
    viewaccess: true,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 140,
    name: 'Dashboard-Holidays',
    viewaccess: true,
    createaccess: true,
    updateaccess: true,
    deleteaccess: true,
    childFeatures: null,
  },
  {
    featureId: 136,
    name: 'Dashboard-Job Openings',
    viewaccess: true,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 141,
    name: 'ProbationaryEndDates',
    viewaccess: false,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 138,
    name: 'Dashboard-Time In Office',
    viewaccess: true,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 204,
    name: 'Hierarchy ProbationaryEndDates',
    viewaccess: false,
    createaccess: false,
    updateaccess: false,
    deleteaccess: false,
    childFeatures: null,
  },
  {
    featureId: 238,
    name: 'Holiday',
    viewaccess: false,
    createaccess: true,
    updateaccess: true,
    deleteaccess: true,
    childFeatures: null,
  },
]