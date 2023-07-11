import '@testing-library/jest-dom'
import React from 'react'

import { render, screen } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import stateStore from '../../../stateStore'
import EmployeeProjects from './EmployeeProjects'

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

describe('Employee Projects Testing', () => {
  render(
    <ReduxProvider reduxStore={stateStore}>
      <EmployeeProjects />
    </ReduxProvider>,
  )
  test('should render the "Project Report" header', () => {
    const pageTitle = screen.getByRole('heading', { name: 'Project Report' })
    expect(pageTitle).toBeTruthy()
  })
})
