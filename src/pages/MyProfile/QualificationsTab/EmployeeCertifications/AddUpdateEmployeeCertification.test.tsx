import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import AddUpdateEmployeeCertification from './AddUpdateEmployeeCertification'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

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

describe('Add Certification Testing', () => {
  test('should render Add Certification Component without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          headerTitle={''}
          confirmButtonText={''}
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    await stateStore.dispatch(
      reduxServices.employeeCertifications.getEmployeeCertificates(),
    )
  })
  test('should render Add button as disabled and Clear Button not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          headerTitle="Add Certification"
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })
  test('should render Update button as not disabled initially', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
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
  it('should display the correct number of options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          headerTitle="Add Certification"
          confirmButtonText="Add"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(screen.getAllByRole('option').length).toBe(2)
  })
  it('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddUpdateEmployeeCertification
          confirmButtonText="Add"
          headerTitle="Add Certification"
          backButtonHandler={function (): void {
            throw new Error('Function not implemented.')
          }}
        />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Technology' }).selected,
    ).toBe(true)
  })
})
