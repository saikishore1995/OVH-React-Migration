import { CButton, CImage } from '@coreui/react-pro'

import AppFooter from './AppFooter'
import RayBizTechLogo from '../assets/images/logo/RbtLogo.svg'
import React from 'react'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch } from '../stateStore'
import { useHistory } from 'react-router-dom'

const SessionTimeout = (): JSX.Element => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const handleLoginAgain = () => {
    dispatch(reduxServices.app.actions.setIsSessionExpired(false))
    history.push('/login')
  }

  return (
    <>
      <div className="d-flex flex-row">
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <div className="session-expire-header">
            <CImage
              src={RayBizTechLogo}
              className="cursor-pointer session-expire-logo"
              width={200}
            />
          </div>
          <div className="body flex-grow-1 px-1 session-expire-body">
            <h2 className="session-expire-message">
              Your session has timed out.
            </h2>
            <br />
            <div className="session-expire-button-container">
              <CButton
                className="session-expire-button"
                size="sm"
                onClick={handleLoginAgain}
              >
                Click here to login again
              </CButton>
            </div>
          </div>
        </div>
      </div>
      <div className="session-expire-footer">
        <AppFooter />
      </div>
    </>
  )
}

export default SessionTimeout
