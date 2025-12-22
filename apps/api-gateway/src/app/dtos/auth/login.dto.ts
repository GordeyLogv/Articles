import { IsEmail, IsString } from 'class-validator';

export namespace LoginDto {
  export class Request {
    @IsEmail()
    email: string;

    @IsString()
    passwordRaw: string;
  }

  export class Responce {}
}
