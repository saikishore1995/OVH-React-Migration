import { AllowedHttpMethods, sideMenuApiConfig } from '../../api/apiList'

import { SidebarMenuReturnApi } from '../../../types/SidebarMenu/sidebarMenuType'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { getAuthenticatedRequestConfig } from '../../../utils/apiUtils'

export const getSidebarMenu = createAsyncThunk<
  SidebarMenuReturnApi[],
  string | number
>('sidebarMenu/doFetchSidebarMenu', async (employeeId: string | number) => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: sideMenuApiConfig.getMenuData,
    method: AllowedHttpMethods.get,
    params: {
      loggedInEmpId: employeeId,
    },
  })
  const response = await axios(requestConfig)
  return response.data as SidebarMenuReturnApi[]
})
