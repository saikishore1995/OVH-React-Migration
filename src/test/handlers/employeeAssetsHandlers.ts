import { employeeAssetsApiConfig } from '../../middleware/api/apiList'
import { mockAssetsDetails } from '../data/employeeAssetsData'
import { rest } from 'msw'

export const employeeAssetsHandlers = [
  rest.get(employeeAssetsApiConfig.getEmployeeAssets, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  rest.get(employeeAssetsApiConfig.getEmployeeAssets, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAssetsDetails))
  }),
]
