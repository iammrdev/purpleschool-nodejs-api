import { User as UserModel } from '@prisma/client';
import { User } from './users.entity';

export interface AppUsersRepository {
  create: (user: User) => Promise<UserModel>;
  find: (email: string) => Promise<UserModel | null>;
}
