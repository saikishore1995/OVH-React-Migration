import { ValidationError, LoadingState } from '../../../commonTypes'

export type CertificateType = {
  name?: string
  certificateType: string
  id?: number
  technologyId: number
  technologyName?: string
}

export type AddCertificateTypeProps = {
  selectedTechnologyId: number
  setSelectedTechnologyId: (value: number) => void
}

export type CertificateTypeSliceState = {
  certificateTypes: CertificateType[]
  editCertificateType: CertificateType
  isLoading: LoadingState
  error: ValidationError
}
