import { PrismaUsersRepository } from './../repositories/prisma/prisma-users-repository';
import { beforeEach, describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: '321654'
        })

        expect(user).toHaveProperty('id')
    })

    it('should hash user password upon registration', async () => {
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: '321654'
        })

        const isPasswordCorrectlyHashed = await compare('321654', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const email = 'john@example.com';

        await sut.execute({
            name: 'John Doe',
            email,
            password: '321654'
        })

        await expect(() =>
            sut.execute({
                name: 'John Doe',
                email,
                password: '321654'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
