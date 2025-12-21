import { UserCreateError } from './user-create.errors';
import { UserCreateSucces, UserCreateFailed } from './user-create.result';

export class UserCreateResultFactory {
  public static success(userId: string): UserCreateSucces {
    return { success: true, userId };
  }

  public static failed(error: UserCreateError): UserCreateFailed {
    return { success: false, error };
  }
}
