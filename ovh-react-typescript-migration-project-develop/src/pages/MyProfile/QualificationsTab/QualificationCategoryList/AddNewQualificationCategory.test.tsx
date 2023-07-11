import '@testing-library/jest-dom'

import { getByLabelText, render, screen, waitFor } from '@testing-library/react'

import AddNewQualificationCategory from './AddNewQualificationCategory'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.getByText('Category:')).toBeInTheDocument()
  expect(screen.getByText('Name:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
}

describe('Add New Qualification Category Testing', () => {
  test('should render add new qualification category form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should find add and clear buttons in the form', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should enabled add  button when input is not empty', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    userEvent.selectOptions(screen.getByTestId('form-select'), [
      'Post Graduation',
    ])
    await waitFor(() => {
      userEvent.type(screen.getByRole('textbox'), 'testing')
      expect(screen.getByRole('button', { name: /Add/i })).toBeEnabled()
    })
  })

  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Category' }).selected,
    ).toBe(true)
  })

  test('should display the correct number of options, including default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    //including heading
    expect(screen.getAllByRole('option').length).toBe(3)
  })

  it('should allow user to change Options', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )
    userEvent.selectOptions(
      // Find the select element.
      screen.getByRole('combobox'),
      // Find and select the Post Graduation option.
      screen.getByRole('option', { name: 'Post Graduation' }),
    )
    expect(
      screen.getByRole('option', { name: 'Post Graduation' }).selected,
    ).toBe(true)
  })
  test('should clear input and disable Add button after submitting and new qualification should be added', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewQualificationCategory />
      </ReduxProvider>,
    )

    expectComponentToBeRendered()
    userEvent.selectOptions(screen.getByTestId('form-select'), [
      'Post Graduation',
    ])
    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: 'Add' }))
      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    })
  })
})
