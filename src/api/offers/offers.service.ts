import { inject, injectable } from 'inversify';
import { Offer as OfferModel } from '@prisma/client';
import { AppConfigService } from '../../config/config.service.interface';
import { Dependency } from '../../config/config.dependency';
import { OfferCreateDto } from './dto/offer-create.dto';
import { Offer } from './offers.entity';
import { AppOffersService } from './offers.service.interface';
import { AppOffersRepository } from './offers.repository.interface';
import { OfferUpdateDto } from './dto/offer-update.dto';

@injectable()
export class OffersService implements AppOffersService {
  constructor(
    @inject(Dependency.ConfigService) private configService: AppConfigService,
    @inject(Dependency.OffersRepository) private offersRepository: AppOffersRepository,
  ) {}
  async createOffer(offerDto: OfferCreateDto): Promise<OfferModel | null> {
    const existedOffer = await this.offersRepository.findByTitle(offerDto.title);

    if (existedOffer) {
      return null;
    }

    const newOffer = new Offer(offerDto);

    return this.offersRepository.create(newOffer);
  }

  async getOffers(): Promise<OfferModel[]> {
    return this.offersRepository.findAll();
  }

  async getOfferById(id: number): Promise<OfferModel | null> {
    return this.offersRepository.findById(id);
  }

  async updateOffer(id: number, offerDto: OfferUpdateDto): Promise<OfferModel> {
    const newOffer = new Offer(offerDto);

    return this.offersRepository.updateById(id, newOffer);
  }

  async deleteOfferById(id: number): Promise<boolean> {
    return this.offersRepository.deleteById(id);
  }
}
