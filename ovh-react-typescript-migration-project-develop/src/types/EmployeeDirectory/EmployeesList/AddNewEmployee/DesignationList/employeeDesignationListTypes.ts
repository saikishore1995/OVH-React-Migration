import { LoadingState, ValidationError } from '../../../../commonTypes'

export type EmployeeDepartment = {
  departmentId: number
  departmentName: string
}

export type EmployeeDesignation = {
  id?: number
  name: string
  code?: string
  departmentName?: string
  departmentId?: number
}

export type EmployeeDesignationListTableProps = {
  selectedDepartmentId: number
}

export type AddEmployeeDesignationProps = {
  selectedDepartmentId: number
  setSelectedDepartmentId: (value: number) => void
}

export type DesignationListSliceState = {
  employeeDepartments: EmployeeDepartment[]
  employeeDesignations: EmployeeDesignation[]
  refreshList: boolean
  isLoading: LoadingState
  error: ValidationError
}
