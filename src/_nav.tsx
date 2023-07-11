import { CNavGroup, CNavItem } from '@coreui/react-pro'
import React, { ElementType } from 'react'

import CIcon from '@coreui/icons-react'
import { cilSpeedometer } from '@coreui/icons'

export type Badge = {
  color: string
  text: string
}

export type NavItem = {
  component: string | ElementType
  name: string | JSX.Element
  icon?: string | JSX.Element
  badge?: Badge
  to: string
  items?: NavItem[]
}

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    to: '/dashboard',
  },
  {
    component: CNavItem,
    name: 'My Profile',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    to: '/profile',
  },
  {
    component: CNavGroup,
    name: 'Settings',
    to: '/settings',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'User Roles Configuration',
        to: '/rolesList',
      },
    ],
  },
]

export default _nav
