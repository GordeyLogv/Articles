import { UserRoles } from './user-roles';

interface UserProps {
  userId: string;
  email: string;
  roles: UserRoles[];
  firstName?: string;
  lastName?: string;
  birthDay?: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  public static create(props: UserProps): User {
    return new User(props);
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get email(): string {
    return this.props.email;
  }

  public get roles(): readonly UserRoles[] {
    return this.props.roles;
  }
}
