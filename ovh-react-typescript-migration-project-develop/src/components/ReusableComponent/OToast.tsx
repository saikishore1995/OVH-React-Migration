import { CToast, CToastBody, CToastClose } from '@coreui/react-pro'

import React from 'react'
import { ToastPropsType } from '../../types/Components/toastTypes'

const OToast = ({
  toastMessage,
  toastColor,
  isAutoHide = true,
}: ToastPropsType): JSX.Element => {
  return (
    <CToast
      autohide={isAutoHide}
      visible={true}
      color={toastColor}
      className="text-white align-items-center"
    >
      <div className="d-flex">
        <CToastBody>{toastMessage}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
}

export default OToast
