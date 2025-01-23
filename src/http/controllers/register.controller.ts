import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository';
import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { RegisterUseCase } from "@/use-cases/register";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerSchema = z.object({
        name: z.string().nonempty(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerSchema.parse(request.body);

    try {
        const usersRepository = new PrismaUsersRepository();
        const registerUseCase = new RegisterUseCase(usersRepository);

        await registerUseCase.execute({ name, email, password });
    } catch (error) {
        return reply.status(409).send();
    }

    reply.status(201).send();
}
