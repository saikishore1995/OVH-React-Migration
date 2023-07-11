import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import ShiftConfiguration from './ShiftConfiguration'
import { mockEmployeeShifts } from '../../../../../test/data/employeeShiftsData'
import stateStore from '../../../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Shift Configuration Component Testing', () => {
  test('should render shift configuration component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftConfiguration />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('Shift Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
  test('should create employee shift upon add button click', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftConfiguration />
      </ReduxProvider>,
    )
    userEvent.type(screen.getByPlaceholderText('Shift Name'), 'Canada Shift')
    userEvent.type(screen.getByTestId('sh-startTimeHour'), '45')
    userEvent.type(screen.getByTestId('sh-startTimeMinutes'), '45')
    userEvent.type(screen.getByTestId('sh-endTimeHour'), '2')
    userEvent.type(screen.getByTestId('sh-endTimeMinutes'), '99')
    userEvent.type(screen.getByPlaceholderText('In Minutes'), '30')
    userEvent.click(screen.getByText('Add'))
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(
        mockEmployeeShifts.length + 1,
      )
    })
  })
})
