import { City as CityModel } from '@prisma/client';
import { CityCreateDto } from './dto/city-create.dto';

export interface AppCitiesService {
  createCity: (dto: CityCreateDto) => Promise<CityModel | null>;
  getCities: () => Promise<CityModel[]>;
}
