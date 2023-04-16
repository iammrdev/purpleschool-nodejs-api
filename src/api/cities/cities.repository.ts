import { inject, injectable } from 'inversify';
import { City as CityModel } from '@prisma/client';
import { Dependency } from '../../config/config.dependency';
import { City } from './cities.entity';
import { AppCitiesRepository } from './cities.repository.interface';
import { PrismaService } from '../../database/prisma.service';

@injectable()
export class CitiesRepository implements AppCitiesRepository {
  constructor(@inject(Dependency.PrismaService) private prismaService: PrismaService) {}

  async create({ name }: City): Promise<CityModel> {
    return this.prismaService.client.city.create({
      data: {
        name,
      },
    });
  }

  async findByName(name: string): Promise<CityModel | null> {
    return this.prismaService.client.city.findFirst({
      where: {
        name,
      },
    });
  }

  async findAll(): Promise<CityModel[]> {
    return this.prismaService.client.city.findMany();
  }
}
