import '@testing-library/jest-dom'

import { render, screen } from '../../../test/testUtils'

import EmployeeList from './EmployeeList'
import React from 'react'

describe('Employee List Component Testing', () => {
  test('should render Personal info tab component with out crashing', async () => {
    render(<EmployeeList />)

    expect(screen.getByText('Employee Directory')).toBeInTheDocument()
  })
})
