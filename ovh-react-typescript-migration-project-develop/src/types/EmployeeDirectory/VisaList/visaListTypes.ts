import { ApiLoadingState } from '../../../middleware/api/apiList'

export type GetVisaListApiProps = {
  startIndex?: number
  endIndex?: number
  multipleSearch?: string
  countryId?: string
  visaTypeId?: string
}

export type VisaDetailsDto = {
  id: number
  empId: number
  empName: string
  visaTypeId: number
  visaType: string
  countryId: number
  countryName: string
  dateOfIssue: string
  dateOfExpire: string
  createdBy: string
  updatedBy?: string
  createdDate: string
  updatedDate?: string
  visaDetailsPath?: string
  visaDetailsData?: string
  visaThumbPicture?: string
}

export type VisaListItem = {
  id?: number | string
  empName: string
  empId: number
  visaDetailsDtos: VisaDetailsDto[]
}

export type GetVisaListResponse = {
  size: number
  list: VisaListItem[]
}

export type Country = {
  id: number
  name: string
}

export type VisaType = {
  visaTypeId: number
  visaType: string
  countryId: number
  countryName: string
}

export type VisaListSliceState = {
  visaList: VisaListItem[]
  listSize: number
  isLoading: ApiLoadingState
  countries: Country[]
  visaTypes: VisaType[]
}

export type VisaListOptionsProps = {
  selectCountry: string
  setSelectCountry: (value: string) => void
  setFilterByCountry: (value: string) => void
  setFilterByVisaType: (value: string) => void
  setMultiSearchValue: (value: string) => void
  filterByCountry: string
  filterByVisaType: string
  multiSearchValue: string
  setIsAccordionItemShow: (value: boolean) => void
}
