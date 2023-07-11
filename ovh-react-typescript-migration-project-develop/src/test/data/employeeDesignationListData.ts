import {
  EmployeeDepartment,
  EmployeeDesignation,
} from '../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'

export const mockDesignationList: EmployeeDesignation[] = [
  {
    id: 33,
    name: 'Accounts & Finance',
    code: '33',
    departmentName: 'Accounts',
    departmentId: 4,
  },
  {
    id: 20,
    name: 'Accounts Executive',
    code: '20',
    departmentName: 'Accounts',
    departmentId: 4,
  },
  {
    id: 51,
    name: 'Finance and Account Executive ',
    code: '51',
    departmentName: 'Accounts',
    departmentId: 4,
  },
  {
    id: 68,
    name: 'Finance and Accounts Manager',
    code: '68',
    departmentName: 'Accounts',
    departmentId: 4,
  },
]

export const mockDepartments: EmployeeDepartment[] = [
  {
    departmentId: 1,
    departmentName: 'Networking',
  },
  {
    departmentId: 2,
    departmentName: 'Administrative',
  },
  {
    departmentId: 3,
    departmentName: 'HR',
  },
  {
    departmentId: 4,
    departmentName: 'Accounts',
  },
  {
    departmentId: 5,
    departmentName: 'Designing',
  },
  {
    departmentId: 6,
    departmentName: 'Development',
  },
  {
    departmentId: 7,
    departmentName: 'Sales',
  },
  {
    departmentId: 8,
    departmentName: 'Testing',
  },
  {
    departmentId: 9,
    departmentName: 'Business Analyst',
  },
  {
    departmentId: 10,
    departmentName: 'Presales',
  },
  {
    departmentId: 11,
    departmentName: 'Marketing',
  },
  {
    departmentId: 12,
    departmentName: 'Software Quality Assurance',
  },
]
