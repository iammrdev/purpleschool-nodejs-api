import { inject, injectable } from 'inversify';
import { User as UserModel } from '@prisma/client';
import { Dependency } from '../../config/config.dependency';
import { User } from './users.entity';
import { AppUsersRepository } from './users.repository.interface';
import { PrismaService } from '../../database/prisma.service';

@injectable()
export class UsersRepository implements AppUsersRepository {
  constructor(@inject(Dependency.PrismaService) private prismaService: PrismaService) {}

  async create({ email, password, name }: User): Promise<UserModel> {
    return this.prismaService.client.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async find(email: string): Promise<UserModel | null> {
    return this.prismaService.client.user.findFirst({
      where: {
        email,
      },
    });
  }
}
