
import type { Mirror } from './mirrors';

export type Offer = {
  id: 'seasonal_10_off' | 'first_time_free_delivery' | 'bundle_deal' | 'clearance' | 'site_wide_5_off' | 'flash_sale_20_off';
  type: 'filter' | 'forced_discount';
  discountPercentage: number;
  appliesTo: Array<Mirror['shape'] | 'all'>;
  imageId: string;
  filter?: 'on_sale';
  expiresAt?: string;
};

export const offers: Offer[] = [
  {
    id: 'seasonal_10_off',
    type: 'filter',
    filter: 'on_sale',
    discountPercentage: 10,
    appliesTo: ['all'],
    imageId: 'offer-banner-1',
  },
  {
    id: 'site_wide_5_off',
    type: 'forced_discount',
    discountPercentage: 5,
    appliesTo: ['all'],
    imageId: 'offer-banner-2',
  },
  {
    id: 'bundle_deal',
    type: 'forced_discount',
    discountPercentage: 15,
    appliesTo: ['round', 'rectangle'],
    imageId: 'offer-banner-3',
  },
  {
    id: 'clearance',
    type: 'forced_discount',
    discountPercentage: 25,
    appliesTo: ['sunburst'],
    imageId: 'offer-banner-4',
  },
  {
    id: 'flash_sale_20_off',
    type: 'forced_discount',
    discountPercentage: 20,
    appliesTo: ['arched', 'oval'],
    imageId: 'flash-sale-banner',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
  },
];
