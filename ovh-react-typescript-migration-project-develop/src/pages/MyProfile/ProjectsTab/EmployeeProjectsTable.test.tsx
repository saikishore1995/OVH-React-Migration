import '@testing-library/jest-dom'
import React from 'react'

import { render, screen } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import stateStore from '../../../stateStore'
import EmployeeProjectsTable from './EmployeeProjectsTable'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const mockUseDispatchValue = 1983
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))

describe('Employee Projects Table Testing', () => {
  beforeEach(() => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsTable />
      </ReduxProvider>,
    )
  })
  it('should render the "Projects Table"', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  it('should show the loader when employeeProjects are empty', () => {
    expect(screen.getByTestId('employee-loader')).toBeTruthy()
  })
  it('should show the correct headers', () => {
    expect(
      screen.getByRole('columnheader', { name: 'Project Name' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Client' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Project Manager' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Start Date' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'End Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
  })
})
