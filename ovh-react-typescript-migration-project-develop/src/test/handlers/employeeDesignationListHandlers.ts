import { employeeDesignationListApiConfig } from '../../middleware/api/apiList'
import {
  mockDepartments,
  mockDesignationList,
} from '../data/employeeDesignationListData'
import { rest } from 'msw'

export const categoryListHandlers = [
  // addDesignation api mock
  rest.get(
    employeeDesignationListApiConfig.addEmployeeDesignation,
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  // getAllDesignations api mock
  rest.get(
    employeeDesignationListApiConfig.getEmployeeDesignations,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getAllDesignations api mock
  rest.get(
    employeeDesignationListApiConfig.getEmployeeDesignations,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockDesignationList))
    },
  ),

  // getAllDepartments api mock
  rest.get(
    employeeDesignationListApiConfig.getEmployeeDepartments,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getAllDepartments api mock
  rest.get(
    employeeDesignationListApiConfig.getEmployeeDepartments,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockDepartments))
    },
  ),
]
