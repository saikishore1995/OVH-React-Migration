import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import AddNewSkill from './AddNewSkill'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import { skillMockCategoryId } from '../../../test/data/skillListData'
import stateStore from '../../../stateStore'
import userEvent from '@testing-library/user-event'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const expectComponentToBeRendered = () => {
  expect(screen.getByLabelText('Skill:')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeDisabled()
}

describe('Add New Skill Testing', () => {
  test('should render add new skill form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewSkill categoryId={skillMockCategoryId} />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should enabled add skill button when input is not empty', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewSkill categoryId={skillMockCategoryId} />
      </ReduxProvider>,
    )

    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'testing')
    expect(screen.getByRole('button')).not.toBeDisabled()

    userEvent.clear(screen.getByRole('textbox'))
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should clear input and disable button after submitting and new skill should be added', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewSkill categoryId={skillMockCategoryId} />
      </ReduxProvider>,
    )

    expectComponentToBeRendered()

    userEvent.type(screen.getByRole('textbox'), 'testing')
    await waitFor(() => {
      userEvent.click(screen.getByRole('button'))

      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getByRole('button')).toBeDisabled()
      //   expect(mockSkills.length).toEqual(2)
    })
  })
})
