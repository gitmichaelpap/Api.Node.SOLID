import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-pofile';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('should be able to get user profile', async () => {
        const { id } = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456', 6),
        })

        const { user } = await sut.execute({
            userId: id,
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to get user profile with wrong id', async () => {
        expect(() =>
            sut.execute({
                userId: "non-existing-id",
            })
        ).rejects.toThrow(ResourceNotFoundError)
    })
})