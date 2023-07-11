import '@testing-library/jest-dom'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRoleFeaturesExpandableTable from './UserRoleFeaturesExpandableTable'
import { render } from '@testing-library/react'
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

describe('User Role Features Expandable Table Component Testing', () => {
  test('should render user role features expandable table component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRoleFeaturesExpandableTable
          selectedRoleId={mockSelectedRole.roleId}
        />
      </ReduxProvider>,
    )
  })
})
