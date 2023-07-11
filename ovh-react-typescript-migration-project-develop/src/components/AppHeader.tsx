import {
  CButton,
  CContainer,
  CFormInput,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CInputGroup,
} from '@coreui/react-pro'

import AppHeaderDropdown from './AppHeaderDropdown'
import CIcon from '@coreui/icons-react'
import React from 'react'
import { cilMenu } from '@coreui/icons'
import { logo } from '../assets/brand/logo'
import { reduxServices } from '../reducers/reduxServices'
import { useAppDispatch } from '../stateStore'

const AppHeader = (): JSX.Element => {
  const dispatch = useAppDispatch()

  return (
    <CHeader className="main-header mb-3">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1 me-auto"
          onClick={() => dispatch(reduxServices.app.actions.toggleSidebar())}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none">
          <CIcon icon={logo} height={48} />
        </CHeaderBrand>
        <CHeaderNav>
          <CInputGroup className="global-search me-4">
            <CFormInput
              placeholder="Search Employee"
              aria-label="Search Employee"
              aria-describedby="button-addon2"
            />
            <CButton type="button" color="info" id="button-addon2">
              <i className="fa fa-search"></i>
            </CButton>
          </CInputGroup>
        </CHeaderNav>
        <CHeaderNav>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
