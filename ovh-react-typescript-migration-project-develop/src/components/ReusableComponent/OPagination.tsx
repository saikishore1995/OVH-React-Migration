import { CPagination, CPaginationItem } from '@coreui/react-pro'
import React, { useMemo } from 'react'

const OPagination = ({
  currentPage,
  pageSetter,
  paginationRange,
}: {
  currentPage: number
  pageSetter: React.Dispatch<React.SetStateAction<number>>
  paginationRange: number[]
}): JSX.Element => {
  const handleNextPage = () => {
    pageSetter(currentPage + 1)
  }

  const handlePreviousPage = () => {
    pageSetter(currentPage - 1)
  }

  const handleFirstPage = () => {
    pageSetter(1)
  }

  const handleLastPage = () => {
    pageSetter(paginationRange[paginationRange.length - 1])
  }

  const handleSelectPage = (pageNumber: number) => {
    pageSetter(pageNumber)
  }

  const paginationItems = useMemo(() => {
    if (paginationRange.length < 6) {
      return paginationRange
    }

    if (paginationRange.includes(currentPage + 4)) {
      return paginationRange.slice(currentPage - 1, currentPage + 4)
    } else {
      return paginationRange.slice(
        paginationRange.length - 5,
        paginationRange.length,
      )
    }
  }, [currentPage, paginationRange])

  return (
    <CPagination>
      <CPaginationItem disabled={currentPage === 1} onClick={handleFirstPage}>
        &laquo; First
      </CPaginationItem>
      <CPaginationItem
        disabled={currentPage === 1}
        onClick={handlePreviousPage}
      >
        &lt; Prev
      </CPaginationItem>
      {paginationItems.map((pageNumber, index) => {
        return (
          <CPaginationItem
            key={index}
            active={currentPage === pageNumber}
            onClick={() => handleSelectPage(pageNumber)}
          >
            {pageNumber}
          </CPaginationItem>
        )
      })}
      <CPaginationItem
        onClick={handleNextPage}
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
      >
        Next &gt;
      </CPaginationItem>
      <CPaginationItem
        disabled={currentPage === paginationRange[paginationRange.length - 1]}
        onClick={handleLastPage}
      >
        Last &raquo;
      </CPaginationItem>
    </CPagination>
  )
}

export default OPagination
