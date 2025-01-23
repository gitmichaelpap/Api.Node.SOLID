export class InvalidCredentialsError extends Error {
    constructor() {
        super('Invalid credential error.');
        this.name = 'InvalidCredentialError';
    }
}