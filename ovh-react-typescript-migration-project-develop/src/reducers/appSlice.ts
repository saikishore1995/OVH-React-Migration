import { JSXElementConstructor, ReactElement } from 'react'

import { RootState } from '../stateStore'
import { createSlice } from '@reduxjs/toolkit'

type AppState = {
  sidebarShow: boolean
  sidebarUnfoldable: boolean
  asideShow: boolean
  theme: string
  toast:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | undefined
  reRenderMenu: boolean
  isSessionExpired: boolean
}

const initialState: AppState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
  asideShow: false,
  theme: 'default',
  toast: undefined,
  reRenderMenu: true,
  isSessionExpired: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    addToast: (state, action) => {
      return { ...state, toast: action.payload }
    },
    toggleSidebar: (state) => {
      state.sidebarShow = !state.sidebarShow
    },
    setReRenderMenu: (state, action) => {
      return { ...state, reRenderMenu: action.payload }
    },
    setIsSessionExpired: (state, action) => {
      return { ...state, isSessionExpired: action.payload }
    },
  },
})

const selectIsSessionExpired = (state: RootState): boolean =>
  state.app.isSessionExpired

const appSelectors = { selectIsSessionExpired }

export const appService = { actions: appSlice.actions, selectors: appSelectors }

export default appSlice.reducer
