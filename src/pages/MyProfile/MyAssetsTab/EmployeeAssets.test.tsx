import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'
import { mockAssetsDetails } from '../../../test/data/employeeAssetsData'
import EmployeeMyAssets from './EmployeeAssets'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockAssetsDetails[i].employeeName),
    ).toBeInTheDocument()
  }
}
describe('Assets List Table Testing', () => {
  test('should render No data to display if Assets is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeMyAssets />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records Found...')).toBeInTheDocument()
    })
  })

  test('should render correct number of page records', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeMyAssets />
      </ReduxProvider>,
    )

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(1)
    })
  })
})
