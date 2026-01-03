
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { getDictionary } from '@/lib/get-dictionary';
import { mirrors } from '@/lib/mirrors';
import { type Locale } from '@/i18n';
import { MirrorCard } from '@/components/mirror/mirror-card';
import { MirrorCardSkeleton } from '@/components/skeletons/mirror-card-skeleton';
import { offers } from '@/lib/offers';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { OfferCarousel } from '@/components/offer/offer-carousel';
import { FlashSaleBanner } from '@/components/offer/flash-sale-banner';
import { reviews } from '@/lib/reviews';
import { ReviewCard } from '@/components/review/review-card';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const featuredMirrors = mirrors.slice(0, 3);
  const featuredReviews = reviews.slice(0, 3);
  
  const carouselOffers = offers.filter(o => ['seasonal_10_off', 'site_wide_5_off', 'bundle_deal', 'clearance'].includes(o.id));
  const flashSaleOffer = offers.find(o => o.id === 'flash_sale_20_off');

  const displayOffers = carouselOffers.map(offer => {
    const offerImage = PlaceHolderImages.find(p => p.id === offer.imageId);
    
    let href = `/${locale}/products`;
    if (offer.type === 'filter' && offer.filter === 'on_sale') {
      href = `/${locale}/products?on_sale=true`;
    } else if (offer.type === 'forced_discount') {
      href = `/${locale}/products?offer=${offer.id}`;
    }

    const offerData = dictionary.Offers[offer.id as keyof typeof dictionary.Offers];
    const offerDetails = typeof offerData === 'object' ? offerData : null;

    return {
      ...offer,
      title: offerDetails?.title || offer.id,
      description: offerDetails?.description || '',
      cta: offerDetails?.cta || 'Shop Now',
      image: offerImage!,
      href: href,
    };
  });
  
  const displayFlashSaleOffer = flashSaleOffer ? (() => {
      const offerData = dictionary.Offers[flashSaleOffer.id as keyof typeof dictionary.Offers];
      const offerDetails = typeof offerData === 'object' ? offerData : null;
      return {
        ...flashSaleOffer,
        title: offerDetails?.title || flashSaleOffer.id,
        description: offerDetails?.description || '',
        cta: offerDetails?.cta || 'Shop Now',
        image: PlaceHolderImages.find(p => p.id === flashSaleOffer.imageId)!,
        href: `/${locale}/products?offer=${flashSaleOffer.id}`,
      };
    })() : null;

  return (
    <div className="flex flex-col gap-16 md:gap-24">
      
      {displayFlashSaleOffer && (
        <section className="w-full">
           <FlashSaleBanner offer={displayFlashSaleOffer} dictionary={dictionary} />
        </section>
      )}

      <section className="w-full py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-3xl font-semibold text-center mb-8">
                {dictionary.Offers.title}
            </h2>
        </div>
        <div className="w-full">
            <OfferCarousel offers={displayOffers} />
        </div>
      </section>

      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-headline text-3xl font-semibold text-center mb-12">
            {dictionary.Header.products}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Suspense
            fallback={Array.from({ length: 3 }).map((_, i) => (
              <MirrorCardSkeleton key={i} />
            ))}
          >
            {featuredMirrors.map((mirror) => (
              <MirrorCard key={mirror.id} mirror={mirror} locale={locale} dictionary={dictionary} />
            ))}
          </Suspense>
        </div>
        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="font-headline text-lg">
            <Link href={`/${locale}/products`}>{dictionary.HomePage.seeMore}</Link>
          </Button>
        </div>
      </section>
      
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="font-headline text-3xl font-semibold text-center mb-12">
            {dictionary.ReviewsPage.h1}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </div>
         <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="font-headline text-lg">
            <Link href={`/${locale}/reviews`}>{dictionary.ReviewsPage.seeMore}</Link>
          </Button>
        </div>
      </section>

    </div>
  );
}
