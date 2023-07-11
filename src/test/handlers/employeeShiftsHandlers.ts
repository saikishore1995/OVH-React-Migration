import { mockEmployeeShifts } from '../data/employeeShiftsData'
import { rest } from 'msw'
import { shiftConfigurationApiConfig } from '../../middleware/api/apiList'

export const employeeShiftsHandlers = [
  // getAllShifts api mock
  rest.get(shiftConfigurationApiConfig.getAllShifts, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllShifts api mock
  rest.get(shiftConfigurationApiConfig.getAllShifts, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockEmployeeShifts))
  }),
  // create employee shift api mock
  rest.get(shiftConfigurationApiConfig.addTimeSlot, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // update employee shift api mock
  rest.get(shiftConfigurationApiConfig.updateShiftDetail, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // delete employee shift api mock
  rest.get(shiftConfigurationApiConfig.deleteShiftDetail, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
]
