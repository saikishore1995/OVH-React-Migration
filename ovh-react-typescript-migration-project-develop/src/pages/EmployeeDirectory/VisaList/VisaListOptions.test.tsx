import '@testing-library/jest-dom'

import { mockCountries, mockVisaTypes } from '../../../test/data/visaListData'
import { render, screen, waitFor } from '../../../test/testUtils'

import React from 'react'
import VisaListOptions from './VisaListOptions'
import userEvent from '@testing-library/user-event'

const mockSetSelectCountry = jest.fn()
const mockSetFilterByCountry = jest.fn()
const mockSetFilterByVisaType = jest.fn()
const mockSetMultiSearchValue = jest.fn()
const mockSetIsAccordionItemShow = jest.fn()

describe('Visa List Options Component Testing', () => {
  test('should render Visa List Options component with out crashing', async () => {
    render(
      <VisaListOptions
        selectCountry={'1'}
        setSelectCountry={mockSetSelectCountry}
        filterByCountry={''}
        setFilterByCountry={mockSetFilterByCountry}
        filterByVisaType={''}
        setFilterByVisaType={mockSetFilterByVisaType}
        multiSearchValue={''}
        setMultiSearchValue={mockSetMultiSearchValue}
        setIsAccordionItemShow={mockSetIsAccordionItemShow}
      />,
      {
        preloadedState: {
          visaList: {
            countries: mockCountries,
            visaTypes: mockVisaTypes,
          },
        },
      },
    )

    expect(screen.getByText('Country:')).toBeInTheDocument()

    const countryCombobox = screen.getByTestId('form-select1')
    userEvent.selectOptions(countryCombobox, ['1'])
    expect(mockSetSelectCountry).toBeCalledWith('1')

    const visaTypeCombobox = screen.getByTestId('form-select2')
    userEvent.selectOptions(visaTypeCombobox, ['6'])

    const viewButton = screen.getByTestId('form-button1')

    expect(viewButton).not.toBeDisabled()

    userEvent.click(viewButton)

    await waitFor(() => {
      // expect(mockSetFilterByCountry).toBeCalledWith('1')
      expect(mockSetFilterByVisaType).toBeCalledWith('6')
      expect(mockSetIsAccordionItemShow).toBeCalledWith(true)
    })
  })
})
