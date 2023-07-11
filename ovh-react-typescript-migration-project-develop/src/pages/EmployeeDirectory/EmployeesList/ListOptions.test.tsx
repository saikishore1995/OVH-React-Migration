import '@testing-library/jest-dom'

import { render, screen } from '../../../test/testUtils'

import { EmploymentStatus } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import { EnhancedStore } from '@reduxjs/toolkit'
import ListOptions from './ListOptions'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('List Options Component Testing', () => {
  test('should render Personal info tab component with out crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ListOptions />
      </ReduxProvider>,
    )

    const activeRadio = screen.getByRole('radio', {
      name: EmploymentStatus.active,
    }) as HTMLInputElement

    expect(activeRadio.checked).toEqual(true)

    const inactiveRadio = screen.getByRole('radio', {
      name: 'Inactive',
    }) as HTMLInputElement

    userEvent.click(inactiveRadio)

    expect(activeRadio.checked).toEqual(false)
    expect(inactiveRadio.checked).toEqual(true)
  })
})
