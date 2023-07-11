import { AppDispatch, RootState } from '../../../stateStore'
import {
  Category,
  CategorySliceState,
} from '../../../types/MyProfile/Categories/categoryTypes'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import categoryApi from '../../../middleware/api/MyProfile/Categories/categoryApi'

const getAllCategories = createAsyncThunk(
  'category/getAllCategories',
  async (_, thunkApi) => {
    try {
      return await categoryApi.getAllCategories()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const createCategory = createAsyncThunk<
  Category[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('category/createCategory', async (categoryName, thunkApi) => {
  try {
    return await categoryApi.createCategory(categoryName)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const deleteCategory = createAsyncThunk<
  Category[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('category/deleteCategory', async (categoryId, thunkApi) => {
  try {
    return await categoryApi.deleteCategory(categoryId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialCategoryState: CategorySliceState = {
  categories: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {
    clearCategories: (state) => {
      state.categories = []
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getAllCategories.pending,
          createCategory.pending,
          deleteCategory.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getAllCategories.fulfilled,
          createCategory.fulfilled,
          deleteCategory.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.categories = action.payload as Category[]
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.category.isLoading
const categories = (state: RootState): Category[] => state.category.categories
const pageFromState = (state: RootState): number => state.category.currentPage
const pageSizeFromState = (state: RootState): number => state.category.pageSize

const categoryThunk = {
  getAllCategories,
  createCategory,
  deleteCategory,
}

const categorySelectors = {
  isLoading,
  categories,
  pageFromState,
  pageSizeFromState,
}

export const categoryService = {
  ...categoryThunk,
  actions: categorySlice.actions,
  selectors: categorySelectors,
}

export default categorySlice.reducer
