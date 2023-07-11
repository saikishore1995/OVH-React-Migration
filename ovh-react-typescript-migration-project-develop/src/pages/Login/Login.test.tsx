import '@testing-library/jest-dom'

import { correctPassword, username, wrongPassword } from '../../test/constants'
import { render, screen, waitFor } from '@testing-library/react'

import { EnhancedStore } from '@reduxjs/toolkit'
import Login from './Login'
import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import stateStore from '../../stateStore'
import userEvent from '@testing-library/user-event'

const tenantKeys = {
  rbt: 'Raybiztech',
  aiml: 'AIBridgeML',
}

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const inputCredentials = (usernameToSet: string, passwordToSet: string) => {
  userEvent.type(screen.getByPlaceholderText('Username'), usernameToSet)
  userEvent.type(screen.getByPlaceholderText('Password'), passwordToSet)
}

const expectLoginToBeRendered = () => {
  // check if heading is rendered
  expect(screen.getByRole('heading')).toHaveTextContent('Login')

  // check if username and password input is rendered
  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()

  // check if login button is rendered and disabled initially
  expect(screen.getByRole('button')).toBeDisabled()
}

describe('Login Component Testing without history', () => {
  test('should render login form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <Login />
      </ReduxProvider>,
    )

    // a function that checks if heading, 2 input fields, and a button is rendered
    expectLoginToBeRendered()

    const aimlRadio = screen.getByRole('radio', {
      name: tenantKeys.aiml,
    }) as HTMLInputElement
    const rbtRadio = screen.getByRole('radio', {
      name: tenantKeys.rbt,
    }) as HTMLInputElement

    userEvent.click(aimlRadio)

    // check if radios are checked correctly
    expect(aimlRadio.checked).toEqual(true)
    expect(rbtRadio.checked).toEqual(false)

    // check if logo is switched to aiml
    expect(
      screen.getByAltText(tenantKeys.aiml.toUpperCase()),
    ).toBeInTheDocument()

    userEvent.click(rbtRadio)

    // check if radios are checked correctly
    expect(rbtRadio.checked).toEqual(true)
    expect(aimlRadio.checked).toEqual(false)

    // check if logo is switched to aiml
    expect(
      screen.getByAltText(tenantKeys.rbt.toUpperCase()),
    ).toBeInTheDocument()

    inputCredentials(username, correctPassword)

    // check if button is not disabled anymore
    expect(screen.getByRole('button')).not.toBeDisabled()

    // clearing one input
    userEvent.clear(screen.getByPlaceholderText('Username'))

    // check if button gets disabled again
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should redirect to / when login successful', async () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <Login />
        </ReduxProvider>
      </Router>,
    )

    // a function that checks if heading, 2 input fields, and a button is rendered
    expectLoginToBeRendered()

    inputCredentials(username, correctPassword)
    userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      // check if a redirect happens meaning login was successful
      expect(history.location.pathname).toBe('/')
    })
  })

  test('should render error message when wrong credentials given', async () => {
    const history = createMemoryHistory()

    render(
      <Router history={history}>
        <ReduxProvider reduxStore={stateStore}>
          <Login />
        </ReduxProvider>
      </Router>,
    )

    // a function that checks if heading, 2 input fields, and a button is rendered
    expectLoginToBeRendered()

    inputCredentials(username, wrongPassword)
    userEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      // check if error message is rendered
      expect(
        screen.getByText('Incorrect username or password'),
      ).toBeInTheDocument()

      // check if password was cleared
      expect(screen.getByPlaceholderText('Password')).toHaveValue('')
    })
  })
})
