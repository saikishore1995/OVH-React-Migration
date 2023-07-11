import { LoadingState, ValidationError } from '../../commonTypes'

export type EmployeeProjects = {
  Projsize: number
  Projs?: EmployeeProjectDetails[]
}

export type EmployeeProjectDetails = {
  key?: number
  id?: number
  projectName?: string
  managerId?: number
  startdate?: string | Date
  enddate?: string | Date
  description: string
  status?: string
  managerName?: string
  count?: number
  billable?: false
  isAllocated?: null
  employeeId?: null | string | unknown
  health?: string
  client?: string
  type?: string
  clientId: number
  projectStartdate: null | string | Date | unknown
  projectEndDate: null | string | Date | unknown
  requiredResources: null | unknown
  newClient: null | unknown
  requestedBy: null | unknown
  statuEditFlag: null | unknown
  technology: null | unknown
  address: null | unknown
  personName: null | unknown
  email: null | unknown
  country: null | unknown
  organization: null | unknown
  intrnalOrNot: null | unknown
  hiveProjectName: null | unknown
  cc: null | unknown
  bcc: null | unknown
  deliveryManager: string
  projectRequestId: null | unknown
  model: null | unknown
  checkListExist: null | unknown
  projectCode: string
  projectContactPerson: null | unknown
  projectContactEmail: null | unknown
  billingContactPerson: null | unknown
  billingContactPersonEmail: null | unknown
  projectRequestMilestoneDTO: null | unknown
  platform: null | unknown
  domain: null | unknown
  clientName: null | unknown
  hiveProjectFlag: null | unknown
  allocation: null | unknown
}

export type EmployeeProjectDetailInterface = {
  projectId: number
}

export type EmployeeProjectDetailsTableInterface = {
  id: number
  project: EmployeeProjectDetails
}

export type EmployeeProjectsSliceState = {
  projectDetails: ProjectDetails[]
  employeeProjects: EmployeeProjects
  projects: EmployeeProjects
  isLoading: LoadingState
  error: ValidationError
}

export type EmployeeProjectsGetParams = {
  employeeid: string | number
  endIndex: number
  firstIndex: number
  projectStatus: string
  type: string
}

export type ProjectDetails = {
  employeeId: number
  empFirstName: string
  empLastName: string
  projectName: string
  projectId: number
  startDate: string
  endDate: string
  billable: boolean
  comments: string
  department: string
  desigination: string
  userName: string
  isAllocated: true
  duration: null
  count: null
  rate: null
  role: null
  amount: null
  empName: null
  status: null
  monthWorkingDays: null
  holidays: null
  leaves: null
  totalDays: null
  hours: null
  totalValue: null
  allocation: number
}
