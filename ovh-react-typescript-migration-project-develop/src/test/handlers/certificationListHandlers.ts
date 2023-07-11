import { employeeCertificationsApiConfig } from '../../middleware/api/apiList'
import { mockCertificationCategories } from '../data/certificationListData'
import { rest } from 'msw'

export const certificationListHandlers = [
  // getAllCertifications api mock
  rest.get(
    employeeCertificationsApiConfig.getEmployeeCertificates,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getAllCertifications api mock
  rest.get(
    employeeCertificationsApiConfig.getEmployeeCertificates,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockCertificationCategories))
    },
  ),
]
