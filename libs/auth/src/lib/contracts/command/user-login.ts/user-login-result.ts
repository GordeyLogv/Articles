import { UserLoginError } from './user-login.errors';

export type UserLoginSuccess = { success: true; userId: string };
export type UserLoginFailed = { success: false; error: UserLoginError };

export type UserLoginResult = UserLoginSuccess | UserLoginFailed;
