import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import FamilyDetailsTable from './FamilyDetailsTable'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import personalInfoTabSlice from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import stateStore from '../../../stateStore'

const history = createMemoryHistory()

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => (
  <Router history={history}>
    <Provider store={reduxStore}>{children}</Provider>
  </Router>
)

const mockUseDispatchValue = 1984
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))

describe('FamilyDetails Table Testing', () => {
  test('should render', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <FamilyDetailsTable editButtonHandler={jest.fn()} />
      </ReduxProvider>,
    )
    expect(screen.getByText('Relationship')).toBeInTheDocument()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })
  // test('should render no data to display if FamilyDetailsTable is empty', async () => {
  //   render(
  //     <ReduxProvider reduxStore={stateStore}>
  //       <FamilyDetailsTable editButtonHandler={jest.fn()} />
  //     </ReduxProvider>,
  //   )
  //   await waitFor(() => {
  //     expect(screen.getByText('No Records found')).toBeInTheDocument()
  //   })
  // })
})
