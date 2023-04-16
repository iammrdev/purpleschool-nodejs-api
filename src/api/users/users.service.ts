import { inject, injectable } from 'inversify';
import { User as UserModel } from '@prisma/client';
import { AppConfigService } from '../../config/config.service.interface';
import { Dependency } from '../../config/config.dependency';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { User } from './users.entity';
import { AppUsersService } from './users.service.interface';
import { AppUsersRepository } from './users.repository.interface';

@injectable()
export class UsersService implements AppUsersService {
  constructor(
    @inject(Dependency.ConfigService) private configService: AppConfigService,
    @inject(Dependency.UsersRepository) private usersRepository: AppUsersRepository,
  ) {}
  async createUser({ email, name, password }: UserSignupDto): Promise<UserModel | null> {
    const existedUser = await this.usersRepository.find(email);

    if (existedUser) {
      return null;
    }

    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));

    return this.usersRepository.create(newUser);
  }

  async validateUser({ email, password }: UserSigninDto): Promise<boolean> {
    const existedUser = await this.usersRepository.find(email);
    if (!existedUser) {
      return false;
    }
    const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
    return newUser.comparePassword(password);
  }

  async getUserInfo(email: string): Promise<UserModel | null> {
    return this.usersRepository.find(email);
  }
}
