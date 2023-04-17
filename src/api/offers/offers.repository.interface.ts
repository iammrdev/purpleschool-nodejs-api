import { Offer as OfferModel } from '@prisma/client';
import { Offer } from './offers.entity';

export interface AppOffersRepository {
  create: (offer: Offer) => Promise<OfferModel>;
  findById: (id: number) => Promise<OfferModel | null>;
  findByTitle: (title: string) => Promise<OfferModel | null>;
  findAll: () => Promise<OfferModel[]>;
}
