import { ValidationError } from '../../commonTypes'
export type EmployeeFamilyData = {
  familyId: number
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth: string
  employeeId: string | number
}

export type PersonalInfoTabState = {
  employeeFamilyDetails: EmployeeFamilyData[]
  employeeVisaDetails: VisaDetails[]
  SubCountries: GetCountryDetails
  SubVisa: VisaCountryDetails[]
  editFamilyDetails: EditFamilyDetailsState
  editVisaDetails: EditVisaDetailsState
  isLoading: boolean
  error: ValidationError
}
export type VisaDetails = {
  id: number
  empId: number | string
  empName: string
  visaTypeId: number
  visaType: string
  countryId: number
  countryName: string
  dateOfIssue: string
  dateOfExpire: string
}
export type EmployeeCountryDetails = {
  id: number
  name: string
}

export type GetCountryDetails = {
  countries: EmployeeCountryDetails[]
}
export type VisaCountryDetails = {
  visaTypeId: number | string
  visaType: string
  countryId: number | string
  countryName: string
}
export type EmployeeVisaDetails = {
  id?: number | string
  empId: number | string
  empName: string | number
  visaTypeId: number | string
  visaType?: string
  countryId: number | string
  countryName?: string
  dateOfIssue?: string | Date | number
  dateOfExpire?: string | Date | number
  createdBy?: string
  updatedBy?: string
  createdDate?: string | number
  updatedDate?: string
  visaDetailsPath?: string
  visaDetailsData?: string
  visaThumbPicture?: string | number
}

export type EmployeeVisaDetailsButton = {
  isAddButtonEnabled: boolean
}
export type EditFamilyDetailsState = {
  familyId: number
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth?: string | number
  employeeId: number | string
}

export type EmployeeFamilyDetails = {
  personName: string
  relationShip: string
  contactNumber: string
  dateOfBirth?: string | number
  employeeId: number | string
  familyId?: number
}
export type AddEditEmployeeFamilyDetails = {
  isEditFamilyDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}
export type AddEditEmployeeVisaDetails = {
  isEditVisaDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}
export type EditVisaDetailsState = {
  id: number
  empId: number
  empName: string
  visaTypeId: number
  visaType: string
  countryId: number
  countryName: string
  dateOfIssue?: string | Date | number
  dateOfExpire?: string | Date | number
  createdBy: string
  updatedBy: string
  createdDate?: string | number
  updatedDate: string
  visaDetailsPath: string
  visaDetailsData: string
  visaThumbPicture?: string | number
}

export type AddButtonProps = {
  addButtonHandler: () => void
}
export type EmployeeFamilyDetailsTableProps = {
  editButtonHandler?: (familyId: number) => void
  isFieldDisabled: boolean
  striped: boolean
  bordered: boolean
  tableClassName: string
}
export type EmployeeVisaDetailsTableProps = {
  editVisaButtonHandler: (id: number) => void
}
export type handleActiveTabProps = {
  handleActiveTab: (id: number) => void
}
