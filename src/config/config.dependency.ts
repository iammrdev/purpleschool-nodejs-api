export const Dependency = {
  Application: Symbol.for('Application'),
  AppLogger: Symbol.for('AppLogger'),
  AppExceptionFilter: Symbol.for('AppExceptionFilter'),

  ConfigService: Symbol.for('ConfigService'),
  PrismaService: Symbol.for('PrismaService'),

  UsersController: Symbol.for('UsersContoller'),
  UsersService: Symbol.for('UsersService'),
  UsersRepository: Symbol.for('UsersRepository'),
};
