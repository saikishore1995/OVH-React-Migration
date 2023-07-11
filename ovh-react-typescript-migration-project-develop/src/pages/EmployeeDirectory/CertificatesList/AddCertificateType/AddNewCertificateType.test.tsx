import '@testing-library/jest-dom'

import { render, screen, waitFor } from '@testing-library/react'

import AddNewCertificateType from './AddNewCertificateType'
import { EnhancedStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import stateStore from '../../../../stateStore'
import userEvent from '@testing-library/user-event'
import {
  mockAllTechnology,
  mockCertificateType,
} from '../../../../test/data/certificateTypeData'
import { employeeCertificationsApiConfig } from '../../../../middleware/api/apiList'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Technology } from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { reduxServices } from '../../../../reducers/reduxServices'

const ReduxProvider = ({
  children,
  reduxStore,
}: {
  children: JSX.Element
  reduxStore: EnhancedStore
}) => <Provider store={reduxStore}>{children}</Provider>

const mockTechnology = {
  id: 1,
  name: 'Java',
}

const url = employeeCertificationsApiConfig.getTechnologies
const server = setupServer(
  rest.get(url, (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockTechnology)),
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

const certificateTypeSlice = () =>
  stateStore.getState().employeeCertificates.getAllTechnologies

const selectOption = (technologyName: Technology) => {
  const selectElement = screen.getByTestId('form-select')
  const optionElement = screen.queryAllByText('option')
  userEvent.selectOptions(selectElement, optionElement)
}

const expectComponentToBeRendered = () => {
  expect(screen.getByText('Technology:')).toBeInTheDocument()
  expect(screen.getByText('Certificate:')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
  expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
}

describe('Add New CertificateType Testing', () => {
  test('should render add new CertificateType form without crashing', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={0}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expectComponentToBeRendered()
  })

  test('should find add and clear buttons in the form', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={0}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  test('should render select element', async () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={mockTechnology.id}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(screen.getByText('Technology:')).toBeInTheDocument()
    expect(screen.getByTestId('form-select')).toBeInTheDocument()
  })

  test('should correctly set default option', () => {
    render(
      <ReduxProvider reduxStore={stateStore}>
        <AddNewCertificateType
          selectedTechnologyId={0}
          setSelectedTechnologyId={jest.fn()}
        />
      </ReduxProvider>,
    )
    expect(
      screen.getByRole('option', { name: 'Select Technology' }).selected,
    ).toBe(true)
  })

  it('should be fetched from the server and put in the store', async () => {
    await stateStore.dispatch(
      reduxServices.employeeCertifications.getTechnologies(),
    )
    expect(mockTechnology.name).toHaveLength(4)
  })
})
