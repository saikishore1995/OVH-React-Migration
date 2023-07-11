export function currentPageData<T>(
  tableData: T[],
  currentPage: number,
  pageSize: number,
): T[] {
  if (tableData.length > 0) {
    const firstPageIndex = (currentPage - 1) * pageSize
    const lastPageIndex = firstPageIndex + pageSize
    return tableData.slice(firstPageIndex, lastPageIndex)
  }

  return []
}
