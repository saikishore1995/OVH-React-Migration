import '@testing-library/jest-dom'

import { render, screen, waitFor } from '../../../test/testUtils'

import { Employee } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import EmployeeListTable from './EmployeeListTable'
import React from 'react'
import { mockEmployeeList } from '../../../test/data/employeeListData'
import userEvent from '@testing-library/user-event'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockEmployeeList[i].fullName)).toBeInTheDocument()
  }
}

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee List Table Component Testing', () => {
  test('should render Personal info tab component with out crashing', async () => {
    render(
      <EmployeeListTable
        setCurrentPage={mockSetCurrentPage}
        setPageSize={mockSetPageSize}
        currentPage={1}
        pageSize={20}
        paginationRange={[1, 2, 3]}
      />,
      {
        preloadedState: {
          employeeList: {
            employees: mockEmployeeList as Employee[],
            listSize: 183,
          },
        },
      },
    )

    expectPageSizeToBeRendered(20)

    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])

      //   const pageSizeSelect = screen.getByRole('option', {
      //     name: '40',
      //   }) as HTMLOptionElement
      //   expect(pageSizeSelect.selected).toBe(true)

      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })
})
