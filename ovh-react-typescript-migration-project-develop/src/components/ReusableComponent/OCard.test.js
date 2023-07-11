/* eslint-disable prettier/prettier */
import { render, screen } from '@testing-library/react'
import OCard from './OCard'
import React from 'react'
test('load OCard component without crashing', () => {
  render(<OCard />)
  screen.debug()
})
