import { UserRepositoryPort } from '../ports';

export class UserCheckUniqueEmail {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async execute(email: string): Promise<boolean> {
    return await this.userRepository.checkExistEmail(email);
  }
}
