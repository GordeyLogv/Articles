export interface UserRepositoryPort {
  getUserAuthData: (email: string) => Promise<{ userId: string; passwordHash: string } | null>;
}
