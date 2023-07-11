import '@testing-library/jest-dom'
import React from 'react'

import { render, screen } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import stateStore from '../../../stateStore'
import EmployeeProjectsEntry from './EmployeeProjectsEntry'
import { mockEmployeeProjectEntry } from '../../../test/data/employeeProjectsData'

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
  beforeEach(() => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsEntry id={1} project={mockEmployeeProjectEntry} />
      </ReduxProvider>,
    )
  })
  it('should show the correct project name', () => {
    const projectName = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.projectName,
    })
    expect(projectName).toBeTruthy()
  })
  it('should show the correct project client name', () => {
    const projectClient = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.client,
    })
    expect(projectClient).toBeTruthy()
  })
  it('should show the correct project manager', () => {
    const projectManagerName = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.managerName,
    })
    expect(projectManagerName).toBeTruthy()
  })
  it('should show the correct project start date', () => {
    const projectStartDate = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.startdate as string,
    })
    expect(projectStartDate).toBeTruthy()
  })
  it('should show the correct project end date', () => {
    const projectEndDate = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.enddate as string,
    })
    expect(projectEndDate).toBeTruthy()
  })
  it('should show the correct project status', () => {
    const projectStatus = screen.getByRole('cell', {
      name: mockEmployeeProjectEntry.status,
    })
    expect(projectStatus).toBeTruthy()
  })
})
describe('Project Entry Health Class Testing', () => {
  it('should have the correct health class - green', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsEntry id={1} project={mockEmployeeProjectEntry} />
      </ReduxProvider>,
    )
    const projectStatus = screen.queryByTestId('project-health')
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-success',
    )
  })
  it('should have the correct health class - orange', () => {
    const projectHealthOrange = mockEmployeeProjectEntry
    projectHealthOrange.health = 'Orange'
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsEntry id={1} project={projectHealthOrange} />
      </ReduxProvider>,
    )
    const projectStatus = screen.queryByTestId('project-health')
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-warning',
    )
  })
  it('should have the correct health class - red', () => {
    const projectHealthOrange = mockEmployeeProjectEntry
    projectHealthOrange.health = 'Red'
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsEntry id={1} project={projectHealthOrange} />
      </ReduxProvider>,
    )
    const projectStatus = screen.queryByTestId('project-health')
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-failed',
    )
  })
  it('should have the correct health class - gray', () => {
    const projectHealthOrange = mockEmployeeProjectEntry
    projectHealthOrange.health = 'Gray'
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsEntry id={1} project={projectHealthOrange} />
      </ReduxProvider>,
    )
    const projectStatus = screen.queryByTestId('project-health')
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-null',
    )
  })
  it('should have the correct health class - null', () => {
    const projectHealthOrange = mockEmployeeProjectEntry
    projectHealthOrange.health = 'null'
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeProjectsEntry id={1} project={projectHealthOrange} />
      </ReduxProvider>,
    )
    const projectStatus = screen.queryByTestId('project-health')
    expect(projectStatus).toHaveClass(
      'profile-tab-label profile-tab-label-null',
    )
  })
})
