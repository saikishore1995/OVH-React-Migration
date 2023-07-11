import { CCloseButton, CSidebar, CSidebarHeader } from '@coreui/react-pro'

import React from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../stateStore'

const AppAside = () => {
  const dispatch = useDispatch()
  const asideShow = useTypedSelector((state) => state.app.asideShow)

  return (
    <CSidebar
      colorScheme="light"
      size="lg"
      overlaid
      placement="end"
      visible={asideShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', asideShow: visible })
      }}
    >
      <CSidebarHeader className="bg-transparent">
        <CCloseButton
          className="float-end"
          onClick={() => dispatch({ type: 'set', asideShow: false })}
        />
      </CSidebarHeader>
    </CSidebar>
  )
}

export default React.memo(AppAside)
