import { IsEmail, IsString } from 'class-validator';

export class UserSigninDto {
  @IsEmail({}, { message: 'Неверно указан email' })
  email: string;

  @IsString()
  password: string;
}
