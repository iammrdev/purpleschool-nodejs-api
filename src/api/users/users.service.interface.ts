import { User as UserModel } from '@prisma/client';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserSignupDto } from './dto/user-signup.dto';

export interface AppUsersService {
  createUser: (dto: UserSignupDto) => Promise<UserModel | null>;
  validateUser: (dto: UserSigninDto) => Promise<boolean>;
  getUserInfo: (email: string) => Promise<UserModel | null>;
}
