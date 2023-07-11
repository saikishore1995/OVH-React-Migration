import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import { ChildFeaturesArrayProps } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRoleSubFeaturesTable from './UserRoleSubFeaturesTable'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const mockChildFeaturesArray: ChildFeaturesArrayProps = {
  childFeatures: [
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 301,
      name: 'Category',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 308,
      name: 'Credit Card List',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 306,
      name: 'DepartmentWiseList',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: false,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 303,
      name: 'Expense Form',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
    {
      childFeatures: null,
      createaccess: false,
      createaccessChecked: false,
      deleteaccess: false,
      deleteaccessChecked: false,
      featureId: 309,
      name: 'Payment List',
      updateaccess: false,
      updateaccessChecked: false,
      viewaccess: true,
      viewaccessChecked: true,
    },
  ],
  index: 23,
  subFeatureItemIndex: 0,
}
const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('User Role SubFeatures Table Component Testing', () => {
  test('should render user role sub features table component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRoleSubFeaturesTable
          childFeaturesArray={mockChildFeaturesArray}
          checkBoxHandleChange={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockChildFeaturesArray.childFeatures.forEach((childFeature) => {
      const formCheck = screen.getAllByTestId('form-checkbox')
      expect(screen.getByText(childFeature.name)).toBeInTheDocument()
      expect(formCheck).toHaveLength(
        mockChildFeaturesArray.childFeatures.length,
      )
    })
    expect(screen.getAllByRole('columnheader')).toHaveLength(2)
    // 6 including the heading row
    expect(screen.getAllByRole('row')).toHaveLength(
      mockChildFeaturesArray.childFeatures.length + 1,
    )
  })
  it('should check and uncheck upon clicking the check-box', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRoleSubFeaturesTable
          childFeaturesArray={mockChildFeaturesArray}
          checkBoxHandleChange={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockChildFeaturesArray.childFeatures.forEach(async () => {
      await waitFor(() => {
        const checkbox = screen.getByTestId('form-checkbox')
        userEvent.click(checkbox)
        expect(screen.getByTestId('form-checkbox')).toBeChecked()
        userEvent.click(checkbox)
        expect(screen.getByTestId('form-checkbox')).not.toBeChecked()
      })
    })
  })
})
