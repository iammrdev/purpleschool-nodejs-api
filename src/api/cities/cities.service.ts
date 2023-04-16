import { inject, injectable } from 'inversify';
import { City as CityModel } from '@prisma/client';
import { AppConfigService } from '../../config/config.service.interface';
import { Dependency } from '../../config/config.dependency';
import { CityCreateDto } from './dto/city-create.dto';
import { City } from './cities.entity';
import { AppCitiesService } from './cities.service.interface';
import { AppCitiesRepository } from './cities.repository.interface';

@injectable()
export class CitiesService implements AppCitiesService {
  constructor(
    @inject(Dependency.ConfigService) private configService: AppConfigService,
    @inject(Dependency.CitiesRepository) private citiesRepository: AppCitiesRepository,
  ) {}
  async createCity({ name }: CityCreateDto): Promise<CityModel | null> {
    const existedCity = await this.citiesRepository.findByName(name);

    if (existedCity) {
      return null;
    }

    const newCity = new City(name);

    return this.citiesRepository.create(newCity);
  }

  async getCities(): Promise<CityModel[]> {
    return this.citiesRepository.findAll();
  }
}
