import { render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import SessionTimeout from './SessionTimeout'
import { createMemoryHistory } from 'history'
import stateStore from '../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

describe('Session Timeout Page Testing', () => {
  test('should load IdleModal without crashing', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <SessionTimeout />
      </ReduxProvider>,
    )

    expect(screen.getByText(/Your session has timed out/)).toBeInTheDocument()
  })

  test('should redirect to login after button click', async () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <SessionTimeout />
        </ReduxProvider>
      </Router>,
    )

    userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login')
    })
  })
})
