import { LoadingState } from '../../commonTypes'

export type Employee = {
  id: number
  firstName: string
  lastName: string
  middleName?: string | null
  designation: string
  fullName: string
  thumbPicture: string
  emailId: string
  mobile: string
  departmentName: string
  bloodgroup: string
  dateOfJoining: string
  country?: string | null
}

export type MockEmployee = {
  id: number
  firstName: string
  lastName: string
  middleName?: string | null
  designation: string
  fullName: string
  thumbPicture: string
  emailId: string
  mobile: string
  departmentName: string
  bloodgroup: string
  dateOfJoining: string
  country?: string | null
  [key: string]: unknown
}

export enum EmploymentStatus {
  'active' = 'Active',
  'contract' = 'Contract',
  'inactive' = 'InActive',
  'pip' = 'underNotice',
}

export type EmployeeListSliceState = {
  employees: Employee[]
  selectedEmploymentStatus: EmploymentStatus
  listSize: number
  isLoading: LoadingState
}

export type EmployeeListApiProps = {
  endIndex?: number
  startIndex?: number
  searchStr?: string
  selectionStatus?: string
}

export type GetEmployeeResponse = {
  emps: Employee[]
  Empsize: number
}

export type EmployeeListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}
