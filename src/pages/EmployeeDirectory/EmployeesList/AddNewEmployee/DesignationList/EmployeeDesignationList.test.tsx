import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import EmployeeDesignationList from './EmployeeDesignationList'
import EmployeeDesignationListTable from './EmployeeDesignationListTable'
import { EmployeeDesignations } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import employeeDesignationListSlice from '../../../../../reducers/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListSlice'
import { mockDesignationList } from '../../../../../test/data/employeeDesignationListData'
import { reduxServices } from '../../../../../reducers/reduxServices'
import stateStore from '../../../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getAllByText(mockDesignationList[i].name)).toBeInTheDocument()
  }
}

describe('DesignationList Table Testing', () => {
  test('should render Designation List without crashing', () => {
    //   mockUseLocationValue.pathname = '/dashboard'
    // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeDesignationList />
      </ReduxProvider>,
    )
    expect(screen.getByText('Designation List')).toBeInTheDocument()
  })
  test('should render No Records Found if designations is empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeDesignationListTable selectedDepartmentId={4} />
      </ReduxProvider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No Records Found')).toBeInTheDocument()
    })
  })
})
