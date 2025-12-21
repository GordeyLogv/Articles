export interface UserCreateCommand {
  readonly commandId: string;
  readonly correlationId: string;
  
  readonly userId: string;
  readonly email: string;
  readonly passwordHash: string;
}