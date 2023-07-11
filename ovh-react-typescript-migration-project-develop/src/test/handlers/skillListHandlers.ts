import { mockSkills } from '../data/skillListData'
import { rest } from 'msw'
import { skillsApiConfig } from '../../middleware/api/apiList'

export const skillListHandlers = [
  // addNewSkillForCategory api mock
  rest.get(skillsApiConfig.addNewSkillForCategory, (req, res, ctx) => {
    return res(
      ctx.json({
        status: 200,
        data: {},
      }),
    )
  }),

  // getSkillListForCategory api mock
  rest.get(skillsApiConfig.getSkillListForCategory, (req, res, ctx) => {
    return res.once(ctx.status(200), ctx.json([]))
  }),

  // getSkillListForCategory api mock
  rest.get(skillsApiConfig.getSkillListForCategory, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSkills))
  }),
]
