import { correctPassword, username } from '../constants'

import { authenticationApiConfig } from '../../middleware/api/apiList'
import { encode } from 'base-64'
import { rest } from 'msw'

export const loginHandlers = [
  // login api mock
  rest.get(authenticationApiConfig.login, (req, res, ctx) => {
    const encodedCredentials = encode(`${username}:${correctPassword}`)
    const correctAuthorization = `Basic ${encodedCredentials}`
    const authorizationFromHeader = req.headers.get('authorization')
    if (correctAuthorization === authorizationFromHeader) {
      return res(
        ctx.status(200),
        ctx.json({
          tenantKey: 'tenant',
          employeeDto: {
            firstName: 'John',
            lastName: 'Doe',
            token: 'tokenSample',
            role: 'role',
            id: 1,
            userName: 'username',
            designation: 'designation',
          },
        }),
      )
    } else {
      return res(ctx.status(500))
    }
  }),
]
