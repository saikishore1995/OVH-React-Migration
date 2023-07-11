import '@testing-library/jest-dom'

import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react'
import {
  mockDepartments,
  mockDesignationList,
} from '../../../../../test/data/employeeDesignationListData'

import AddEmployeeDesignation from './AddEmployeeDesignation'
import { EmployeeDepartments } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import stateStore from '../../../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.getByText('Department:')).toBeInTheDocument()
  expect(screen.getByText('Designation:')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeDisabled()
}

describe('Add New Designation Testing', () => {
  test('should render add new Designation form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEmployeeDesignation
          selectedDepartmentId={0}
          setSelectedDepartmentId={function (_value: number): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEmployeeDesignation
          selectedDepartmentId={0}
          setSelectedDepartmentId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Department' }).selected,
    ).toBe(true)
  })

  test('should be in disabled mode when any of the mandatory field is not entered', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEmployeeDesignation
          selectedDepartmentId={0}
          setSelectedDepartmentId={jest.fn()}
        />
      </ReduxProvider>,
    )
    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  test('should clear input and disable button after submitting and new designation should be added', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEmployeeDesignation
          selectedDepartmentId={0}
          setSelectedDepartmentId={jest.fn()}
        />
      </ReduxProvider>,
    )

    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'testing')
    userEvent.click(screen.getByRole('button'))
    await waitFor(() => {
      userEvent.clear(screen.getByRole('textbox'))
      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })
})
