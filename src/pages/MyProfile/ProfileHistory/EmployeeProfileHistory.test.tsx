import { render, screen } from '@testing-library/react'

import EmployeeProfileHistory from './EmployeeProfileHistory'
import { EnhancedStore } from '@reduxjs/toolkit'
import ProfileHistoryTimeLine from './ProfileHistoryTimeLine'
import { ProfileUpdateData } from '../../../types/MyProfile/ProfileHistory/profileHistoryTypes'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { mockEmployeeProfileHistoryData } from '../../../test/data/mockEmployeeProfileHistoryData'
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

describe('Testing Profile History Tab', () => {
  test('should render Profile History without crashing', () => {
    //   mockUseLocationValue.pathname = '/dashboard'
    // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProfileHistory />
      </ReduxProvider>,
    )
    screen.debug()
    expect(screen.getByText('Employee Profile History')).toBeInTheDocument()
  })
  test('should have Time Stamp', () => {
    //   mockUseLocationValue.pathname = '/dashboard'
    // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
    render(
      <ReduxProvider reduxStore={stateStore}>
        <ProfileHistoryTimeLine
          employeeProfileHistory={mockEmployeeProfileHistoryData}
        />
      </ReduxProvider>,
    )
    screen.debug()

    mockEmployeeProfileHistoryData.forEach((childFeature) => {
      const timeStamp = screen.getAllByTestId('sh-time-stamp')
      expect(
        screen.getByText(childFeature.modifiedDate as string),
      ).toBeInTheDocument()
      expect(timeStamp).toHaveLength(mockEmployeeProfileHistoryData.length)
    })
  })
})
