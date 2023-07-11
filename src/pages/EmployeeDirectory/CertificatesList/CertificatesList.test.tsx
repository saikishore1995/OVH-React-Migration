import '@testing-library/jest-dom'

import { render, screen } from '../../../test/testUtils'

import CertificatesList from './CertificatesList'
import React from 'react'

describe('Certificates List Component Testing', () => {
  test('should render certificates list component with out crashing', async () => {
    render(<CertificatesList />)
    expect(screen.getByText('Certificate Details')).toBeInTheDocument()
  })
})
