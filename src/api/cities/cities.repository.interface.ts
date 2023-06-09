import { City as CityModel } from '@prisma/client';
import { City } from './cities.entity';

export interface AppCitiesRepository {
  create: (city: City) => Promise<CityModel>;
  findByName: (name: string) => Promise<CityModel | null>;
  findAll: () => Promise<CityModel[]>;
}
