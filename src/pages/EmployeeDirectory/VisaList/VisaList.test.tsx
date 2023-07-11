import '@testing-library/jest-dom'

import { render, screen } from '../../../test/testUtils'

import React from 'react'
import VisaList from './VisaList'

describe('Certificates List Component Testing', () => {
  test('should render certificates list component with out crashing', async () => {
    render(<VisaList />)
    expect(screen.getByText('Visa Details')).toBeInTheDocument()
  })
})
