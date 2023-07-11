import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import AddDeleteRoleButtons from './AddDeleteRoleButtons'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'

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
describe('Add Delete Role Buttons Component Testing', () => {
  test('should render add delete role buttons component without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddDeleteRoleButtons
          selectedRole={mockSelectedRole}
          setSelectedRole={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Add Role')).toBeInTheDocument()
    expect(screen.getByText('Delete Role')).toBeInTheDocument()
  })

  it('should render delete role button as enabled', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddDeleteRoleButtons
          selectedRole={mockSelectedRole}
          setSelectedRole={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Delete Role' })).toBeEnabled()
  })
})
