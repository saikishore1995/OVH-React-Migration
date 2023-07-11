import {
  AppAside,
  AppContent,
  AppFooter,
  AppHeader,
  AppSidebar,
} from '../components/index'
import React, { useRef } from 'react'

import { CToaster } from '@coreui/react-pro'
import IdleModal from '../components/IdleModal'
import { useTypedSelector } from '../stateStore'

const DefaultLayout = (): JSX.Element => {
  const toastState = useTypedSelector((state) => state.app.toast)
  const toasterReference = useRef<HTMLDivElement>(null)

  const timeout = Number(process.env.REACT_APP_IDLE_TIMEOUT) || 20 * 60 * 1000
  const promptTimeout =
    Number(process.env.REACT_APP_PROMPT_TIMEOUT) || 30 * 1000

  return (
    <>
      <div className="d-flex flex-row">
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-1">
            <AppContent />

            <CToaster
              ref={toasterReference}
              push={toastState}
              placement="top-end"
            />

            <IdleModal timeout={timeout} promptTimeout={promptTimeout} />
          </div>
        </div>
        <AppAside />
      </div>
      <AppFooter />
    </>
  )
}

export default DefaultLayout
