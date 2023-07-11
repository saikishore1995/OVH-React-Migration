import { ApiLoadingState } from '../../../middleware/api/apiList'

export type EmployeeCertificationDetail = {
  id: number
  code: string
  name: string
  completedDate: string
  expiryDate: string | null
  skill: string | null
  percent: string | null
  description: string | null
  employeeId: number
  technology: string | null
  certificateType: string | null
}

export type EmployeeCertificate = {
  id: number | null
  empName: string
  employeeId: number
  skilldtos: null
  visaDetailsDtos: null
  certificationDtos: EmployeeCertificationDetail[]
}

export type CertificateListApiProps = {
  endIndex?: number
  multipleSearch?: string
  selectedCertificate?: string
  selectionTechnology?: string
  startIndex?: number
}

export type CertificatesListSliceState = {
  employeeCertificationList: EmployeeCertificate[]
  listSize: number
  isLoading: ApiLoadingState
}

export type EmployeeCertificateResponse = {
  list: EmployeeCertificate[]
  listsize: number
}

export type CertificateDetailsExpandableTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  isAccordionItemShow: boolean
}

export type CertificatesFilterOptionsProps = {
  selectTechnology: string
  setSelectTechnology: (value: string) => void
  setFilterByTechnology: (value: string) => void
  setFilterByCertificate: (value: string) => void
  setMultiSearchValue: (value: string) => void
  filterByTechnology: string
  filterByCertificate: string
  multiSearchValue: string
  setIsAccordionItemShow: (value: boolean) => void
}
