import { User } from '../../domain';

export interface UserRepositoryPort {
  findByEmail: (email: string) => Promise<boolean>;
  save: (user: User) => Promise<void>;
}
