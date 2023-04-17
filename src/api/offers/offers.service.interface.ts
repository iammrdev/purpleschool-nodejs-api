import { Offer as OfferModel } from '@prisma/client';
import { OfferCreateDto } from './dto/offer-create.dto';

export interface AppOffersService {
  createOffer: (dto: OfferCreateDto) => Promise<OfferModel | null>;
  getOffers: () => Promise<OfferModel[]>;
  getOfferById: (id: number) => Promise<OfferModel | null>;
}
