
import { beforeEach, describe, expect, it } from 'vitest';
import { CheckInUseCase } from './check-in';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInsRepository()
        sut = new CheckInUseCase(checkInRepository)
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            userId: 'user-id',
            gymId: 'gym-id'
        })

        expect(checkIn).toHaveProperty('id')
    })
})
