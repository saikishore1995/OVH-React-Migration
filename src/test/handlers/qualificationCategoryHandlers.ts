import { employeeQualificationCategoryApiConfig } from '../../middleware/api/apiList'
import { mockQualificationCategories } from '../data/qualificationCategoryListData'
import { rest } from 'msw'

export const qualificationCategoryListHandlers = [
  // addQualificationCategory api mock
  rest.get(
    employeeQualificationCategoryApiConfig.createQualificationCategory,
    (req, res, ctx) => {
      return res(
        ctx.json({
          status: 200,
          data: {},
        }),
      )
    },
  ),
  // getAllQualificationCategories api mock
  rest.get(
    employeeQualificationCategoryApiConfig.getQualificationCategories,
    (req, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]))
    },
  ),
  // getAllQualificationCategories api mock
  rest.get(
    employeeQualificationCategoryApiConfig.getQualificationCategories,
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockQualificationCategories))
    },
  ),
]
