import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { register } from './register.controller'
import { authenticate } from './authenticate.controller'
import { refresh } from './refresh.controller'
import { profile } from './profile.controller'
import { verifyUserRole } from '@/http/middlewares/rerify-user-role'



export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyUserRole] }, profile)
}