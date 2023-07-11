import '@testing-library/jest-dom'

import * as reactRedux from 'react-redux'

import { render, screen } from '@testing-library/react'

import EmployeeGeneralInformation from './GeneralInformation'
import { EnhancedStore } from '@reduxjs/toolkit'
import GeneralTab from './GeneralTab'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { employeeGeneralInformationApiConfig } from '../../../middleware/api/apiList'
import { getEmployeeGeneralInformationThunk } from '../../../reducers/MyProfile/GeneralTab/generalInformationSlice'
import { mockGeneralInformationData } from '../../../test/data/generalInformationData'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
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

const mockUseDispatchValue = '1984'
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseDispatchValue
  }),
}))
const url = employeeGeneralInformationApiConfig.getLoggedInEmployeeData
const server = setupServer(
  rest.get(url, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockGeneralInformationData)),
  ),
  rest.get('*', (req, res, ctx) => {
    console.error(
      `Please add request handler for ${req.url.toString()} in your MSW server requests.`,
    )
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' }),
    )
  }),
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
const employeeId = '1997'
const employeeGeneralInformationSlice = () =>
  stateStore.getState().getLoggedInEmployeeData.generalInformation

describe('Employee General Information Testing', () => {
  test('should render Sidebar menu without crashing', () => {
    //   mockUseLocationValue.pathname = '/dashboard'
    // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
    render(
      <ReduxProvider reduxStore={stateStore}>
        <EmployeeGeneralInformation />
      </ReduxProvider>,
    )
    screen.debug()
    expect(screen.getByText('General Information')).toBeInTheDocument()
  })
  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      getEmployeeGeneralInformationThunk.getEmployeeGeneralInformation(
        employeeId as string,
      ),
    )
    expect(employeeGeneralInformationSlice()).toMatchObject(
      mockGeneralInformationData,
    )
  })
})
