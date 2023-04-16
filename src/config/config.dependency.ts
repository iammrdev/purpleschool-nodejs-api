export const Dependency = {
  Application: Symbol.for('Application'),
  AppLogger: Symbol.for('AppLogger'),
  AppExceptionFilter: Symbol.for('AppExceptionFilter'),

  ConfigService: Symbol.for('ConfigService'),
  PrismaService: Symbol.for('PrismaService'),

  UsersController: Symbol.for('UsersContoller'),
  UsersService: Symbol.for('UsersService'),
  UsersRepository: Symbol.for('UsersRepository'),

  TopicsController: Symbol.for('TopicsContoller'),
  TopicsService: Symbol.for('TopicsService'),
  TopicsRepository: Symbol.for('TopicsRepository'),

  TagsController: Symbol.for('TagsContoller'),
  TagsService: Symbol.for('TagsService'),
  TagsRepository: Symbol.for('TagsRepository'),

  CitiesController: Symbol.for('CitiesContoller'),
  CitiesService: Symbol.for('CitiesService'),
  CitiesRepository: Symbol.for('CitiesRepository'),
};
