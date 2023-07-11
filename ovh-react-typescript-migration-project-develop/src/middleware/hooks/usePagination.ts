import { useMemo, useState } from 'react'

type UsePaginationType = {
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  currentPage: number
}

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}
export const usePagination = (
  totalItemCount: number,
  customPageSize = 20,
  initialPage = 1,
): UsePaginationType => {
  const [pageSize, setPageSize] = useState(customPageSize)

  const paginationRange = useMemo(() => {
    return range(1, Math.ceil(totalItemCount / pageSize))
  }, [totalItemCount, pageSize])

  if (!paginationRange.includes(initialPage) && initialPage !== 1) {
    initialPage = paginationRange[paginationRange.length - 1]
  }

  const [currentPage, setCurrentPage] = useState(initialPage)

  return { paginationRange, setPageSize, setCurrentPage, pageSize, currentPage }
}
