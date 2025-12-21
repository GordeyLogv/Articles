import { UserRegisterError } from './user-register.errors';
import { UserRegisterSucces, UserRegisterFailed } from './user-register.result';

export class UserRegisterResultFactory {
  public static success(userId: string): UserRegisterSucces {
    return { success: true, userId };
  }

  public static failed(error: UserRegisterError): UserRegisterFailed {
    return { success: false, error };
  }
}
