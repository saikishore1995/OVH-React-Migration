/* eslint-disable prettier/prettier */
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CLink,
} from '@coreui/react-pro'

import React from 'react'

const OCard = (props: {
  className?: string
  CHeaderClassName?: string
  title?: string
  CBodyClassName?: string
  CFooterClassName?: string
  CLinkClassName?: string
  CCardTitleClassName?: string
  children?: React.ReactNode
}): JSX.Element => {
  return (
    <>
      <CCard className={props.className}>
        <CCardHeader className={props.CHeaderClassName}>
          <h4 className={`h4 ${props.CCardTitleClassName}`}>{props.title}</h4>
        </CCardHeader>
        <CCardBody className={props.CBodyClassName}>{props.children}</CCardBody>
        <CCardFooter className={props.CFooterClassName}>
          <CLink
            className={`font-weight-bold font-xs float-end ${
              props.CLinkClassName ? props.CLinkClassName : ''
            }`}
            href="https://coreui.io/"
            rel="noopener norefferer"
            target="_blank"
          >
            View more
            {/* <CIcon icon={cilArrowRight} className="ms-2" width={16} /> */}
          </CLink>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default OCard
