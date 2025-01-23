import { PrismaUsersRepository } from './../repositories/prisma/prisma-users-repository';
import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { UserAlreadyExistsError } from '@/errors/user-already-exists-error';


describe('Register Use Case', () => {

    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: '321654'
        })

        expect(user).toHaveProperty('id')
    })

    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'john@example.com',
            password: '321654'
        })

        const isPasswordCorrectlyHashed = await compare('321654', user.password_hash)

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it('should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'john@example.com';

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '321654'
        })

        await expect(() =>
            registerUseCase.execute({
                name: 'John Doe',
                email,
                password: '321654'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
