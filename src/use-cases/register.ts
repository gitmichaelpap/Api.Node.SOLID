import { UserAlreadyExistsError } from "@/errors/user-already-exists-error";
import { UsersRepository } from "@/repositories/users-repositorys";
import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) { }

    async execute({ name, email, password }: RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        await this.usersRepository.create({
            name: name,
            email: email,
            password_hash
        });
    }
}