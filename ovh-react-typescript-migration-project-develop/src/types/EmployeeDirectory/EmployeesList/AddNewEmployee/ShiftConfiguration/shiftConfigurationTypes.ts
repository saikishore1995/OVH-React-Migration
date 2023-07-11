import { ActionMapping } from '../../../../Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type EmployeeShiftDetails = {
  id: number
  name: string
  startTimeHour: string
  startTimeMinutes: string
  endTimeHour: string
  endTimeMinutes: string
  graceTime: string
}

export type ShiftConfigurationState = {
  employeeShifts: EmployeeShiftDetails[]
  isLoading: ApiLoadingState
}

export type ShiftListTableProps = {
  employeeShifts: EmployeeShiftDetails[]
  actionMapping: ActionMapping
  getToastMessage: (value: string) => JSX.Element
}
