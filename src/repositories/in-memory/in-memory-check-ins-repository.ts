import { Prisma, CheckIn } from '@prisma/client';
import { CheckInsRepository } from '../check-ins-repository';
import { randomUUID } from 'node:crypto';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
    public items: CheckIn[] = []

    async save(checkIn: CheckIn) {
        const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
        if (checkInIndex >= 0) {
          this.items[checkInIndex] = checkIn
        }
        return checkIn
    }

    async findById(id: string) {
        const checkIn = this.items.find((item) => item.id === id)
        if (!checkIn) {
          return null
        }
        return checkIn
    }
    
    async countByUserId(userId: string) {
        return this.items.filter((checkIn) => checkIn.user_id === userId).length
    }

    async findManyByUserId(userId: string, page: number) {
        return this.items
          .filter((checkIn) => checkIn.user_id === userId)
          .slice((page - 1) * 20, page * 20)
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfDay = dayjs(date).startOf('date')
        const endOfDay = dayjs(date).endOf('date')

        const checkInOnSameDate = this.items.find(
            (checkIn) => {
                return checkIn.user_id === userId &&
                    dayjs(checkIn.createdAt).isAfter(startOfDay) &&
                    dayjs(checkIn.createdAt).isBefore(endOfDay)
            }
        )
        if (!checkInOnSameDate) {
            return null
        }
        return checkInOnSameDate
    }


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