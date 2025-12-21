import { UserLoginFailed, UserLoginSuccess } from './user-login-result';
import { UserLoginError } from './user-login.errors';

export class UserLoginResultFactory {
  public static success(userId: string): UserLoginSuccess {
    return { success: true, userId };
  }

  public static failed(error: UserLoginError): UserLoginFailed {
    return { success: false, error };
  }
}
