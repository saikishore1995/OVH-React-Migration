import '@testing-library/jest-dom'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import ShiftListTable from './ShiftListTable'
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

describe('Shift List Table Component Testing', () => {
  test('should render shift list table component', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftListTable
          employeeShifts={mockEmployeeShifts}
          actionMapping={{
            added: 'added',
            deleted: 'deleted',
            updated: 'updated',
          }}
          getToastMessage={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockEmployeeShifts.forEach((employeeShift) => {
      expect(screen.getByText(employeeShift.name)).toBeInTheDocument()
      expect(screen.getByText(employeeShift.graceTime)).toBeInTheDocument()
      expect(screen.getAllByRole('columnheader')).toHaveLength(6)
      // 6 including the heading row
      expect(screen.getAllByRole('row')).toHaveLength(
        mockEmployeeShifts.length + 1,
      )
    })
  })
  it('should render delete employee  shift modal on clicking delete button', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftListTable
          employeeShifts={mockEmployeeShifts}
          actionMapping={{
            added: 'added',
            deleted: 'deleted',
            updated: 'updated',
          }}
          getToastMessage={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockEmployeeShifts.forEach(async (_employeeShift, index) => {
      const deleteButtonElement = screen.getByTestId(`sh-delete-btn${index}`)
      userEvent.click(deleteButtonElement)
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Yes' })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: 'No' })).toBeInTheDocument()
      })
    })
  })
  test('should delete employee shift detail upon delete modal confirm button click', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftListTable
          employeeShifts={mockEmployeeShifts}
          actionMapping={{
            added: 'added',
            deleted: 'deleted',
            updated: 'updated',
          }}
          getToastMessage={jest.fn()}
        />
      </ReduxProvider>,
    )
    mockEmployeeShifts.forEach(async (_employeeShift, index) => {
      const deleteButtonElement = screen.getByTestId(`sh-delete-btn${index}`)
      userEvent.click(deleteButtonElement)
      const deleteModalConfirmButtonElement = screen.getByRole('button', {
        name: 'Yes',
      })
      userEvent.click(deleteModalConfirmButtonElement)
      await waitFor(() => {
        expect(screen.getAllByRole('row')).toHaveLength(
          mockEmployeeShifts.length - 1,
        )
      })
    })
  })
  test('should edit and save employee shift details upon edit and save button click respectively', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ShiftListTable
          employeeShifts={mockEmployeeShifts}
          actionMapping={{
            added: 'added',
            deleted: 'deleted',
            updated: 'updated',
          }}
          getToastMessage={jest.fn()}
        />
      </ReduxProvider>,
    )
    const editButtonElement = screen.getByTestId(`sh-edit-btn${1}`)
    await fireEvent.click(editButtonElement)
    userEvent.type(screen.getByTestId(`sh-startTimeHour-input${1}`), '1')
    userEvent.type(screen.getByTestId(`sh-startTimeMinutes-input${1}`), '6')
    userEvent.type(screen.getByTestId(`sh-endTimeHour-input${1}`), '18')
    userEvent.type(screen.getByTestId(`sh-endTimeMinutes-input${1}`), '78')
    userEvent.type(screen.getByTestId(`sh-graceTime-input${1}`), '15')
    const saveButtonElement = screen.getByTestId(`sh-save-btn${1}`)
    await fireEvent.click(saveButtonElement)
    await waitFor(() => {
      expect(screen.getByTestId(`sh-endTimeMinutes-input${1}`)).toHaveValue(
        '59',
      )
    })
  })
})
