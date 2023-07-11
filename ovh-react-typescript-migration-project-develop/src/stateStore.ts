import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import appReducer from './reducers/appSlice'
import authenticationReducer from './reducers/Login/authenticationSlice'
import categoryReducer from './reducers/MyProfile/Categories/categorySlice'
import certificateListReducer from './reducers/EmployeeDirectory/CertificatesList/certificatesListSlice'
import certificateTypeReducer from './reducers/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeSlice'
import { configureStore } from '@reduxjs/toolkit'
import employeeAssetsReducer from './reducers/MyProfile/MyAssetsTab/employeeAssetsSlice'
import employeeCertificationReducer from './reducers/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationSlice'
import employeeDesignationListReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListSlice'
import employeeGeneralInformationReducer from './reducers/MyProfile/GeneralTab/generalInformationSlice'
import employeeListReducer from './reducers/EmployeeDirectory/EmployeesList/employeeListSlice'
import employeeProjectsReducer from './reducers/MyProfile/ProjectsTab/employeeProjectSlice'
import employeeQualificationsReducer from './reducers/MyProfile/QualificationsTab/EmployeeQualifications/employeeQualificationSlice'
import employeeReporteesReducer from './reducers/MyProfile/ReporteesTab/employeeReporteesSlice'
import employeeReviewsReducer from './reducers/MyProfile/ReviewTab/employeeReviewsSlice'
import employeeSkillReducer from './reducers/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import personalInfoReducer from './reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import profileHistoryReducer from './reducers/MyProfile/ProfileHistory/profileHistorySlice'
import qualificationCategoryReducer from './reducers/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategorySlice'
import shiftConfigurationReducer from './reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationSlice'
import sidebarMenuSliceReducer from './reducers/SidebarMenu/sidebarMenuSlice'
import skillReducer from './reducers/MyProfile/Skills/skillSlice'
import thunkMiddleware from 'redux-thunk'
import userRolesAndPermissionsReducer from './reducers/Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'
import visaListReducer from './reducers/EmployeeDirectory/VisaList/visaListSlice'

export const allReducers = {
  app: appReducer,
  authentication: authenticationReducer,
  getLoggedInEmployeeData: employeeGeneralInformationReducer,
  sidebarMenu: sidebarMenuSliceReducer,
  userRolesAndPermissions: userRolesAndPermissionsReducer,
  employeeQualificationsDetails: employeeQualificationsReducer,
  category: categoryReducer,
  personalInfoDetails: personalInfoReducer,
  skill: skillReducer,
  qualificationCategory: qualificationCategoryReducer,
  employeeCertificates: employeeCertificationReducer,
  profileHistory: profileHistoryReducer,
  employeeSkill: employeeSkillReducer,
  employeeReviews: employeeReviewsReducer,
  employeeList: employeeListReducer,
  employeeDesignationList: employeeDesignationListReducer,
  shiftConfiguration: shiftConfigurationReducer,
  employeeReportees: employeeReporteesReducer,
  employeeProjects: employeeProjectsReducer,
  certificateList: certificateListReducer,
  employeeAssets: employeeAssetsReducer,
  certificateType: certificateTypeReducer,
  visaList: visaListReducer,
  // add your slice reducers here
}

const stateStore = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['app/addToast'],
      },
    }).concat(thunkMiddleware),
})

export type RootState = ReturnType<typeof stateStore.getState>
export type AppDispatch = typeof stateStore.dispatch

// eslint-disable-next-line
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default stateStore
