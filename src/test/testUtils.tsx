/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// @ts-nocheck

import { Provider } from 'react-redux'
import React from 'react'
import { Router } from 'react-router-dom'
import { allReducers } from '../stateStore'
import { configureStore } from '@reduxjs/toolkit'
import { createMemoryHistory } from 'history'
import { render as rtlRender } from '@testing-library/react'

const render = (
  ui,
  {
    preloadedState,
    store = configureStore({ reducer: allReducers, preloadedState }),
    ...renderOptions
  } = {},
) => {
  const Wrapper = ({ children }) => {
    const history = createMemoryHistory()
    return (
      <Router history={history}>
        <Provider store={store}>{children}</Provider>
      </Router>
    )
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { render }
