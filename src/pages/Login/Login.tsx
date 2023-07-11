import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../stateStore'

import AIMLBridgeLogo from '../../assets/images/logo/ai_bridge_logo_207X65.png'
import RayBizTechLogo from '../../assets/images/logo/raybiztech-logo.png'
import { reduxServices } from '../../reducers/reduxServices'
import { useHistory } from 'react-router-dom'

const Login = (): JSX.Element => {
  const rbtTenantKey = 'RAYBIZTECH'
  const aimlTenantKey = 'AIBRIDGEML'

  const [tenantKey, setTenantKey] = useState(rbtTenantKey)
  const [isLoginBtnEnabled, setIsLoginBtnEnabled] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const error = useTypedSelector(
    reduxServices.authentication.selectors.selectError,
  )

  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    if (username && password) {
      setIsLoginBtnEnabled(true)
      dispatch(reduxServices.authentication.actions.clearError())
      dispatch(reduxServices.authentication.actions.clearLoading())
    } else {
      setIsLoginBtnEnabled(false)
    }
  }, [username, password, dispatch])

  useEffect(() => {
    if (!username && !password) {
      dispatch(reduxServices.authentication.actions.clearError())
      dispatch(reduxServices.authentication.actions.clearLoading())
    }
  }, [dispatch, password, username])

  const rbtCopyright = 'Copyright © Ray Business Technologies Pvt Ltd'
  const aimlCopyright = 'Copyright © AIBridgeML Pvt Ltd'

  const logoImg = tenantKey === rbtTenantKey ? RayBizTechLogo : AIMLBridgeLogo

  const loginBtnColor = tenantKey === rbtTenantKey ? 'primary' : 'success'

  const loginBg = tenantKey === rbtTenantKey ? 'bg-img' : 'bg-clear'

  const copyright = tenantKey === rbtTenantKey ? rbtCopyright : aimlCopyright

  const handleTenantKeyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTenantKey(event.target.value)
  }

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    event.preventDefault()
    const resultAction = await dispatch(
      reduxServices.authentication.authenticateUser({
        username,
        password,
        tenantKey,
      }),
    )

    if (
      reduxServices.authentication.authenticateUser.fulfilled.match(
        resultAction,
      )
    ) {
      history.push('/dashboard')
    } else {
      setPassword('')
    }
  }

  return (
    <div className={`min-vh-100 align-items-center login-container ${loginBg}`}>
      <CContainer fluid>
        <CRow className="justify-content-center logo-box">
          <CCol xs="auto">
            <CImage src={logoImg} alt={tenantKey} className="cursor-pointer" />
          </CCol>
        </CRow>
        <CRow className="justify-content-center">
          <CCol sm={8} md={4}>
            <CCardGroup>
              <CCard className="login-card">
                <CCardBody className="login-card-body">
                  <CForm>
                    <h2 className="text-center mg-bot-20 gray-900 login-heading">
                      Login
                    </h2>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="login-input-icon-container">
                        <i className="fa fa-user"></i>
                      </CInputGroupText>
                      <CFormInput
                        className="login-input-field"
                        placeholder="Username"
                        autoComplete="username"
                        size="sm"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="login-input-icon-container">
                        <i className="fa fa-asterisk"></i>
                      </CInputGroupText>
                      <CFormInput
                        className="login-input-field"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        size="sm"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <div className="tenant-key">
                      <CFormCheck
                        type="radio"
                        name="tenantKeySelect"
                        value={rbtTenantKey}
                        id="raybiztechradio"
                        label="Raybiztech"
                        inline
                        defaultChecked={tenantKey === rbtTenantKey}
                        onChange={handleTenantKeyChange}
                      />
                      <CFormCheck
                        type="radio"
                        name="tenantKeySelect"
                        value={aimlTenantKey}
                        id="aibridgemlradio"
                        label="AIBridgeML"
                        inline
                        defaultChecked={tenantKey === aimlTenantKey}
                        onChange={handleTenantKeyChange}
                      />
                    </div>
                    <CRow>
                      <CCol xs={12} className="d-grid">
                        <CButton
                          color="primary"
                          className={`px-4 login-btn-${loginBtnColor}`}
                          disabled={!isLoginBtnEnabled}
                          onClick={handleLogin}
                          size="sm"
                          type="submit"
                        >
                          Login
                        </CButton>

                        {error && (
                          <p className="login-error">
                            Incorrect username or password
                          </p>
                        )}
                      </CCol>
                    </CRow>
                    <CRow className="text-center pad-ver login-copyrights">
                      <p>{copyright}</p>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
