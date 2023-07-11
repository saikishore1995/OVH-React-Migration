import { LoadingState, ValidationError } from '../../commonTypes'

export type ProfileHistoryItem = {
  // size: number | null
  list: ProfileUpdateData[]
}
export type ProfileUpdateData = {
  id: number | null
  firstName: string | null
  lastName: string | null
  middleName: string | null
  fullName: string | null
  currentLocation: string | null
  baseLocation: string | null
  gender: string | null
  bloodgroup: string | null
  officialBirthday: string | null
  realBirthday: string | null
  maritalStatus: string | null
  departmentName: string | null
  empManager: string | null
  employmentTypeName: string | null
  jobTypeName: string | null
  skypeId: string | null
  aboutMe: string | null
  phone: number | null
  alternativeMobile: number | null
  homeNumber: number | null
  workNumber: number | null
  emergencyContactName: number | null
  emergencyPhone: number | null
  emergencyRelationShip: string | null
  presentAddress: string | null
  presentCity: string | null
  presentZip: string | null
  presentLandMark: string | null
  permanentAddress: string | null
  permanentCity: string | null
  permanentZip: string | null
  permanentLandMark: string | null
  passportNumber: number | null
  passportExpDate: string | null
  passportIssuedPlace: string | null
  passportIssuedDate: string | null
  personName: string | null
  relationShip: string | null
  contactNumber: string | null
  dateOfBirth: string | null
  marriageDate: string | null
  homeCode: string | null
  workCode: string | null
  timeSlot: string | null
  role: string | null
  empRole: string | null
  designation: string | null
  releavingDate: string | null
  underNoticeDate: string | null
  underNotice: string | null
  manager: string | null
  statusName: string | null
  hrAssociate: string | null
  modifiedDate: string | null
  modifiedBy: string | null
  persistType: string | null
  columnName: string | null
  additionalInfo: string | null
  oldrole: string | null
  oldstatusName: string | null
  oldmanager: string | null
  olddesignation: string | null
  oldreleavingDate: string | null
  oldunderNoticeDate: string | null
  oldunderNotice: string | null
  oldempRole: string | null
  oldFirstName: string | null
  oldtimeSlot: string | null
  oldLastName: string | null
  oldMiddleName: string | null
  oldFullName: string | null
  oldCurrentLocation: string | null
  oldBaseLocation: string | null
  oldgender: string | null
  oldbloodGroup: string | null
  oldOfficalBirthday: string | null
  oldRealBirthday: string | null
  oldMartialStatus: string | null
  oldDepartmentName: string | null
  oldEmpManager: string | null
  oldEmploymentTypeName: string | null
  oldJobTypeName: string | null
  oldSkypeId: string | null
  oldAboutMe: string | null
  oldPhone: number | null
  oldAlternativeMobile: number | null
  oldHomeNumber: number | null
  oldWorkNumber: number | null
  oldEmergencyContactName: string | null
  oldEmergencyPhone: number | null
  oldEmergencyRelationShip: string | null
  oldPresentAddress: string | null
  oldPresentCity: string | null
  oldPresentZip: string | null
  oldPresentLandMark: string | null
  oldPermanentAddress: string | null
  oldPermanentCity: string | null
  oldPermanentZip: string | null
  oldPermanentLandMark: string | null
  oldPassportNumber: number | null
  oldPassportExpDate: string | null
  oldPassportIssuedPlace: string | null
  oldPassportIssuedDate: string | null
  oldPersonName: string | null
  oldRelationShip: string | null
  oldContactNumber: string | null
  oldDateOfBirth: string | null
  oldMarriageDate: string | null
  oldHomeCode: string | null
  oldWorkCode: string | null
  oldHrAssociate: string | null
  isAbsconeded: string | null
  oldisAbsconed: string | null
  oldComments: string | null
  comments: string | null
}
export type EmployeeProfileHistoryProps = {
  employeeProfileHistory: ProfileUpdateData[]
}
export type ProfileHistoryState = {
  profileHistoryList: ProfileUpdateData[]
  error: ValidationError
  isLoading: LoadingState
}
