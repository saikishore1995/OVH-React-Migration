import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AddEditEmployeeSkill from './AddEditEmployeeSkill'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../../stateStore'
const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const mockUseDispatchValue = 1984
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))
describe('Add New Skill Testing', () => {
  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditEmployeeSkill
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(32)
  })
  test('should render Clear Skill button as not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditEmployeeSkill
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should render Update Skill button as not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditEmployeeSkill
          confirmButtonText="Update"
          headerTitle={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
  })
})
