import { EmployeeShiftDetails } from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'

export const mockEmployeeShifts: EmployeeShiftDetails[] = [
  {
    id: 14,
    name: 'UK Shift',
    startTimeHour: '02',
    startTimeMinutes: '00',
    endTimeHour: '11',
    endTimeMinutes: '00',
    graceTime: '00',
  },
  {
    id: 16,
    name: 'Canada Shift',
    startTimeHour: '11',
    startTimeMinutes: '00',
    endTimeHour: '23',
    endTimeMinutes: '35',
    graceTime: '40',
  },
  {
    id: 23,
    name: 'US Shift',
    startTimeHour: '06',
    startTimeMinutes: '00',
    endTimeHour: '66',
    endTimeMinutes: '00',
    graceTime: '30',
  },
  {
    id: 27,
    name: 'German Shift',
    startTimeHour: '07',
    startTimeMinutes: '59',
    endTimeHour: '23',
    endTimeMinutes: '59',
    graceTime: '545',
  },
]
