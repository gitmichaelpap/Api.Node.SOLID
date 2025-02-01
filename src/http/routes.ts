import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register.controller";
import { authenticate } from "./controllers/authenticate.controller";
import { profile } from "./controllers/profile.controller";
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance): Promise<void> {
    app.post("/users", register);
    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: [verifyJwt] }, profile)
}