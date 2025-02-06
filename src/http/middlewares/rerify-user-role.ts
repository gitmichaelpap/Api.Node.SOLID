import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyUserRole(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
    if (request.user.role !== 'ADMIN') {
      return reply.status(403).send({ message: 'Forbidden.' })
    }
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}