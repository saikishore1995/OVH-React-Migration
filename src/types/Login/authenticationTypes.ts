import { LoadingState, ValidationError } from '../commonTypes'

export type AuthenticatedUser = {
  employeeName: string
  employeeId: string | number
  userName: string
  role: string
  tenantKey: string
  token: string
  designation: string
}

export type LoginCredentials = {
  username: string
  password: string
  tenantKey: string
}

export type AuthenticationState = {
  authenticatedUser: AuthenticatedUser
  error: ValidationError
  isLoading: LoadingState
}
