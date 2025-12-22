import { IsEmail, IsString, Length } from 'class-validator';

export namespace RegisterDto {
  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 24)
    passwordRaw: string;
  }

  export class Responce {
    userId: string;
  }
}
