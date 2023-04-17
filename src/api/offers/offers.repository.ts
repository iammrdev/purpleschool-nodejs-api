import { inject, injectable } from 'inversify';
import { Offer as OfferModel } from '@prisma/client';
import { Dependency } from '../../config/config.dependency';
import { Offer } from './offers.entity';
import { AppOffersRepository } from './offers.repository.interface';
import { PrismaService } from '../../database/prisma.service';

@injectable()
export class OffersRepository implements AppOffersRepository {
  constructor(@inject(Dependency.PrismaService) private prismaService: PrismaService) {}

  async create(offer: Offer): Promise<OfferModel> {
    return this.prismaService.client.offer.create({
      data: {
        title: offer.title,
        description: offer.description,
        url: offer.url,
        startAt: offer.startAt,
        endAt: offer.endAt,
        cityId: offer.cityId,
        topicId: offer.topicId,
        tags: {
          connect: offer.tags.map((tagId) => ({ id: tagId })),
        },
      },
      include: {
        tags: true,
        city: true,
        topic: true,
      },
    });
  }

  async findById(id: number): Promise<OfferModel | null> {
    return this.prismaService.client.offer.findFirst({
      where: {
        id,
      },
      include: {
        tags: true,
        city: true,
        topic: true,
      },
    });
  }

  async findByTitle(title: string): Promise<OfferModel | null> {
    return this.prismaService.client.offer.findFirst({
      where: {
        title,
      },
      include: {
        tags: true,
        city: true,
        topic: true,
      },
    });
  }

  async findAll(): Promise<OfferModel[]> {
    return this.prismaService.client.offer.findMany({
      include: {
        tags: true,
        city: true,
        topic: true,
      },
    });
  }
}
