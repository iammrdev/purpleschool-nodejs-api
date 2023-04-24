import { Offer as OfferModel } from '@prisma/client';
import { OfferCreateDto } from './dto/offer-create.dto';
import { OfferUpdateDto } from './dto/offer-update.dto';

export interface AppOffersService {
  createOffer: (dto: OfferCreateDto) => Promise<OfferModel | null>;
  getOffers: () => Promise<OfferModel[]>;
  getOfferById: (id: number) => Promise<OfferModel | null>;
  deleteOfferById: (id: number) => Promise<boolean>;
  updateOffer: (id: number, dto: OfferUpdateDto) => Promise<OfferModel>;
}
