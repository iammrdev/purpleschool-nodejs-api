import { NextFunction, Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { sign } from 'jsonwebtoken';
import { BaseController } from '../../common/base.controller';
import { HTTPError } from '../../common/errors/http-error';
import { AppLogger } from '../../common/lib/logger/logger.interface';
import { Dependency } from '../../config/config.dependency';
import { AppUsersController } from './users.controller.interface';
import { AppUsersService } from './users.service.interface';
import { AppConfigService } from '../../config/config.service.interface';
import { UserSigninDto } from './dto/user-signin.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { ValidateMiddleware } from '../../common/lib/validation/validate.middleware';
import { AuthGuard } from '../../common/lib/validation/auth.guard';

@injectable()
export class UsersController extends BaseController implements AppUsersController {
  constructor(
    @inject(Dependency.AppLogger) private logger: AppLogger,
    @inject(Dependency.UsersService) private usersService: AppUsersService,
    @inject(Dependency.ConfigService) private configService: AppConfigService,
  ) {
    super(logger);

    this.bindRoutes([
      {
        path: '/signup',
        method: 'post',
        func: this.signup,
        middlewares: [new ValidateMiddleware(UserSignupDto)],
      },
      {
        path: '/signin',
        method: 'post',
        func: this.signin,
        middlewares: [new ValidateMiddleware(UserSigninDto)],
      },
      { path: '/info', method: 'get', func: this.info, middlewares: [new AuthGuard()] },
    ]);
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      sign(
        { email, iat: Math.floor(Date.now() / 1000) },
        secret,
        { algorithm: 'HS256' },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }

  public async signin(
    req: Request<{}, {}, UserSigninDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.validateUser(req.body);

    if (!result) {
      return next(new HTTPError(401, 'Ошибка авторизации', 'users/signin'));
    }

    const token = await this.signJWT(req.body.email, this.configService.get('SECRET'));

    this.ok(res, { token });
  }

  public async signup(
    { body }: Request<{}, {}, UserSignupDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.usersService.createUser(body);

    if (!result) {
      return next(new HTTPError(422, 'Такой пользователь уже существует'));
    }

    this.ok(res, { id: result.id, email: result.email });
  }

  public async info({ user }: Request, res: Response, _next: NextFunction): Promise<void> {
    const userInfo = await this.usersService.getUserInfo(user);

    this.ok(res, { id: userInfo?.id, email: userInfo?.email });
  }
}
