export abstract class UserDomainError extends Error {
  readonly isDomainError = true;
}

export class UserEmailInvalid extends UserDomainError {
  constructor(email: string) {
    super(`Email ${email} is invalid`);
  }
}
