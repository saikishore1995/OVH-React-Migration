import {} from '../../middleware/api/apiList'

import {
  SidebarMenu,
  ValidationError,
} from '../../types/SidebarMenu/sidebarMenuType'

import { createSlice } from '@reduxjs/toolkit'
import { getSidebarMenu } from '../../middleware/api/SidebarMenu/sidebarMenuApi'

const initialSidebarMenuState = {} as SidebarMenu
const sidebarMenuSlice = createSlice({
  name: 'sidebarMenuSliceHandler', // name of your slice
  initialState: initialSidebarMenuState,
  reducers: {
    setSidebarMenuSliceHandler: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSidebarMenu.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getSidebarMenu.fulfilled, (state, action) => {
        state.menuItems = action.payload
      })
      .addCase(getSidebarMenu.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as ValidationError
      })
  },
})
export const { setSidebarMenuSliceHandler } = sidebarMenuSlice.actions
export default sidebarMenuSlice.reducer
