import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import UserRolesAndPermissions from './UserRolesAndPermissions'
import { mockUserRoleSubFeatures } from '../../../test/data/UserRoleSubFeaturesData'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const addRole = (inputRole: string) => {
  const addButtonElement = screen.getByText('Add Role')
  userEvent.click(addButtonElement)
  const modalInputElement = screen.getByPlaceholderText('Role')
  const modalYesButtonElement = screen.getByRole('button', { name: 'Yes' })
  fireEvent.change(modalInputElement, { target: { value: inputRole } })
  userEvent.click(modalYesButtonElement)
}
describe('User Roles And Permissions Testing', () => {
  it('should render Roles and Permission page component without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    expect(screen.getByText('Roles and Permissions')).toBeInTheDocument()
    expect(screen.getByTestId('form-select')).toBeInTheDocument()
    expect(screen.getByText('Add Role')).toBeInTheDocument()
  })
  it('should render add role modal on clicking add role button', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    const addButtonElement = screen.getByText('Add Role')
    userEvent.click(addButtonElement)
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Role')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Yes' })).toBeDisabled()
      expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
    })
  })
  it('should enable "Yes" button if the input field inside modal has value', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    const buttonElement = screen.getByText('Add Role')
    userEvent.click(buttonElement)
    const modalInputElement = screen.getByPlaceholderText('Role')
    const modalYesButton = screen.getByRole('button', { name: 'Yes' })
    const modalNoButton = screen.getByRole('button', { name: 'No' })
    fireEvent.change(modalInputElement, { target: { value: 'IT Manager' } })
    expect(modalYesButton).toBeEnabled()
    expect(modalNoButton).toBeEnabled()
  })
  it('should add new role upon clicking "Yes" button if the input field inside modal has value', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    addRole('IT Manager')
    await waitFor(() => {
      expect(screen.getAllByRole('option')).toHaveLength(4)
    })
  })
  it('should enable delete role button upon role select', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    userEvent.selectOptions(screen.getByTestId('form-select'), ['1'])
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Delete Role/i })).toBeEnabled()
    })
  })
})

describe('User Role Features Expandable Table Component Testing', () => {
  it('should render user role features expandable table component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    userEvent.selectOptions(screen.getByTestId('form-select'), ['1'])
    const tableItem = await screen.findByText('Dashboard-Birthdays')
    expect(tableItem).toBeInTheDocument()
    mockUserRoleSubFeatures.forEach(async (subFeatureItem) => {
      await waitFor(async () => {
        expect(await screen.findByText(subFeatureItem.name)).toHaveTextContent(
          subFeatureItem.name,
        )
      })
    })
  })
  it('should render user role features expandable', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <UserRolesAndPermissions />
      </ReduxProvider>,
    )
    userEvent.selectOptions(screen.getByTestId('form-select'), ['1'])
    mockUserRoleSubFeatures.forEach((subFeatures) => {
      subFeatures.features.forEach(async () => {
        await waitFor(() => {
          const checkbox = screen.getByTestId('form-features-checkbox')
          userEvent.click(checkbox)
          expect(screen.getByTestId('form-features-checkbox')).toBeChecked()
          userEvent.click(checkbox)
          expect(screen.getByTestId('form-features-checkbox')).not.toBeChecked()
        })
      })
    })
  })
})
