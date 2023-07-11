import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { UserRole } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import UserRolesList from './UserRolesList'
import { mockUserRoles } from '../../../test/data/userRolesData'
import { reduxServices } from '../../../reducers/reduxServices'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'
import { userRolesConfigurationApiConfig } from '../../../middleware/api/apiList'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const mockSelectedRole = {
  roleId: 1,
  name: 'admin',
  features: null,
}
const url = userRolesConfigurationApiConfig.getUserRoles
const server = setupServer(
  rest.get(url, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockUserRoles)),
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(
      `Please add request handler for ${req.url.toString()} in your MSW server requests.`,
    )
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' }),
    )
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

const userRolesAndPermissionsSlice = () =>
  stateStore.getState().userRolesAndPermissions.roles

const selectOption = (role: UserRole) => {
  const selectElement = screen.getByTestId('form-select')
  const optionElement = screen.queryAllByText('option')
  userEvent.selectOptions(selectElement, optionElement)
}

describe('User Roles List Testing', () => {
  test('should render select element', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesList
          selectedRole={mockSelectedRole}
          setSelectedRole={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Role:')).toBeInTheDocument()
    expect(screen.getByTestId('form-select')).toBeInTheDocument()
  })
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      reduxServices.userRolesAndPermissions.getUserRoles(),
    )
    expect(userRolesAndPermissionsSlice()).toHaveLength(3)
  })
  it('should show selected value in the select element', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesList
          selectedRole={mockSelectedRole}
          setSelectedRole={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockUserRoles.forEach((mockRole) => {
      selectOption(mockRole)
      expect(screen.getByRole('option', { name: mockRole.name })).toBeVisible()
      expect(
        screen.getByRole('option', { name: mockRole.name }),
      ).toHaveTextContent(mockRole.name)
    })
  })
})
