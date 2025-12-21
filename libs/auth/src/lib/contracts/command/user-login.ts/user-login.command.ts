export interface UserLoginCommand {
  commandId: string;
  correlationId: string;

  email: string;
  passwordRaw: string;
}
