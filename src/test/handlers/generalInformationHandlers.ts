import { employeeGeneralInformationApiConfig } from '../../middleware/api/apiList'
import { mockGeneralInformationData } from '../data/generalInformationData'
import { rest } from 'msw'

export const generalInformationHandlers = [
  rest.get(
    employeeGeneralInformationApiConfig.getLoggedInEmployeeData,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),

  rest.get(
    employeeGeneralInformationApiConfig.getLoggedInEmployeeData,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockGeneralInformationData))
    },
  ),
]
