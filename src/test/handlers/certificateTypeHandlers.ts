import { certificateTypeApiConfig } from '../../middleware/api/apiList'
import { mockCertificateType } from '../data/certificateTypeData'
import { rest } from 'msw'

export const certificateTypeHandlers = [
  // addCertificateType api mock
  rest.get(certificateTypeApiConfig.addCertificateType, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),
  // getAllCertificateType api mock
  rest.get(certificateTypeApiConfig.getCertificateTypes, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),
  // getAllCertificateType api mock
  rest.get(certificateTypeApiConfig.getCertificateTypes, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCertificateType))
  }),
]
