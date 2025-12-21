import { UserCreateError } from './user-create.errors';

export type UserCreateSucces = {
  success: true;
  userId: string;
};

export type UserCreateFailed = {
  success: false;
  error: UserCreateError;
};

export type UserCreateResult = UserCreateSucces | UserCreateFailed;
