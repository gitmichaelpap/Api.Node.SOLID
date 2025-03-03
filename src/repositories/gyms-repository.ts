import { Prisma, Gym } from "@prisma/client";
export interface FindManyNearbyParams {
    latitude: number
    longitude: number
  }
  
export interface GymsRepository {
    findById(email: string): Promise<Gym | null>;
    create(data: Prisma.GymCreateInput): Promise<Gym>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>
}