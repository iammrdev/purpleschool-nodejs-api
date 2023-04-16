import { UserModel } from '@prisma/client';
import { User } from './user.entity';

export interface AppUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
