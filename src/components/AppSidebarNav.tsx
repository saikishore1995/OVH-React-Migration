import { Badge, NavItem } from '../_nav'
import { NavLink, useLocation } from 'react-router-dom'
import React, { FC, ReactNode } from 'react'

import { CBadge } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import PropTypes from 'prop-types'

interface AppSidebarNavProps {
  items: NavItem[]
}

export const AppSidebarNav: FC<AppSidebarNavProps> = ({ items }) => {
  const location = useLocation()
  const navLink = (
    name: string | JSX.Element,
    icon: string | ReactNode,
    badge?: Badge,
  ) => {
    return (
      <>
        {icon && typeof icon === 'string' ? (
          <CIcon icon={icon} customClassName="nav-icon" />
        ) : (
          icon
        )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item: NavItem, index: number) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            activeClassName: 'active',
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item: NavItem, index: number) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((currentItem: NavItem, itemIndex: number) =>
          currentItem.items
            ? navGroup(currentItem, itemIndex)
            : navItem(currentItem, itemIndex),
        )}
      </Component>
    )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item: NavItem, index: number) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
