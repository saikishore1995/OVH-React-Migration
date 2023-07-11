import * as reactRedux from 'react-redux'

import { EnhancedStore, Store } from '@reduxjs/toolkit'
import { Provider, useSelector } from 'react-redux'
import { render, screen } from '@testing-library/react'

import AppSidebar from './AppSidebar'
import { BrowserRouter } from 'react-router-dom'
import React from 'react'
import configureStore from 'redux-mock-store' //ES6 modules
import { getSidebarMenu } from '../../middleware/api/SidebarMenu/sidebarMenuApi'
import menuItems from '../../middleware/MenuLinks'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { sideMenuApiConfig } from '../../middleware/api/apiList'
import stateStore from '../../stateStore'

const middlewares = []
const mockStore = configureStore(middlewares)

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>
const mockUseLocationValue = {
  pathname: '/dashboard',
}
const mockUseSelectorValue = true
const mockUseDispatchValue: string | number = 1998

const url = sideMenuApiConfig.getMenuData
const server = setupServer(
  rest.get(url, (req, res, ctx) => res(ctx.status(200), ctx.json(menuItems))),
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
const sidebarMenuSlice = () => stateStore.getState().sidebarMenu.menuItems

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as {}),
  useLocation: jest.fn().mockImplementation(() => {
    return mockUseLocationValue
  }),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementation(() => {
    return mockUseSelectorValue
  }),
}))
// You would import the action from your codebase in a real scenario
const sidebarMenu = () => ({ type: 'sidebarMenuSlice' })
const sidebarUnfoldable = () => ({ type: 'appSlice' })
describe('Sidebar Testing', () => {
  it('should dispatch action', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    // Dispatch the action
    store.dispatch(sidebarMenu())

    // Test if your store dispatched the expected actions
    const actions = store.getActions()
    const expectedPayload = { type: 'sidebarMenuSlice' }
    expect(actions).toEqual([expectedPayload])
  })
  it('Initialize mockstore with empty state', () => {
    // Initialize mockstore with empty state
    const initialState = {}
    const store = mockStore(initialState)

    store.dispatch(sidebarUnfoldable())
    // Test if your store dispatched the expected actions
    const actions = store.getActions()

    const expectedPayloadappSlice = { type: 'appSlice' }
    expect(actions).toEqual([expectedPayloadappSlice])
  })
  test('should render Sidebar menu without crashing', () => {
    //   mockUseLocationValue.pathname = '/dashboard'
    // useSelectorMock.mockReturnValue({ mockUseSelectorValue })
    render(
      <ReduxProvider reduxStore={stateStore}>
        <BrowserRouter>
          <AppSidebar />
        </BrowserRouter>
      </ReduxProvider>,
    )
    screen.debug()
    expect(screen.getByTitle('OVH Logo')).toBeInTheDocument()
  })

  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(getSidebarMenu(mockUseDispatchValue))
    expect(sidebarMenuSlice()).toHaveLength(18)
  })
})
