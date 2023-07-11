import { ValidationError, LoadingState } from '../../../commonTypes'

export type QualificationCategory = {
  id?: number
  qualificationCategory: string
  qualificationName: string
}

export type QualificationCategorySliceState = {
  qualificationCategories: QualificationCategory[]
  isLoading: LoadingState
  error: ValidationError
}
