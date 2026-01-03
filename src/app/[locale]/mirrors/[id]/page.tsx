
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getMirrorById, mirrors, type Mirror } from '@/lib/mirrors';
import { getDictionary } from '@/lib/get-dictionary';
import { i18n, type Locale } from '@/i18n';
import { Button } from '@/components/ui/button';
import { MirrorPreview } from '@/components/mirror/mirror-preview';
import { GlassCard } from '@/components/ui/glass-card';
import { Separator } from '@/components/ui/separator';
import { offers } from '@/lib/offers';

type Props = {
  params: Promise<{ id: string; locale: Locale }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  
  for (const locale of i18n.locales) {
    for (const mirror of mirrors) {
      params.push({
        locale,
        id: mirror.id,
      });
    }
  }
  
  return params;
}

export default async function MirrorDetailsPage({ params, searchParams }: Props) {
  const { id, locale } = await params;
  const resolvedSearchParams = await searchParams;
  const mirror = getMirrorById(id);
  const dictionary = await getDictionary(locale);
  const offerId = resolvedSearchParams.offer as string;
  const activeOffer = offers.find(o => o.id === offerId);

  if (!mirror) {
    notFound();
  }
  
  const basePrice = mirror.price;
  let finalPrice = basePrice;
  let originalPriceForDisplay = mirror.originalPrice;
  
  if (activeOffer && activeOffer.type === 'forced_discount') {
    if (activeOffer.appliesTo.includes('all') || activeOffer.appliesTo.includes(mirror.shape)) {
      finalPrice = finalPrice * (1 - activeOffer.discountPercentage / 100);
      if (!originalPriceForDisplay || originalPriceForDisplay <= finalPrice) {
        originalPriceForDisplay = basePrice;
      }
    }
  }

  const hasDiscount = originalPriceForDisplay && originalPriceForDisplay > finalPrice;
  const discountPercentage = hasDiscount ? Math.round(((originalPriceForDisplay! - finalPrice) / originalPriceForDisplay!) * 100) : 0;

  const DetailItem = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
    <div className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
  
  const bookingLink = `/${locale}/booking?mirrorId=${mirror.id}${activeOffer ? `&offer=${activeOffer.id}` : ''}`;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <MirrorPreview mirror={mirror} />
        
        <div className="flex flex-col">
          <h1 className="font-headline text-4xl font-semibold text-foreground">{mirror.name}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{mirror.image.description}</p>
          
          <GlassCard className="mt-8 p-6">
            <h2 className="font-headline text-2xl font-medium text-foreground">{dictionary.MirrorDetails.specifications}</h2>
            <Separator className="my-4" />
            <div className="space-y-0">
              <DetailItem label={dictionary.MirrorDetails.shape} value={mirror.shape.charAt(0).toUpperCase() + mirror.shape.slice(1)} />
              <DetailItem label={dictionary.MirrorDetails.dimensions} value={mirror.dimensions} />
              <DetailItem label={dictionary.MirrorDetails.frame} value={mirror.frame} />
              <DetailItem 
                label={dictionary.MirrorDetails.price} 
                value={
                  hasDiscount ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground line-through text-lg">
                        ${originalPriceForDisplay!.toFixed(2)}
                      </span>
                      <span className="font-headline text-2xl font-semibold text-primary">
                        ${finalPrice.toFixed(2)}
                      </span>
                      {discountPercentage > 0 && (
                        <span className="text-sm font-semibold text-destructive">
                          ({discountPercentage}% OFF)
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="font-headline text-2xl font-semibold text-primary">
                      ${finalPrice.toFixed(2)}
                    </span>
                  )
                } 
              />
            </div>
          </GlassCard>

          <div className="mt-auto pt-8">
            <Button asChild size="lg" className="w-full font-headline text-lg shine">
              <Link href={bookingLink}>
                {dictionary.MirrorDetailsPage.bookCta}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
