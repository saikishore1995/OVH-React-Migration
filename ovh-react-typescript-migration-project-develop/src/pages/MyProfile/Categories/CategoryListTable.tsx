import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useMemo, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import CIcon from '@coreui/icons-react'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { cilTrash } from '@coreui/icons'
import { currentPageData } from '../../../utils/paginationUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const CategoryListTable = (): JSX.Element => {
  const categories = useTypedSelector(
    reduxServices.category.selectors.categories,
  )
  const pageFromState = useTypedSelector(
    reduxServices.category.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.category.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(categories.length, pageSizeFromState, pageFromState)

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteCategoryName, setToDeleteCategoryName] = useState('')
  const [toDeleteCategoryId, setToDeleteCategoryId] = useState(0)

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleShowDeleteModal = (categoryName: string, categoryId: number) => {
    setToDeleteCategoryName(categoryName)
    setToDeleteCategoryId(categoryId)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDelete = async (categoryId: number) => {
    setIsDeleteModalVisible(false)

    dispatch(reduxServices.category.actions.setCurrentPage(currentPage))
    dispatch(reduxServices.category.actions.setPageSize(pageSize))
    dispatch(reduxServices.category.deleteCategory(categoryId))
  }

  const currentPageItems = useMemo(
    () => currentPageData(categories, currentPage, pageSize),
    [categories, currentPage, pageSize],
  )

  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="w-25">
              #
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-50">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="w-25">
              Action
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {currentPageItems.map((category, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">
                  {getItemNumber(index)}
                </CTableHeaderCell>
                <CTableDataCell>{category.categoryType}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    size="sm"
                    onClick={() =>
                      handleShowDeleteModal(
                        category.categoryType,
                        category.categoryId,
                      )
                    }
                  >
                    <CIcon className="text-white" icon={cilTrash} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {categories.length}</strong>
          </p>
        </CCol>
        {!categories.length && (
          <CCol>
            <CRow className="category-no-data">
              <h4 className="text-center">No data to display</h4>
            </CRow>
          </CCol>
        )}
        <CCol xs={3}>
          {categories.length > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSizeSelectChange}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {categories.length > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
          >
            <OPagination
              currentPage={currentPage}
              pageSetter={setCurrentPage}
              paginationRange={paginationRange}
            />
          </CCol>
        )}
      </CRow>
      <OModal
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete Category"
        confirmButtonText="Delete"
        closeButtonClass="d-none"
        confirmButtonAction={() => handleConfirmDelete(toDeleteCategoryId)}
      >
        {`Are you sure you want to delete this ${toDeleteCategoryName} category item?`}
      </OModal>
    </>
  )
}

export default CategoryListTable
