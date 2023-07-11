import {
  EmployeeReportee,
  EmployeeReporteesKRA,
} from '../../types/MyProfile/ReporteesTab/employeeReporteesType'

export const mockReporteesDetails: EmployeeReportee[] = [
  {
    managerId: 1002,
    managerName: 'Chaitanya Mudunuri',
    reporteeId: 1989,
    reporteeName: 'Finance F',
    allcoationDetails: '',
    mobile: null,
  },
  {
    managerId: 1985,
    managerName: 'Vinesh Merugu',
    reporteeId: 1002,
    reporteeName: 'Chaitanya Mudunuri',
    allcoationDetails: '',
    mobile: '+919703734734',
  },
]

export const mockReporteesKRAs: EmployeeReporteesKRA[] = [
  {
    id: 149,
    name: 'Finance Management',
    description: '',
    kpiLookps: null,
    count: 3,
    checkType: null,
    designationName: 'Finance and Account Executive ',
    designationId: 51,
    departmentName: 'Accounts',
    departmentId: 4,
    designationKraPercentage: 30.0,
    personId: 0,
  },
  {
    id: 150,
    name: 'Management Information System',
    description: '',
    kpiLookps: null,
    count: 2,
    checkType: null,
    designationName: 'Finance and Account Executive ',
    designationId: 51,
    departmentName: 'Accounts',
    departmentId: 4,
    designationKraPercentage: 30.0,
    personId: 0,
  },
]
