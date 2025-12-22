import { UserRegisterError } from './user-register.errors';

export type UserRegisterSucces = { success: true; userId: string };

export type UserRegisterFailed = { success: false; error: UserRegisterError };

export type UserRegisterResult = UserRegisterSucces | UserRegisterFailed;
