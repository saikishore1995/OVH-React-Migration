import { ApiLoadingState } from '../middleware/api/apiList'

export type ValidationError = number | null

export type LoadingState = ApiLoadingState

export type TextEditorProps = {
  value: string
  setFieldValue: (val: string) => void
}
