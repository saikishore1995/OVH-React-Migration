export interface ApiBase {
  get?: string
  insert?: string
  update?: string
  delete?: string
}

export interface AuthenticationApi extends ApiBase {
  login: string
  logout: string
}
export interface SideMenuApi extends ApiBase {
  getMenuData: string
}

export interface CategoryApi extends ApiBase {
  getAllCategories: string
  addCategory: string
  deleteCategory: string
}
export interface PersonalInfoApi extends ApiBase {
  getFamilyDetails: string
  getVisaDetails: string
  getCountryDetails: string
  getVisaTypeDetails: string
  addNewVisaMember: string
  getFamilyInformation: string
  updateFamilyInformation: string
  addNewFamilyMember: string
  getVisaInformation: string
  updateVisaInformation: string
  deleteFamilyMember: string
  deleteVisaDetail: string
  fileUploadVisaImage: string
}

export interface SkillApi extends ApiBase {
  getSkillListForCategory: string
  addNewSkillForCategory: string
  deleteSkillForCategory: string
}

export interface EmployeeSkillApi extends ApiBase {
  getEmployeeSkills: string
  addEmployeeSkill: string
  getEmployeeSkillInformation: string
  updateEmployeeSkillInformation: string
  deleteEmployeeSkill: string
  getEmployeeSkillsById: string
}

export interface EmployeeQualificationCategoryApi extends ApiBase {
  getQualificationCategories: string
  createQualificationCategory: string
  deleteQualificationCategory: string
}
export interface EmployeeGeneralInformationApi extends ApiBase {
  getLoggedInEmployeeData: string
}

export interface PersonalInfoApi extends ApiBase {
  getFamilyDetails: string
}
export interface EmployeeQualificationsApi extends ApiBase {
  getEmployeeQualifications: string
  getPostGraduationAndGraduationLookUp: string
  addEmployeeQualifications: string
  updateEmployeeQualifications: string
}

export interface EmployeeCertificationsApi extends ApiBase {
  getEmployeeCertificates: string
  getTechnologies: string
  getCertificateByTechnology: string
  createEmployeeCertification: string
  getEmployeeCertificate: string
  updateEmployeeCertificate: string
  deleteEmployeeCertificate: string
  getEmployeeCertificateById: string
}

export interface UserRolesConfigurationApi extends ApiBase {
  getUserRoles: string
  isUserRoleExists: string
  createUserRole: string
  deleteUserRole: string
  getSubFeatures: string
  featuresUnderRole: string
  assignPermission: string
}

export interface PersonalInfoApi extends ApiBase {
  getFamilyDetails: string
  getVisaDetails: string
  getCountryDetails: string
  getVisaTypeDetails: string
  addNewVisaMember: string
  getFamilyInformation: string
  updateFamilyInformation: string
  addNewFamilyMember: string
  getVisaInformation: string
  updateVisaInformation: string
  deleteFamilyMember: string
  deleteVisaDetail: string
  fileUploadVisaImage: string
}

export interface ProfileHistoryApi extends ApiBase {
  getprofileHistory: string
}
export interface BasicInfoApi extends ApiBase {
  defaultPicByGender: string
  updateEmployeeDetails: string
  uploadEmployeeCV: string
  uploadEmployeeImage: string
  downloadEmployeeCV: string
  downloadSampleCV: string
}

export interface EmployeeReviewsApi extends ApiBase {
  getEmployeeReviews: string
}
export interface EmployeeListApi extends ApiBase {
  getEmployeeList: string
  exportEmployeeData: string
}

export interface EmployeeDesignationListApi extends ApiBase {
  getEmployeeDepartments: string
  getEmployeeDesignations: string
  addEmployeeDesignation: string
  deleteEmployeeDesignation: string
}

export interface ShiftConfigurationApi extends ApiBase {
  getAllShifts: string
  addTimeSlot: string
  updateShiftDetail: string
  deleteShiftDetail: string
}
export interface CertificateListApi extends ApiBase {
  getAllEmployeeCertificates: string
  exportCertificateList: string
}

export interface EmployeeAssetsApi extends ApiBase {
  getEmployeeAssets: string
}

export interface CertificateTypeApi extends ApiBase {
  getCertificateTypes: string
  addCertificateType: string
  checkIsCertificateTypeExists: string
  deleteCertificateType: string
  getCertificateType: string
  updateCertificateType: string
}

export interface EmployeeProjectsApi extends ApiBase {
  getEmployeeProjects: string
  getProjectDetails: string
}

export interface EmployeeReporteesApi extends ApiBase {
  getEmployeeReportees: string
  getEmployeeReporteesKRAs: string
  getEmployeeReporteesKPIs: string
}

export interface VisaListApi extends ApiBase {
  getVisaList: string
  getCountries: string
  getVisaTypes: string
  exportVisaList: string
}
