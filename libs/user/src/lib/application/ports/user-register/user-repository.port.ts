import { User } from '../../../domain';

export interface UserRepositoryPort {
  findUserAuthData: (email: string) => Promise<{ userId: string; passwordHash: string } | null>;
  checkExistEmail: (email: string) => Promise<boolean>;
  save: (user: User) => Promise<void>;
}
