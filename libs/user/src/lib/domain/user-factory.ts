import { User } from './user-entity';
import { UserEmailInvalid } from './user-errors';
import { UserRoles } from './user-roles';

export class UserFactory {
  public static createNew(props: {
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    birthDay?: Date;
  }): User {
    if (!props.email.includes('@')) {
      throw new UserEmailInvalid(props.email);
    }

    return User.create({
      ...props,
      roles: [UserRoles.USER],
    });
  }

  public static fromPersistence(props: {
    userId: string;
    email: string;
    roles: UserRoles[];
    firstName?: string;
    lastName?: string;
    birthDay?: Date;
  }): User {
    return User.create(props);
  }
}
