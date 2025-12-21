export interface PasswordServicePort {
  hash: (passwordRaw: string) => Promise<string>;
  compare: (hashPassword: string, passwordRaw: string) => Promise<boolean>;
}
