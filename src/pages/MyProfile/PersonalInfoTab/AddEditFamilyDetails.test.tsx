import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import AddEditFamilyDetails from './AddEditFamilyDetails'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../stateStore'
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
describe('Add New Family member Testing', () => {
  test('should render add Family Member button as disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditFamilyDetails
          confirmButtonText="Add"
          headerTitle={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
  })
  test('should render Update Family Member button as not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditFamilyDetails
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
  test('should render 2 input components', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditFamilyDetails
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Contact Number')).toBeInTheDocument()
  })
  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddEditFamilyDetails
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(11)
  })
})
