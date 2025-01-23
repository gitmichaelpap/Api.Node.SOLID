import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            validade_at: data.validade_at ? new Date(data.validade_at) : null,
            user_id: data.user_id,
            gym_id: data.gym_id,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.items.push(checkIn)

        return checkIn
    }
}