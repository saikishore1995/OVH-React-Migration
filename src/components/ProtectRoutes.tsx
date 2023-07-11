import React from 'react'
import { Redirect } from 'react-router-dom'

const ProtectRoute = ({
  children,
  callback,
  redirectTo,
}: {
  children: JSX.Element
  callback: (token: string | null) => boolean
  redirectTo: string
}): JSX.Element => {
  const token = localStorage.getItem('token')

  return callback(token) ? children : <Redirect to={redirectTo} />
}

export default ProtectRoute
