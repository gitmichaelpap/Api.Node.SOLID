import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { nearby } from './nearby'
import { create } from './create'
import { search } from './search'
import { verifyUserRole } from '@/http/middlewares/rerify-user-role'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)
  app.post('/gyms', {onRequest: [verifyUserRole]},create)
}