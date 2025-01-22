import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerSchema = z.object({
        name: z.string().nonempty(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { name, email, password } = registerSchema.parse(request.body);

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: password,
        }
    })

    reply.status(201).send();
}
