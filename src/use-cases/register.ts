import { hash } from "bcryptjs";

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class RegisterUseCase {
    constructor(
        private usersRepository: any
    ) { }

    async execute(data: RegisterUseCaseRequest) {
        const password_hash = await hash(data.password, 6);

        const userWithSameEmail = await this.usersRepository.findByEmail(data.email);

        if (userWithSameEmail) {
            throw new Error("Email already in use")
        }

        await this.usersRepository.create({
            name: data.name,
            email: data.email,
            password_hash
        });
    }
}